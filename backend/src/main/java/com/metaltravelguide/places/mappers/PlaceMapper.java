package com.metaltravelguide.places.mappers;

import com.metaltravelguide.places.models.dtos.PlaceDTO;
import com.metaltravelguide.places.models.entities.Place;
import com.metaltravelguide.places.models.entities.User;
import com.metaltravelguide.places.models.forms.PlaceCreateForm;
import com.metaltravelguide.places.repositories.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PlaceMapper {
    private final UserRepository userRepository;

    public PlaceMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public PlaceDTO toDto(Place entity) {
        if (entity == null)
            return null;
        return PlaceDTO.builder()
                .id(entity.getId())
                .googleId(entity.getGoogleId())
                .name(entity.getName())
                .address(entity.getAddress())
                .contact(entity.getContact())
                .type(entity.getType())
                .description(entity.getDescription())
                .image(entity.getImage())
                .userId(entity.getUser().getId())
                .userNickname(entity.getUser().getNickname())
                .likes(entity.getLikes().stream().map(User::getUsername).collect(Collectors.toSet()))
                .dateCreated(entity.getDateCreated())
                .dateLastModified(entity.getDateLastModified())
                .build();
    }

    public Place toEntity(PlaceCreateForm form) {
        if (form == null)
            return null;
        Place place = new Place();
        place.setGoogleId(form.getGoogleId());
        place.setName(form.getName());
        place.setAddress(form.getAddress());
        place.setContact(form.getContact());
        place.setType(form.getType());
        place.setDescription(form.getDescription());
        place.setImage(form.getImage());
        place.setUser(userRepository.findByUsername(form.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username not found.")));
        return place;
    }
}
