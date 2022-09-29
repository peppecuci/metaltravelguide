package com.metaltravelguide.places.models.forms;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UserCreateForm {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    private String nickname;
    private String countryIso;
}