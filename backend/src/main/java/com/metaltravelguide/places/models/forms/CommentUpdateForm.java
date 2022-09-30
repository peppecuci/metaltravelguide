package com.metaltravelguide.places.models.forms;

import lombok.Data;

@Data
public class CommentUpdateForm {
    private String text;
    private Long userId;
    private Long placeId;
    private boolean status;
}
