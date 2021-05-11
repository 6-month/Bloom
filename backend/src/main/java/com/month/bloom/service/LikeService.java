package com.month.bloom.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.month.bloom.exception.BadRequestException;
import com.month.bloom.exception.ResourceNotFoundException;
import com.month.bloom.model.Like;
import com.month.bloom.model.Post;
import com.month.bloom.model.User;
import com.month.bloom.payload.LikeRequest;
import com.month.bloom.payload.LikeResponse;
import com.month.bloom.repository.LikeRepository;
import com.month.bloom.repository.PostRepository;
import com.month.bloom.repository.UserRepository;
import com.month.bloom.security.UserPrincipal;

@Service
public class LikeService {
	
	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired 
	private UserRepository userRepository;
	
	private static final  Logger logger = LoggerFactory.getLogger(LikeService.class);

	public LikeResponse storeLike(UserPrincipal currentUser, LikeRequest likeRequest) {
		Post post = postRepository.findById(likeRequest.getPostId())
				.orElseThrow(() -> new ResourceNotFoundException("Post", "id", likeRequest.getPostId()));
		User user = userRepository.getOne(currentUser.getId());
	
		Like like = new Like(post, user);
		
		boolean pushedLike = false;
		Long totalLikes = likeRepository.countByPost(post);

		if(isNotAlreadyLike(user, post)) {
			try {
				like = likeRepository.save(like);
				pushedLike = true; 
				totalLikes = likeRepository.countByPost(post);
						
			} catch (DataIntegrityViolationException ex) {
				logger.info("Like has already registered");
				throw new BadRequestException("Sorry! You have already Like registered");
			}
		}
		LikeResponse likeResponse = new LikeResponse();
		likeResponse.setPushedLike(pushedLike);
		likeResponse.setTotalLikes(totalLikes);
		
		return likeResponse;
		
	}
	
	public void cancelLike(UserPrincipal currentUser, LikeRequest likeRequest) {
		if(likeRequest.isCheckedLike()) {
			Post post = postRepository.findById(likeRequest.getPostId()).orElseThrow();
			User user = userRepository.getOne(currentUser.getId());
			Like like = likeRepository.findByUserAndPost(user, post).orElseThrow();
			
			likeRepository.delete(like);
		}
	}
	
	private boolean isNotAlreadyLike(User user,  Post post) {
		return likeRepository.findByUserAndPost(user, post).isEmpty();
	}
}
