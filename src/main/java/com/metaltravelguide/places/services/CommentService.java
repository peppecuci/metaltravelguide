package com.metaltravelguide.places.services;

import com.metaltravelguide.places.models.dtos.CommentDTO;
import com.metaltravelguide.places.models.forms.CommentCreateForm;
import com.metaltravelguide.places.models.forms.CommentUpdateForm;

import java.util.List;

public interface CommentService extends CrudService<CommentDTO, Long, CommentCreateForm, CommentUpdateForm> {
    List<CommentDTO> readAllByPlace(Long id);
}
