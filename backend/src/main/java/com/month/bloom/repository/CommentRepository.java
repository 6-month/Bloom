package com.month.bloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.month.bloom.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	
}
