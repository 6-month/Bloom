package com.month.bloom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.month.bloom.model.Like;
import com.month.bloom.model.Post;
import com.month.bloom.model.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long>{

//	@Query("SELECT NEW com.month.bloom.model.LikeCount(l.post.id, count(l.id)) FROM Like l WHERE l.post.id = :postId")
//	List<LikeCount> countTotalLikesByPostIds(@Param("postId") List<Long> postId);
//
//	@Query("SELECT l FROM Like l WHERE l.user.id = :userId and l.post.id in :postIds")
//	List<Like> findByUserIdAndPostIdIn(@Param("userId") Long userId, @Param("postIds") List<Long> postIds);
//
	Optional<Like> findByUserAndPost(User user, Post post);
	
	Long countByPost(Post post);
}
