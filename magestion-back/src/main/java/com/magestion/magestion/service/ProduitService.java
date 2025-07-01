package com.magestion.magestion.service;

//importation de Produit et de ProduitRepository
import com.magestion.magestion.model.Produit;
import com.magestion.magestion.repository.ProduitRepository;

//importation de @Autowired et @Service
//@Autowired : permet à Spring d'iinjecter automatiquement une dépendance
//@service: indique que cette classe est un service métier géré par Sppring 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//importation de  ce qui permet de manipuler la liste d'objets.
import java.util.List;

@Service
public class ProduitService {
    
    @Autowired
    private ProduitRepository repository;

    //lire tout les produits
    public List<Produit> getAll() {
        return repository.findAll();
    }
    public Produit getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Produit save(Produit produit) {
        return repository.save(produit);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

}
