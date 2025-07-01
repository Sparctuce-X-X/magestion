package com.magestion.magestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.magestion.magestion.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
