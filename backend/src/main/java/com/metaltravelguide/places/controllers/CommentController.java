package com.metaltravelguide.places.controllers;

import com.metaltravelguide.places.models.dtos.CommentDTO;
import com.metaltravelguide.places.models.forms.CommentCreateForm;
import com.metaltravelguide.places.models.forms.CommentUpdateForm;
import com.metaltravelguide.places.services.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "https://luisromeroaraya.github.io"})
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/all")
    @Secured({"ROLE_ADMIN"})
    public List<CommentDTO> readAll() {
        return commentService.readAll();
    }

    @GetMapping("/{id:[0-9]+}")
    public CommentDTO readOne(@PathVariable Long id) {
        return commentService.readOne(id);
    }

    @GetMapping("/place/{id:[0-9]+}")
    public List<CommentDTO> readAllByPlace(@PathVariable Long id) {
        return commentService.readAllByPlace(id);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public CommentDTO create(@Valid @RequestBody CommentCreateForm commentCreateForm, Authentication auth) {
        commentCreateForm.setUsername(auth.getName());
        return commentService.create(commentCreateForm);
    }

    @PatchMapping("/update/{id:[0-9]+}")
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public CommentDTO update(@Valid @PathVariable Long id, @Valid @RequestBody CommentUpdateForm commentUpdateForm) {
        return commentService.update(id, commentUpdateForm);
    }

    @DeleteMapping("/delete/{id:[0-9]+}")
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public void delete(@Valid @PathVariable Long id) {
        commentService.delete(id);
    }
}