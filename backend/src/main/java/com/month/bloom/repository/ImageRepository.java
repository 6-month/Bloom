package com.month.bloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.month.bloom.model.Image;

public interface ImageRepository extends JpaRepository<Image, String>{
	
}
