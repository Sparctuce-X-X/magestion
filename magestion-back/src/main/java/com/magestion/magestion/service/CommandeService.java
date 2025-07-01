package com.magestion.magestion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magestion.magestion.model.Commande;
import com.magestion.magestion.repository.CommandeRepository;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository repository;

    public List<Commande> getAll() {
        return repository.findAll();
    }

    public Commande getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Commande save(Commande commande) {
        return repository.save(commande);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
