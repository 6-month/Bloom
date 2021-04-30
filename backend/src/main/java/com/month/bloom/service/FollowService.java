package com.month.bloom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.month.bloom.model.Follow;
import com.month.bloom.model.User;
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
}
