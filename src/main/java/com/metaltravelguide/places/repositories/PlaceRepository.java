package com.metaltravelguide.places.repositories;

import com.metaltravelguide.places.models.entities.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    @Query("select p from Place p where p.user.id = ?1")
    List<Place> findAllByUser(Long id);

}
