package com.magestion.magestion.config;

import com.magestion.magestion.model.User;
import com.magestion.magestion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String nom) throws UsernameNotFoundException {
        User user = repository.findByNom(nom);
        if (user == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé");
        }

        return new org.springframework.security.core.userdetails.User(
            user.getNom(),
            user.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
