package com.month.bloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.month.bloom.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	
	@Query("UDATE Comment c SET is.Deleted = :isDeleted WHERE c.comment.id = :commentId")
	void updateIsDelete(@Param("commentId") Long commentId, @Param("isDeleted") boolean isDeleted);
}
