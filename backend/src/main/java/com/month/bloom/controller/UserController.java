package com.month.bloom.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.month.bloom.exception.ResourceNotFoundException;
import com.month.bloom.model.User;
import com.month.bloom.payload.PagedResponse;
import com.month.bloom.payload.PostResponse;
import com.month.bloom.payload.UserIdentityAvailability;
import com.month.bloom.payload.UserProfile;
import com.month.bloom.payload.UserSummary;
import com.month.bloom.repository.LikeRepository;
import com.month.bloom.repository.PostRepository;
import com.month.bloom.repository.UserRepository;
import com.month.bloom.security.CurrentUser;
import com.month.bloom.security.UserPrincipal;
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
	private PostService postService;
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userSummary;
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
    
    @GetMapping("users/{username}")
    public UserProfile getUserProfile(@PathVariable(value= "username") String username) {
    	User user = userRepository.findByUsername(username)
    			.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
    	
    	long postCount = postRepository.countByCreatedBy(user.getId());
    	
    	UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(),
    			user.getName(), user.getCreatedAt(), postCount);
    	
    	return userProfile;
    }
    
    @GetMapping("/users/{username}/posts")
    public PagedResponse<PostResponse> getPollsCreatedBy(@PathVariable(value = "username") String username,
                                                         @CurrentUser UserPrincipal currentUser,
                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return postService.getPostsCreatedBy(username, currentUser, page, size);
    }
}
