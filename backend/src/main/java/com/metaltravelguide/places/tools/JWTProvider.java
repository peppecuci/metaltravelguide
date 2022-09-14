package com.metaltravelguide.places.tools;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.stream.Collectors;

@Slf4j // activate Logger log automatically
@Component
public class JWTProvider {
    //    Logger log = LoggerFactory.getLogger(JWTProvider.class); // activate Logger log manually
    private final UserDetailsService userDetailsService;
    private final JWTProperties properties;

    public JWTProvider(UserDetailsService userDetailsService, JWTProperties properties) {
        this.userDetailsService = userDetailsService;
        this.properties = properties;
    }

    public String createToken(Authentication auth) {
        return JWT.create()
                // declare the claims of the payload
                .withExpiresAt(Instant.now().plusSeconds(properties.getExpiresAt()))
                .withSubject(auth.getName())
                .withClaim("roles", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                // declare the signature
                .sign(Algorithm.HMAC512(properties.getSecret())); // you can check the token generated here https://jwt.io/
    }

    public String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader(properties.getHeaderKey());
        return authHeader == null ? null : authHeader.replace(properties.getHeaderPrefix(), "");
    }

    public boolean validate(String token) {
        try {
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(properties.getSecret()))
                    .acceptExpiresAt(properties.getExpiresAt())
                    .build()
                    .verify(token);
            // we can still verify more things here for example
            // return decodedJWT.getSubject().startsWith("C";
            return true;
        }
        catch (JWTVerificationException ex) {
            // log.warn(ex.getMessage(), ex); // if we want to show warnings in the terminal
            return false;
        }
    }

    public Authentication generateAuth(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        UserDetails user = userDetailsService.loadUserByUsername(decodedJWT.getSubject());
        return new UsernamePasswordAuthenticationToken(
                decodedJWT.getSubject(),
                null,
                user.getAuthorities());
    }
}