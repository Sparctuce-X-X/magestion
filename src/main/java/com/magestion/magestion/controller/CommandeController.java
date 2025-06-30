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

import com.magestion.magestion.model.Commande;
import com.magestion.magestion.service.CommandeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/commandes")
public class CommandeController {

    @Autowired
    private CommandeService service;

    @GetMapping
    public List<Commande> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Commande getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Commande create(@Valid @RequestBody Commande commande) {
        return service.save(commande);
    }

    @PutMapping("/{id}")
    public Commande update(@PathVariable Long id, @Valid @RequestBody Commande commande) {
        commande.setId(id);
        return service.save(commande);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
