package com.month.bloom.payload;

import java.time.Instant;

public class UserProfile {
	private Long id; 
	private String username;
	private String name;
	private Instant joinedAt;
	private Long postCount;
	private Long lidkeCount;
	
	public UserProfile(Long id, String username, String name, Instant joinedAt, Long postCount, Long lidkeCount) {
		super();
		this.id = id;
		this.username = username;
		this.name = name;
		this.joinedAt = joinedAt;
		this.postCount = postCount;
		this.lidkeCount = lidkeCount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Instant getJoinedAt() {
		return joinedAt;
	}

	public void setJoinedAt(Instant joinedAt) {
		this.joinedAt = joinedAt;
	}

	public Long getPostCount() {
		return postCount;
	}

	public void setPostCount(Long postCount) {
		this.postCount = postCount;
	}

	public Long getLidkeCount() {
		return lidkeCount;
	}

	public void setLidkeCount(Long lidkeCount) {
		this.lidkeCount = lidkeCount;
	}
	
	
}
