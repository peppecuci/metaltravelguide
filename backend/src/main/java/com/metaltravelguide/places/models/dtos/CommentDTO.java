package com.metaltravelguide.places.models.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

/**
 * A DTO for the {@link com.metaltravelguide.places.models.entities.Comment} entity
 */
@Data
@Builder
public class CommentDTO {
    private Long id;
    private String text;
    private boolean status;
    private Instant dateCreated;
    private Long userId;
    private Long placeId;
}