package com.metaltravelguide.places.tools;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
@ConfigurationProperties("application.jwt")
public class JWTProperties implements InitializingBean {
    // @Value("${application.jwt.secret}")
    private String secret;
    // @Value("${application.jwt.expiresAt}")
    private Long expiresAt;
    // @Value("${application.jwt.headerPrefix}")
    private String headerPrefix;
    // @Value("${application.jwt.headerKey}")
    private String headerKey;

    @Override
    public void afterPropertiesSet() {
    }
}