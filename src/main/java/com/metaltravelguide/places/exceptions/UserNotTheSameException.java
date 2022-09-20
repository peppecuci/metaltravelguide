package com.metaltravelguide.places.exceptions;

public class UserNotTheSameException extends IllegalArgumentException {
    private final Object owner;
    private final Object user;

    public UserNotTheSameException(Object owner, Object user) {
        super("User {" + user + "} is not the same as the Owner {" + owner + "}.");
        this.owner = owner;
        this.user = user;
    }

    public Object getOwner() {
        return owner;
    }

    public Object getUser() {
        return user;
    }
}
