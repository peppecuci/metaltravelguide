package com.metaltravelguide.places.services.implementation;

import com.metaltravelguide.places.exceptions.ElementNotFoundException;
import com.metaltravelguide.places.exceptions.UserNotTheSameException;
import com.metaltravelguide.places.mappers.PlaceMapper;
import com.metaltravelguide.places.models.dtos.PlaceDTO;
import com.metaltravelguide.places.models.entities.Place;
import com.metaltravelguide.places.models.forms.PlaceCreateForm;
import com.metaltravelguide.places.models.forms.PlaceUpdateForm;
import com.metaltravelguide.places.repositories.PlaceRepository;
import com.metaltravelguide.places.services.PlaceService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceServiceImpl implements PlaceService {
    private final PlaceRepository placeRepository;
    private final PlaceMapper placeMapper;

    public PlaceServiceImpl(PlaceRepository placeRepository, PlaceMapper placeMapper) {
        this.placeRepository = placeRepository;
        this.placeMapper = placeMapper;
    }

    @Override
    public PlaceDTO create(PlaceCreateForm placeCreateForm) {
        Place place = placeMapper.toEntity(placeCreateForm);
        place = placeRepository.save(place);
        return placeMapper.toDto(place);
    }

    @Override
    public List<PlaceDTO> readAll() {
        return placeRepository.findAll().stream()
                .map(placeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public PlaceDTO readOne(Long id) {
        return placeRepository.findById(id)
                .map(placeMapper::toDto)
                .orElseThrow(() -> new ElementNotFoundException(Place.class, id));
    }

    @Override
    public PlaceDTO update(Long id, PlaceUpdateForm placeUpdateForm) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Place.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = place.getUser().getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new UserNotTheSameException(place.getUser().getUsername(), authentication.getName());
        if (placeUpdateForm.getGoogleId() != null)
            place.setGoogleId(placeUpdateForm.getGoogleId());
        if (placeUpdateForm.getName() != null)
            place.setName(placeUpdateForm.getName());
        if (placeUpdateForm.getAddress() != null)
            place.setAddress(placeUpdateForm.getAddress());
        if (placeUpdateForm.getContact() != null)
            place.setContact(placeUpdateForm.getContact());
        if (placeUpdateForm.getType() != null)
            place.setType(placeUpdateForm.getType());
        if (placeUpdateForm.getDescription() != null)
            place.setDescription(placeUpdateForm.getDescription());
        if (placeUpdateForm.getImage() != null)
            place.setImage(placeUpdateForm.getImage());
        place = placeRepository.save(place);
        return placeMapper.toDto(place);
    }

    @Override
    public void delete(Long id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Place.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = place.getUser().getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new UserNotTheSameException(place.getUser().getUsername(), authentication.getName());
        placeRepository.delete(place);
    }
}
