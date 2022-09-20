package com.metaltravelguide.places.models.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String mail;
    private String firstName;
    private String lastName;
    private String countryIso;
    private boolean enabled;
    private List<String> roles;
    private Set<Long> places;
}
