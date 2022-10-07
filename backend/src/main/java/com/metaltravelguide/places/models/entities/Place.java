package com.metaltravelguide.places.models.entities;

import com.metaltravelguide.places.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "places")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;
    private String googleId;
    @Column(nullable = false, unique = true)
    private String name;
    @Embedded
    private Address address;
    @Embedded
    private Contact contact;
    private Type type;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "TEXT")
    private String image;
    private boolean status = false;
    @CreationTimestamp
    private Instant dateCreated;
    @UpdateTimestamp
    private Instant dateLastModified;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @ManyToMany
    private Set<User> likes = new HashSet<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments = new HashSet<>();

    public Place(String name, Address address, Contact contact, Type type, String description, String image) {
        this.name = name;
        this.address = address;
        this.contact = contact;
        this.type = type;
        this.description = description;
        this.image = image;
    }

    public Place(String name, Address address, Contact contact, Type type, String description, String image, boolean status, User user) {
        this(name, address, contact, type, description, image);
        this.status = status;
        this.user = user;
    }

    public Place(String name, Address address, Contact contact, Type type, String description, String image, boolean status, User user, Set<User> likes) {
        this(name, address, contact, type, description, image, status, user);
        this.likes = likes;
    }
}
