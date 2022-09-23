package com.metaltravelguide.places.mappers;

import com.metaltravelguide.places.exceptions.ElementNotFoundException;
import com.metaltravelguide.places.models.dtos.CommentDTO;
import com.metaltravelguide.places.models.entities.Comment;
import com.metaltravelguide.places.models.entities.Place;
import com.metaltravelguide.places.models.forms.CommentCreateForm;
import com.metaltravelguide.places.models.forms.CommentUpdateForm;
import com.metaltravelguide.places.repositories.PlaceRepository;
import com.metaltravelguide.places.repositories.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;

    public CommentMapper(UserRepository userRepository, PlaceRepository placeRepository) {
        this.userRepository = userRepository;
        this.placeRepository = placeRepository;
    }

    public CommentDTO toDto(Comment entity) {
        if (entity == null)
            return null;
        return CommentDTO.builder()
                .id(entity.getId())
                .text(entity.getText())
                .status(entity.isStatus())
                .dateCreated(entity.getDateCreated())
                .username(entity.getUser().getUsername())
                .placeId(entity.getPlace().getId())
                .build();
    }

    public Comment toEntity(CommentCreateForm form) {
        if (form == null)
            return null;
        Comment comment = new Comment();
        comment.setText(form.getText());
        comment.setUser(userRepository.findByUsername(form.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username not found.")));
        comment.setPlace(placeRepository.findById(form.getPlaceId()).orElseThrow(() -> new ElementNotFoundException(Place.class, "Place not found.")));
        return comment;
    }

    public Comment toEntity(CommentUpdateForm form) {
        if (form == null)
            return null;
        Comment comment = new Comment();
        comment.setText(form.getText());
        comment.setStatus(form.isStatus());
        comment.setUser(userRepository.findByUsername(form.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username not found.")));
        comment.setPlace(placeRepository.findById(form.getPlaceId()).orElseThrow(() -> new ElementNotFoundException(Place.class, "Place not found.")));
        return comment;
    }
}
