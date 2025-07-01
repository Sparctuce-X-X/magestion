package com.magestion.magestion.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.magestion.magestion.model.Client;
import com.magestion.magestion.repository.ClientRepository;

@Service
public class ClientService {

    private final ClientRepository repository;

    public ClientService(ClientRepository repository) {
        this.repository = repository;
    }

    public List<Client> getAll() {
        return repository.findAll();
    }

    public Client getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Client save(Client client) {
        return repository.save(client);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
