package com.metaltravelguide.places.models.forms;

import lombok.Data;

@Data
public class UserUpdateForm {
    private String username;
    private String password;
    private String mail;
    private String firstName;
    private String lastName;
    private String countryIso;
    private boolean enabled;
}
