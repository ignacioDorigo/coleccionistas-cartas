package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.FavoritosPokemon;

@Repository
public interface FavoritosPokemonRepository extends JpaRepository<FavoritosPokemon, Integer> {
	List<FavoritosPokemon> findByMail(String mail);
}
