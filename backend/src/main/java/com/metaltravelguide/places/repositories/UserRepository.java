package com.metaltravelguide.places.repositories;

import com.metaltravelguide.places.models.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Query("select u from User u where u.username = ?1")
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u LEFT JOIN u.roles roles WHERE roles = ?1")
    List<User> findUsersByRole(String roles);
}
