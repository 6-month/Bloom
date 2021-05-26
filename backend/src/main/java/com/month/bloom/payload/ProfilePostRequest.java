package com.month.bloom.payload;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

public class ProfilePostRequest {
    @NotNull
    @Valid
    private MultipartFile profilePost;

    public MultipartFile getProfilePost() {
        return profilePost;
    }

    public void setProfilePost(MultipartFile profilePost) {
        this.profilePost = profilePost;
    }


}
