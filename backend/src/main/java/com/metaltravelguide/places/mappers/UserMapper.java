package com.metaltravelguide.places.mappers;

import com.metaltravelguide.places.enums.Country;
import com.metaltravelguide.places.models.dtos.UserDTO;
import com.metaltravelguide.places.models.entities.Place;
import com.metaltravelguide.places.models.entities.User;
import com.metaltravelguide.places.models.forms.UserCreateForm;
import com.metaltravelguide.places.models.forms.UserUpdateForm;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    public UserDTO toDto(User entity) {
        if (entity == null)
            return null;
        return UserDTO.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .mail(entity.getMail())
                .password(entity.getPassword())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .countryIso(entity.getCountryIso().name())
                .enabled(entity.isEnabled())
                .roles(entity.getRoles())
                .places(entity.getPlaces().stream().map(Place::getId).collect(Collectors.toSet()))
                .build();
    }

    public User toEntity(UserCreateForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(form.getPassword());
        user.setMail(form.getMail());
        user.setFirstName(form.getFirstName());
        user.setLastName(form.getLastName());
        user.setCountryIso(findByName(form.getCountryIso()));
        return user;
    }

    public User toEntity(UserUpdateForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(form.getPassword());
        user.setMail(form.getMail());
        user.setFirstName(form.getFirstName());
        user.setLastName(form.getLastName());
        user.setCountryIso(findByName(form.getCountryIso()));
        user.setEnabled(form.isEnabled());
        return user;
    }

    public static Country findByName(String countryIso) {
        return Arrays.stream(Country.values()).filter(country -> country.name().equalsIgnoreCase(countryIso)).findFirst().orElse(null);
    }
}
