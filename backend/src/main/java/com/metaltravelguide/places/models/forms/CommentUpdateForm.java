package com.metaltravelguide.places.models.forms;

import lombok.Data;

@Data
public class CommentUpdateForm {
    private String text;
    private String username;
    private Long placeId;
    private boolean status;
}
