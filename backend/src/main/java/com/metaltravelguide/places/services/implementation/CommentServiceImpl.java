package com.metaltravelguide.places.services.implementation;

import com.metaltravelguide.places.exceptions.ElementNotFoundException;
import com.metaltravelguide.places.exceptions.UserNotTheSameException;
import com.metaltravelguide.places.mappers.CommentMapper;
import com.metaltravelguide.places.models.dtos.CommentDTO;
import com.metaltravelguide.places.models.entities.Comment;
import com.metaltravelguide.places.models.forms.CommentCreateForm;
import com.metaltravelguide.places.models.forms.CommentUpdateForm;
import com.metaltravelguide.places.repositories.CommentRepository;
import com.metaltravelguide.places.services.CommentService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentMapper commentMapper, CommentRepository commentRepository) {
        this.commentMapper = commentMapper;
        this.commentRepository = commentRepository;
    }

    @Override
    public CommentDTO create(CommentCreateForm commentCreateForm) {
        Comment comment = commentMapper.toEntity(commentCreateForm);
        comment = commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    @Override
    public List<CommentDTO> readAll() {
        return commentRepository.findAll().stream()
                .map(commentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommentDTO readOne(Long id) {
        return commentRepository.findById(id)
                .map(commentMapper::toDto)
                .orElseThrow(() -> new ElementNotFoundException(Comment.class, id));
    }

    @Override
    public List<CommentDTO> readAllByPlace(Long id) {
        return commentRepository.findByPlace_Id(id).stream()
                .map(commentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommentDTO update(Long id, CommentUpdateForm commentUpdateForm) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Comment.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = comment.getUser().getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new UserNotTheSameException(comment.getUser().getUsername(), authentication.getName());
        if (commentUpdateForm.getText() != null)
            comment.setText(commentUpdateForm.getText());
        if (commentUpdateForm.isStatus())
            comment.setStatus(true);
        comment = commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    @Override
    public void delete(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Comment.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = comment.getUser().getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new UserNotTheSameException(comment.getUser().getUsername(), authentication.getName());
        commentRepository.delete(comment);
    }
}
