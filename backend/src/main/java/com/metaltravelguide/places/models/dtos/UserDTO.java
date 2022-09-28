package com.metaltravelguide.places.models.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;

/**
 * A DTO for the {@link com.metaltravelguide.places.models.entities.User} entity
 */
@Data
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String countryIso;
    private boolean enabled;
    private List<String> roles;
    private Set<Long> places;
}
