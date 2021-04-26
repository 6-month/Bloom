package com.month.bloom.payload;

import java.util.List;

import com.month.bloom.model.ImageInPost;

public class ImageResponse {	
	private long id;
	private List<ImageInPost> images;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public List<ImageInPost> getImages() {
		return images;
	}
	public void setImages(List<ImageInPost> images) {
		this.images = images;
	}	

}
