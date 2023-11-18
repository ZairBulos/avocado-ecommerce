package com.avocado.utils;

import com.avocado.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String JWT_SECRET;

    @Value("${jwt.expiration}")
    private Long JWT_EXPIRATION;

    public String generateToken(User user) {
        Date issuedAt = new Date(System.currentTimeMillis());
        Date expiration = new Date(System.currentTimeMillis() + JWT_EXPIRATION);

        Map<String, Object> claims = generateClaims(user);

        SecretKey key = getSignInKey();

        return Jwts.builder()
                .header()
                .type("JWT")
                .and()
                .subject(user.getEmail())
                .claims(claims)
                .issuedAt(issuedAt)
                .expiration(expiration)
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public Boolean verifyToken(String token, UserDetails userDetails) {
        final String username = getUsername(token);

        return username.equals(userDetails.getUsername()) &&
                !getExpiration(token).before(new Date());
    }

    public String getUsername(String token) {
        return getClaim(token, Claims::getSubject);
    }

    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    private <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        Claims payload = Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claimsResolver.apply(payload);
    }

    private Map<String, Object> generateClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        claims.put("id", user.getId());

        return claims;
    }

    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
    }
}
