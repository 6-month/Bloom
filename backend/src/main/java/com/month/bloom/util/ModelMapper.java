package com.month.bloom.util;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.month.bloom.model.Image;
import com.month.bloom.model.Post;
import com.month.bloom.model.User;
import com.month.bloom.payload.PostResponse;
import com.month.bloom.payload.UserSummary;

public class ModelMapper {
	public static PostResponse mapPostToPostResponse(Post post, Long totalLikesCount, User creator, Long userLike) {
		PostResponse postResponse = new PostResponse();
		postResponse.setId(post.getId());
		postResponse.setContent(post.getContent());
		postResponse.setCreationDateTime(post.getCreatedAt());
		
		UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getName(), creator.getUsername());
		postResponse.setCreatedBy(creatorSummary);
		
		// totalLikeCountMap : {postId : totalLikeCount}
		postResponse.setTotalLikes(totalLikesCount);
		
		if(userLike != null) {
			postResponse.setPushedLike(true);
		} else
			postResponse.setPushedLike(false);
		
		return postResponse;
	}
	
}
