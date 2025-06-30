package com.magestion.magestion.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nom;

    @Positive
    private double prix;

    @Positive
    private int stock;

    public Produit(){}

    //Constructeur
    public Produit(String nom , double prix , int stock ){
        this.nom = nom;
        this.prix = prix;
        this.stock = stock;
    }

    // Getters & Setters
    public long getId() {
        return id;
    }

     public void setId(long id) {
        this.id = id ;
    }
    public String getNom(){
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public int getStock(){
        return stock;
    }

    public void setStock(int stock){
        this.stock = stock;
    }

}
