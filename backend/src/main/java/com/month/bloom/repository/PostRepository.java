package com.month.bloom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.month.bloom.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{

	Optional<Post> findById(Long postId);
	
	Page<Post> findByCreatedBy(Long userId, Pageable pageable);
	
	long countByCreatedBy(Long userId);
	
	List<Post> findByIdIn(List<Long> postIds);
	
	List<Post> findByIdIn(List<Long> postIds, Sort sort);
	
	// follow를 하고 있는 사람들의 포스터를 보여주는 Repository
//	@Query(	select *
//			from posts
//			where created_by in (
//				select id
//				from users
//				where id in (
//					select following_id
//					from followes
//					where follower_id = 1 and following_id in(2,3)
//				) 
//			))
	
	// 상속된 createdBy 데이터를 post에서 쓰는 방법
	@Query("SELECT p FROM Post p WHERE p.created.By In"
			+ " (SELECT u.id FROM User u WHERE u.id In "
			+ " (SELECT f.following.id FROM f WHERE f.follower.id = :followerId and f.following.id In :followingIds))")
	Page<Post> findByFollowedUserId(@Param("followingIds") List<Long> followingIds, 
									@Param("followerId") Long followerId,
									Pageable pageable);
	
}
