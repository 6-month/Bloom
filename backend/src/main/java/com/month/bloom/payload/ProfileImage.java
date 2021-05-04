package com.month.bloom.payload;

import javax.persistence.Column;
import javax.persistence.Lob;

public class ProfileImage {

//	private String fileName;	
//	private String fileType;
	@Lob
	private byte[] data;

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
	
	 
}
