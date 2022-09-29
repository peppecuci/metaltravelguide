package com.metaltravelguide.places.models.forms;

import lombok.Data;

@Data
public class UserUpdateForm {
    private String username;
    private String password;
    private String nickname;
    private String countryIso;
    private boolean enabled;
}
