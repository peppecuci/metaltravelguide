package com.metaltravelguide.places.services.implementation;

import com.metaltravelguide.places.exceptions.CannotChangeOtherAdminException;
import com.metaltravelguide.places.exceptions.ElementNotFoundException;
import com.metaltravelguide.places.exceptions.UserNotTheSameException;
import com.metaltravelguide.places.mappers.UserMapper;
import com.metaltravelguide.places.models.dtos.UserDTO;
import com.metaltravelguide.places.models.entities.User;
import com.metaltravelguide.places.models.forms.UserCreateForm;
import com.metaltravelguide.places.models.forms.UserUpdateForm;
import com.metaltravelguide.places.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.metaltravelguide.places.mappers.UserMapper.findByName;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;

    public CustomUserDetailsServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Connection not possible."));
    }

    public void create(UserCreateForm form) {
        User user = userMapper.toEntity(form);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public List<UserDTO> readAll(String role) {
        return userRepository.findUsersByRole(role).stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

    public UserDTO readOne(Long id) {
        return userMapper.toDto(userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Connection not possible.")));
    }

    public UserDTO update(Long id, UserUpdateForm form) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(User.class, id));
        boolean isAdmin = user.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin)
            throw new CannotChangeOtherAdminException(User.class, user.getUsername());
        if (form.getPassword() != null)
            user.setPassword(encoder.encode(form.getPassword()));
        if (form.getMail() != null)
            user.setMail(form.getMail());
        if (form.getFirstName() != null)
            user.setFirstName(form.getFirstName());
        if (form.getLastName() != null)
            user.setLastName(form.getLastName());
        if (form.getCountryIso() != null)
            user.setCountryIso(findByName(form.getCountryIso()));
        userRepository.save(user);
        return userMapper.toDto(user);
    }

    public UserDTO readProfile(String username) {
        return userMapper.toDto(userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Connection not possible.")));
    }

    public UserDTO updateProfile(UserUpdateForm form) {
        User user = userRepository.findByUsername(form.getUsername())
                .orElseThrow(() -> new ElementNotFoundException(User.class, form.getUsername()));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = user.getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new UserNotTheSameException(user.getUsername(), authentication.getName());
        if (form.getPassword() != null)
            user.setPassword(encoder.encode(form.getPassword()));
        if (form.getMail() != null)
            user.setMail(form.getMail());
        if (form.getFirstName() != null)
            user.setFirstName(form.getFirstName());
        if (form.getLastName() != null)
            user.setLastName(form.getLastName());
        if (form.getCountryIso() != null)
            user.setCountryIso(findByName(form.getCountryIso()));
        userRepository.save(user);
        return userMapper.toDto(user);
    }

    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(User.class, id));
        boolean isAdmin = user.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin)
            throw new CannotChangeOtherAdminException(User.class, user.getUsername());
        userRepository.delete(user);
    }
}