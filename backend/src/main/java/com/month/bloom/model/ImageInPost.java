package com.month.bloom.model;

public class ImageInPost {
	private Long postId;
	private byte[] image;

	public ImageInPost(Long postId, byte[] image) {
		this.postId = postId;
		this.image = image;
	}

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	

}
