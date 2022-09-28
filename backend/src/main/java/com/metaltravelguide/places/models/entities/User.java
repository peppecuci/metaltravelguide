package com.metaltravelguide.places.models.entities;

import com.metaltravelguide.places.enums.Country;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users") // a table named "user" can't be created, you have to rename it "users" here
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String nickname;
    @Column(columnDefinition = "CHAR(2)")
    private Country countryIso = Country.BE;
    private boolean enabled = true;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = List.of("USER");

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Place> places = new HashSet<>();

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.nickname = username.split("@")[0] + Math.floor(Math.random()*101);
    }

    public User(String username, String password, String nickname) {
        this(username, password);
        this.nickname = nickname;
    }

    public User(String username, String password, String nickname, Country countryIso) {
        this(username, password, nickname);
        this.countryIso = countryIso;
    }

    public User(String username, String password, String nickname, Country countryIso, List<String> roles) {
        this(username, password, nickname, countryIso);
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map((role) -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return isEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return isEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isEnabled();
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
