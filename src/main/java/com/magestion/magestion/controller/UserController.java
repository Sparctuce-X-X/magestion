package com.magestion.magestion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.magestion.magestion.model.User;
import com.magestion.magestion.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;
    
    @GetMapping
    public List<User> getAll(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public User create(@Valid @RequestBody User user) {
        return service.save(user);
    }

    @PutMapping("/{id}") 
    public User update(@PathVariable Long id, @Valid @RequestBody User user){
        user.setId(id);
        return service.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }


}
