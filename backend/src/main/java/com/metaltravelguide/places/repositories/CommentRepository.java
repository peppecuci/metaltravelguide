package com.metaltravelguide.places.repositories;

import com.metaltravelguide.places.models.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select c from Comment c where c.place.id = ?1")
    List<Comment> findByPlace_Id(Long id);

}