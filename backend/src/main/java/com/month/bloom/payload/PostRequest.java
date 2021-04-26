package com.month.bloom.payload;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

public class PostRequest {

	@NotBlank
	@Size(max = 140)
	private String content;
	
	@NotNull
	@Valid
	private MultipartFile[] file;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public MultipartFile[] getImages() {
		return file;
	}

	public void setImages(MultipartFile[] images) {
		this.file = images;
	}
	
}
