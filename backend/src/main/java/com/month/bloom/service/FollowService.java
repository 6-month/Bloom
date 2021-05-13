package com.month.bloom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.month.bloom.model.Follow;
import com.month.bloom.model.User;
import com.month.bloom.payload.FollowCheckResponse;
import com.month.bloom.repository.FollowRepository;
import com.month.bloom.repository.UserRepository;
import com.month.bloom.security.UserPrincipal;

@Service
public class FollowService {

	@Autowired
	FollowRepository followRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public void followUser(UserPrincipal currentUser, User user) {
		Follow follow = new Follow();
		
		User followerUser = userRepository.getOne(currentUser.getId());
		
		follow.setFollower(followerUser);
		follow.setFollowing(user);
		
		followRepository.save(follow);
	}
	
	public void unfollowUser(UserPrincipal currentUser, User user) {		
		User followerUser = userRepository.getOne(currentUser.getId());
		
		followRepository.deleteByFollowerIdAndFollowingId(currentUser.getId(), user.getId());
	}
	
	// 팔로우를 했는지 안했는지 검사
	public FollowCheckResponse checkingFollow(User followingUser, User followerUser) {
		Long followingId = followingUser.getId();
		Long followerId = followerUser.getId();
		
		Follow result = followRepository.findByFollowingIdAndFollowerId(followingId, followerId);
		
		FollowCheckResponse checkResponse = new FollowCheckResponse();
		if(result != null ) {
			checkResponse.setResult(true);
		}
		else {
			checkResponse.setResult(false);
		}
		return checkResponse;
	}
}
