package com.metaltravelguide.places.controllers;

import com.metaltravelguide.places.models.dtos.TokenDTO;
import com.metaltravelguide.places.models.dtos.UserDTO;
import com.metaltravelguide.places.models.forms.UserCreateForm;
import com.metaltravelguide.places.models.forms.UserLoginForm;
import com.metaltravelguide.places.models.forms.UserUpdateForm;
import com.metaltravelguide.places.services.implementation.CustomUserDetailsServiceImpl;
import com.metaltravelguide.places.tools.JWTProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "https://luisromeroaraya.github.io"})
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final CustomUserDetailsServiceImpl userService;
    private final AuthenticationManager authenticationManager;
    private final JWTProvider jwtProvider;

    public UserController(CustomUserDetailsServiceImpl userService, AuthenticationManager authenticationManager, JWTProvider jwtProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@Valid @RequestBody UserCreateForm form) {
        userService.create(form);
    }

    @PostMapping("/login")
    public TokenDTO login(@Valid @RequestBody UserLoginForm form){
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(form.getUsername(), form.getPassword()));
        return new TokenDTO(jwtProvider.createToken(auth));
    }

    @GetMapping("/all")
    @Secured({"ROLE_ADMIN"})
    public List<UserDTO> readAll() {
        return userService.readAll("USER");
    }

    @GetMapping("/{id:[0-9]+}")
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public UserDTO readOne(@Valid @PathVariable Long id) {
        return userService.readOne(id);
    }

    @PatchMapping("/update/{id:[0-9]+}")
    @Secured({"ROLE_ADMIN"})
    public UserDTO update(@Valid @PathVariable Long id, @Valid @RequestBody UserUpdateForm form) {
        return userService.update(id, form);
    }

    @GetMapping("/profile")
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public UserDTO readProfile(Authentication authentication) {
        return userService.readProfile(authentication.getName());
    }

    @PatchMapping("/updateProfile")
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public UserDTO updateProfile(@Valid @RequestBody UserUpdateForm form, Authentication authentication) {
        form.setUsername(authentication.getName());
        return userService.updateProfile(form);
    }

    @DeleteMapping("/delete/{id:[0-9]+}")
    @Secured({"ROLE_ADMIN"})
    public void delete(@Valid @PathVariable Long id) {
        userService.delete(id);
    }
}
