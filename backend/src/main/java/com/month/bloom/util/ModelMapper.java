package com.month.bloom.util;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.month.bloom.model.Image;
import com.month.bloom.model.Post;
import com.month.bloom.model.User;
import com.month.bloom.payload.PostResponse;
import com.month.bloom.payload.UserSummary;

public class ModelMapper {
//	public static PostResponse mapPostToPostResponse(Post post, Long totalLikesCount, User creator, Long userLike, byte[] postImage) {
//		PostResponse postResponse = new PostResponse();
//		postResponse.setId(post.getId());
//		postResponse.setContent(post.getContent());
//		postResponse.setCreationDateTime(post.getCreatedAt());
//		
//		postResponse.setImage(postImage);
//		UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getName(), creator.getUsername());
//		postResponse.setCreatedBy(creatorSummary);
//		
//		if(userLike != null) {
//			postResponse.setPushedLike(userLike);
//		}
//		long totalLikes = 0;
//		if(postResponse.getTotalLikes() != null) {
//			totalLikes = postResponse.getTotalLikes();
//		}
//		
//		postResponse.setTotalLikes(totalLikes);
//		
//		return postResponse;
//	}
//	
}
