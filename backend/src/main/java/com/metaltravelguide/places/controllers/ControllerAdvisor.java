package com.metaltravelguide.places.controllers;

import com.metaltravelguide.places.exceptions.AlreadyExistsException;
import com.metaltravelguide.places.exceptions.CannotChangeOtherAdminException;
import com.metaltravelguide.places.exceptions.ElementNotFoundException;
import com.metaltravelguide.places.exceptions.UserNotTheSameException;
import com.metaltravelguide.places.models.dtos.ErrorDTO;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ControllerAdvice // here we will handle all the controller exceptions messages
public class ControllerAdvisor {

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<?> handleException(AlreadyExistsException ex, HttpServletRequest req){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(
                        ErrorDTO.builder()
                                .message(ex.getMessage())
                                .receivedAt( LocalDateTime.now() )
                                .status(409)
                                .method( HttpMethod.resolve(req.getMethod()) )
                                .path( req.getRequestURL().toString() )
                                .build()
                );
    }

    @ExceptionHandler(ElementNotFoundException.class)
    public ResponseEntity<?> handleException(ElementNotFoundException ex, HttpServletRequest req){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(
                        ErrorDTO.builder()
                                .message(ex.getMessage())
                                .receivedAt( LocalDateTime.now() )
                                .status(404)
                                .method( HttpMethod.resolve(req.getMethod()) )
                                .path( req.getRequestURL().toString() )
                                .build()
                );
    }

    @ExceptionHandler(CannotChangeOtherAdminException.class)
    public ResponseEntity<?> handleException(CannotChangeOtherAdminException ex, HttpServletRequest req){
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(
                        ErrorDTO.builder()
                                .message(ex.getMessage())
                                .receivedAt( LocalDateTime.now() )
                                .status(403)
                                .method( HttpMethod.resolve(req.getMethod()) )
                                .path( req.getRequestURL().toString() )
                                .build()
                );
    }

    @ExceptionHandler(UserNotTheSameException.class)
    public ResponseEntity<?> handleException(UserNotTheSameException ex, HttpServletRequest req){
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(
                        ErrorDTO.builder()
                                .message(ex.getMessage())
                                .receivedAt( LocalDateTime.now() )
                                .status(403)
                                .method( HttpMethod.resolve(req.getMethod()) )
                                .path( req.getRequestURL().toString() )
                                .build()
                );
    }
}
