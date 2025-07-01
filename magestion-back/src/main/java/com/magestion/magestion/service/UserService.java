package com.magestion.magestion.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.magestion.magestion.model.User;
import com.magestion.magestion.repository.UserRepository;
@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository repository;

    public List<User> getAll(){
        return repository.findAll();
    }

    public User getById(Long id){
        return repository.findById(id).orElse(null);
    }

   public User save(User user){
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return repository.save(user);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public User findByNom(String nom) {
        return repository.findByNom(nom);
    }

}
