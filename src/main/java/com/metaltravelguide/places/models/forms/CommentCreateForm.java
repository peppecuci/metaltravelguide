package com.metaltravelguide.places.models.forms;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CommentCreateForm {
    @NotBlank
    private String text;
    @NotBlank
    private String username;
    @NotNull
    private Long placeId;
}
