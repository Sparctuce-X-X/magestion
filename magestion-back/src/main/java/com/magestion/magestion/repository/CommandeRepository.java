package com.magestion.magestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.magestion.magestion.model.Commande;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
