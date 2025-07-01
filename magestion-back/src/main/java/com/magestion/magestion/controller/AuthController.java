package com.magestion.magestion.controller;

import com.magestion.magestion.model.User;
import com.magestion.magestion.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String jwtSecret = "MaSuperCleUltraSecretePourJWTQuiFaitAuMoins88CaracteresDeLongueur1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    private final long jwtExpirationMs = 86400000; // 24h

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        String nom = credentials.get("nom");
        String password = credentials.get("password");
        User user = userService.findByNom(nom);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            String token = Jwts.builder()
                    .setSubject(nom)
                    .claim("role", user.getRole().name())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return response;
        } else {
            throw new RuntimeException("Identifiants invalides");
        }
    }

    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> data) {
        String nom = data.get("nom");
        String password = data.get("password");
        String role = data.getOrDefault("role", "USER");
        User user = new User();
        user.setNom(nom);
        user.setPassword(password);
        user.setRole(com.magestion.magestion.model.Role.valueOf(role));
        return userService.save(user);
    }
}