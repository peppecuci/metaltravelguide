package com.metaltravelguide.places.exceptions;

public class CannotChangeOtherAdminException extends IllegalArgumentException{
    private final Class<?> clazz;
    private final Object object;

    public CannotChangeOtherAdminException(Class<?> clazz, Object object) {
        super("Cannot change entity {" + clazz.getSimpleName()+ "} because {" + object + "} has 'ROLE_ADMIN'");
        this.clazz = clazz;
        this.object = object;
    }

    public Class<?> getClazz() {
        return clazz;
    }

    public Object getObject() {
        return object;
    }
}
