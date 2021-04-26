package com.month.bloom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.month.bloom.model.Image;
import com.month.bloom.model.ImageInPost;

public interface ImageRepository extends JpaRepository<Image, String>{

	@Query("SELECT NEW com.month.bloom.model.ImageInPost(i.post.id, i.data) FROM Image i WHERE i.post.id = :postId")
	List<ImageInPost> findByPostId(@Param("postId") Long postId);
	
}
