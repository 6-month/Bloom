package com.month.bloom.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.month.bloom.exception.BadRequestException;
import com.month.bloom.exception.FileStorageException;
import com.month.bloom.model.Image;
import com.month.bloom.model.Like;
import com.month.bloom.model.LikeCount;
import com.month.bloom.model.Post;
import com.month.bloom.model.User;
import com.month.bloom.payload.PagedResponse;
import com.month.bloom.payload.PostRequest;
import com.month.bloom.payload.PostResponse;
import com.month.bloom.repository.ImageRepository;
import com.month.bloom.repository.LikeRepository;
import com.month.bloom.repository.PostRepository;
import com.month.bloom.repository.UserRepository;
import com.month.bloom.security.UserPrincipal;
import com.month.bloom.util.AppConstants;
import com.month.bloom.util.ModelMapper;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
	private ImageRepository imageRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(PostService.class);

	public PagedResponse<PostResponse> getAllPosts(UserPrincipal currentUser, int page, int size) {
		validatePageNumberAndSize(page, size);
		
		//Retrieve Post
		Pageable pagealbe = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
		// Retrieve All Post in Page
		Page<Post> posts = postRepository.findAll(pagealbe);
		
		if(posts.getNumberOfElements() == 0) {
			return new PagedResponse<>(Collections.emptyList(), posts.getNumber(),
					posts.getSize(), posts.getTotalElements(), posts.getTotalPages(), posts.isLast());			
		}
		
		// Map Posts to PostResponses containing like counts and post creator details
		// postIds : 현재 페이지에 존재하는 모든 post에 해당하는 post_id 의 List
		List<Long> postIds = posts.map(Post::getId).getContent();
		System.out.println(postIds);
		
		// post 별로 총 like 수 map = {postId : totalLikes} 
		Map<Long, Long> totalLikeCountMap = getTotalLikesMap(postIds);
		System.out.println("totalLikeCountMap : "+totalLikeCountMap);
		
		// post 별로 로그인 유저가 좋아요를 눌렀는지 표시 ex) {1 : 1} => {userId : post_id}
		Map<Long, Long> postUserLikeMap = getPostUserLikeMap(currentUser, postIds);
		System.out.println(postUserLikeMap);
		
		// post 별로 해당 포스터를 만든 user 정보 반환
		Map<Long, User> creatorMap = getPostCreatorMap(posts.getContent());
		System.out.println(creatorMap);
		

		List<PostResponse> postResponse = posts.map(post -> {
			return ModelMapper.mapPostToPostResponse(post, 
					totalLikeCountMap.get(post.getId()), 
					creatorMap.get(post.getCreatedBy()),
					postUserLikeMap == null ? null : postUserLikeMap.getOrDefault(post.getId(), null));
		}).getContent();
		
		return new PagedResponse<>(postResponse, posts.getNumber(),
				posts.getSize(), posts.getTotalElements(), posts.getTotalPages(), posts.isLast());
	}
	

	public Post createPost(PostRequest postRequest) {
		Post post = new Post();
		post.setContent(postRequest.getContent());
		
		for(MultipartFile file : postRequest.getImages()) {
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			try {
	            if(fileName.contains("..")) {
	                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
	            }
	            Image image = new Image(fileName, file.getContentType(), file.getBytes());
	            post.addImage(image);
	        } catch (IOException ex) {
	            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
	        }
		}
		
		return postRepository.save(post);
	}
	
//	public PostResponse getPostById(Long postId, UserPrincipal currentUser) {
//		Post post = postRepository.findById(postId).orElseThrow(
//				() -> new ResourceNotFoundException("Post", "id", postId));
//		
//		Map<Long, byte[]> postImageMap = null;
//		
//		
//		
//		postImageMap = images.stream()
//				.collect(Collectors.toMap(ImageInPost::getPostId, ImageInPost::getImage));
//		
//		User creator = userRepository.findById(post.getCreatedBy())
//				.orElseThrow(() -> new ResourceNotFoundException("User", "id", post.getCreatedBy()));
//	
//				
//	}
	
	private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
	
	private Map<Long, Long> getTotalLikesMap(List<Long> postIds) {
		List<LikeCount> likes = new ArrayList<>();

		for(Long postId : postIds) {
			LikeCount likeCount = likeRepository.countTotalLikesByPostIds(postId);
			if(likeCount.getPostId() != null)
				likes.add(likeCount);
			else {
				likeCount = new LikeCount(postId, 0l);
				likes.add(likeCount);
			}
		}
		
		Map<Long, Long> totalLikesMap = likes.stream()
				.collect(Collectors.toMap(LikeCount::getPostId, LikeCount::getLikeCount, (p1, p2) -> p1));	
		
		return totalLikesMap;
	}
	
	private Map<Long, Long> getPostUserLikeMap(UserPrincipal currentUser, List<Long> postIds) {
		Map<Long, Long> postUserLikeMap = null;
		
		if(currentUser != null) {
			List<Like> userLikes = likeRepository.findByUserIdAndPostIdIn(currentUser.getId(), postIds);
		
			postUserLikeMap = userLikes.stream()
					.collect(Collectors.toMap(like -> like.getPost().getId(), like -> like.getUser().getId(), (p1, p2) -> p1));
		}
		return postUserLikeMap;
	}
	
	Map<Long, User> getPostCreatorMap(List<Post> posts){
		List<Long> creatorIds = posts.stream()
				.map(Post::getCreatedBy)
				.distinct()
				.collect(Collectors.toList());
				
		List<User> creators = userRepository.findByIdIn(creatorIds);
		Map<Long, User> creatorMap = creators.stream()
				.collect(Collectors.toMap(User::getId, Function.identity()));
	
		return creatorMap;
	}

	
}
