package com.magestion.magestion.model;


import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
@Entity
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String produit;

    @NotNull
    private Double montant;

    @Temporal(TemporalType.DATE)
    private Date date = new Date();

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToMany
    @JoinTable(
    name = "commande_produit",
    joinColumns = @JoinColumn(name = "commande_id"),
    inverseJoinColumns = @JoinColumn(name = "produit_id")
    )
    private List<Produit> produits;


    // Constructeur vide obligatoire pour JPA
    public Commande() {
    }

    // Constructeur avec tous les champs utiles (sauf id qui est auto-généré)
    public Commande(String produit, Double montant, Date date, Client client) {
        this.produit = produit;
        this.montant = montant;
        this.date = date;
        this.client = client;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProduit() {
        return produit;
    }

    public void setProduit(String produit) {
        this.produit = produit;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
