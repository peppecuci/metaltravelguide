package com.metaltravelguide.places.models.forms;

import com.metaltravelguide.places.models.entities.Address;
import com.metaltravelguide.places.models.entities.Contact;
import com.metaltravelguide.places.models.entities.Type;
import lombok.Data;

@Data
public class PlaceUpdateForm {
    private String googleId;
    private String name;
    private Address address;
    private Contact contact;
    private Type type;
    private String description;
    private String image;
    private String username;
}
