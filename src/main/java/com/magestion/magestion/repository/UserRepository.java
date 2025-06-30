package com.magestion.magestion.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.magestion.magestion.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
User findByNom(String nom);
}