package com.month.bloom.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.month.bloom.payload.UserEditInfo;
import com.month.bloom.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class AccountsController {

	@Autowired
	private UserRepository userRepository;
	

	// 1. Edit Profile
	// set => profile image, phonNum
	// update => username, name, Bio, email, 
	
	// 2. Change Password
	// Old Password => true => New Password, Confirm New Password
	
	@PostMapping("/accounts")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> editUserInfo(@Valid @RequestBody UserEditInfo userEditInfo) {
		
	}
}
