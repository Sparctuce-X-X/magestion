package com.magestion.magestion.controller;

import com.magestion.magestion.model.Produit;
import com.magestion.magestion.service.ProduitService;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produits")
public class ProduitController {
    @Autowired
    private ProduitService service;

    @GetMapping 
    public List<Produit> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Produit getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Produit create(@Valid @RequestBody Produit produit) {
        return service.save(produit);
    }

    @PutMapping("/{id}") 
    public Produit update(@PathVariable Long id, @Valid @RequestBody Produit produit){
        produit.setId(id);
        return service.save(produit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

}
