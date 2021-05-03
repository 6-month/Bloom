package com.month.bloom.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.month.bloom.model.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long>{
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Follow f WHERE f.follower.id = :followerId AND f.following.id = :followingId")
	void deleteByFollowerIdAndFollowingId(@Param("followerId") Long followerId, @Param("followingId") Long followingId);
	
	@Query("SELECT count(f.id) FROM Follow f WHERE f.following.id = :userId")
	Long countByFollowerId(@Param("userId") Long userId);
	
	@Query("SELECT count(f.id) FROM Follow f WHERE f.follower.id = :userId")
	Long countByFollowingId(@Param("userId") Long userId);
}
	
