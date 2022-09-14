package com.metaltravelguide.places.models.entities;

import com.metaltravelguide.places.enums.Country;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Column(name = "address_street", nullable = false)
    private String street;
    @Column(name = "address_number", nullable = false)
    private int number;
    @Column(name = "address_extra")
    private String extra;
    @Column(name = "address_city", nullable = false)
    private String city;
    @Column(name = "address_region", nullable = false)
    private String region;
    @Column(name = "address_country", nullable = false, columnDefinition = "CHAR(2)")
    private String country;
    @Column(name = "address_lat", nullable = false)
    private double lat;
    @Column(name = "address_lon", nullable = false)
    private double lon;
}
