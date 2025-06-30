package com.magestion.magestion.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // encodage sécurisé
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // désactivation CSRF (pour tests API)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/clients/**").authenticated()  // accès avec authentification
                .requestMatchers("/produits/**").authenticated()
                .requestMatchers("/users/**").authenticated()
                .requestMatchers("/commandes/**").authenticated()
                .anyRequest().permitAll() // le reste est libre
            )
            .httpBasic(); // authentification basique (header Authorization)

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
