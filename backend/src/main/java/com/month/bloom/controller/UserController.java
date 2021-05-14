package com.month.bloom.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.month.bloom.exception.ResourceNotFoundException;
import com.month.bloom.model.User;
import com.month.bloom.model.UserProfileImage;
import com.month.bloom.payload.ApiResponse;
import com.month.bloom.payload.FollowCheckResponse;
import com.month.bloom.payload.FollowResponse;
import com.month.bloom.payload.PagedResponse;
import com.month.bloom.payload.PostResponse;
import com.month.bloom.payload.UserIdentityAvailability;
import com.month.bloom.payload.UserProfile;
import com.month.bloom.payload.UserSummary;
import com.month.bloom.repository.FollowRepository;
import com.month.bloom.repository.LikeRepository;
import com.month.bloom.repository.PostRepository;
import com.month.bloom.repository.UserRepository;
import com.month.bloom.security.CurrentUser;
import com.month.bloom.security.UserPrincipal;
import com.month.bloom.service.FollowService;
import com.month.bloom.service.PostService;
import com.month.bloom.util.AppConstants;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private FollowRepository followRepository;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private FollowService followService;
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.getOne(currentUser.getId());
		
        if(user.getUserProfileImage() != null) {
	        UserSummary userSummary = 
	        		new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(), user.getUserProfileImage().getData());
	        return userSummary;
        }
        else {
        	UserSummary userSummary = 
	        		new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(), null);
	        return userSummary;
        }
    }
	
    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }
    
    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }
    
    // profile
    @GetMapping("users/{username}")
    public UserProfile getUserProfile(@PathVariable(value= "username") String username) {
    	User user = userRepository.findByUsername(username)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
    	
    	Long postCount = postRepository.countByCreatedBy(user.getId());
    	
    	// total followers : count(following_id = user_id)
    	// total followings : count(follower_id = user_id)
    	Long totalFollowers = followRepository.countByFollowerId(user.getId());
    	
    	Long totalFollowings = followRepository.countByFollowingId(user.getId());
    	
    	UserProfileImage userProfileImage = user.getUserProfileImage();
    			
    	if(userProfileImage != null ) {
    		UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(),
        			user.getName(), user.getCreatedAt(), postCount, userProfileImage.getData(), totalFollowers, totalFollowings);
    		return userProfile;
    	}
		UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(),
			user.getName(), user.getCreatedAt(), postCount, null, totalFollowers, totalFollowings);
    	
    	
    	return userProfile;
    }
    
    @GetMapping("/users/{username}/posts")
    public PagedResponse<PostResponse> getPollsCreatedBy(@PathVariable(value = "username") String username,
                                                         @CurrentUser UserPrincipal currentUser,
                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return postService.getPostsCreatedBy(username, currentUser, page, size);
    }
    
    //username : follow를 할 User의 username
    @GetMapping("/users/{username}/follow")
    public FollowResponse followUser(@CurrentUser UserPrincipal currentUser, 
			@PathVariable(value = "username") String username) {    	
		User user = userRepository.findByUsername(username)
				.orElseThrow(() ->  new ResourceNotFoundException("User", "username", username));
		
		return followService.followUser(currentUser, user);
  	
    }
    
    @GetMapping("/users/{username}/unfollow")
    public FollowResponse unfollowUser(@CurrentUser UserPrincipal currentUser, 
    								@PathVariable(value = "username") String username) {    	
    	User user = userRepository.findByUsername(username)
    			.orElseThrow(() ->  new ResourceNotFoundException("User", "username", username));
    	
    	return followService.unfollowUser(currentUser, user);
    	
    }
    
    // follow checking
    @GetMapping("/users/{username}/checking")
    public FollowCheckResponse checkingFollow(@CurrentUser UserPrincipal currentUser,
    		@PathVariable(value = "username") String username) {
    	
    	User followingUser = userRepository.findByUsername(username)
    					.orElseThrow(() ->  new ResourceNotFoundException("User", "username", username));
    
    	User followerUser = userRepository.findByUsername(currentUser.getUsername())
    			.orElseThrow(() ->  new ResourceNotFoundException("User", "username", currentUser.getUsername()));
    
    	return followService.checkingFollow(followingUser, followerUser);
    }
    
    
}
