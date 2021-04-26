package com.month.bloom.util;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.month.bloom.model.Post;
import com.month.bloom.model.User;
import com.month.bloom.payload.ImageResponse;
import com.month.bloom.payload.PostResponse;
import com.month.bloom.payload.UserSummary;

public class ModelMapper {
	public static PostResponse mapPostToPostResponse(Post post, Long totalLikesCount, User creator, Map<Long, List> imageMap, Long userLike) {
		PostResponse postResponse = new PostResponse();
		postResponse.setId(post.getId());
		postResponse.setContent(post.getContent());
		postResponse.setCreationDateTime(post.getCreatedAt());
		
		UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getName(), creator.getUsername());
		postResponse.setCreatedBy(creatorSummary);
		
		List<ImageResponse> imageResponses = post.getImages().stream().map(image -> {
			ImageResponse imageResponse = new ImageResponse();
			imageResponse.setId(post.getId());
			imageResponse.setImages(imageMap.get(post.getId()));	
			return imageResponse;
		}).collect(Collectors.toList());
		postResponse.setImages(imageResponses);
		
		// totalLikeCountMap : {postId : totalLikeCount}
		postResponse.setTotalLikes(totalLikesCount);
		
		if(userLike != null) {
			postResponse.setPushedLike(true);
		} else
			postResponse.setPushedLike(false);
		
		return postResponse;
	}
	
}
