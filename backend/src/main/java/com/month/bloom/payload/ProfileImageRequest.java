package com.month.bloom.payload;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

public class ProfileImageRequest {
	@NotNull
	@Valid
	private MultipartFile images;
	
	public MultipartFile getImages() {
		return images;
	}

	public void setImages(MultipartFile images) {
		this.images = images;
	}
	
	
}
