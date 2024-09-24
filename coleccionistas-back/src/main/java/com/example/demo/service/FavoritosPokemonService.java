package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelo.FavoritosPokemon;
import com.example.demo.repository.FavoritosPokemonRepository;

@Service
public class FavoritosPokemonService {
	@Autowired
	FavoritosPokemonRepository favoritosPokemonRepository;
	
	public String agregarFavorito (String idCard, String mail) {
		List<FavoritosPokemon> misFavoritos = favoritosPokemonRepository.findByMail(mail);
		Boolean yaEsta = false;
		for (FavoritosPokemon favorito : misFavoritos) {
			if (favorito.getId().equals(idCard)) {
				yaEsta  = true;
				break;
			}
		}
		
		if (yaEsta == true) {
			return "Ya esta en favoritos";
		} else {
			FavoritosPokemon nuevo = new FavoritosPokemon(mail, idCard);
			favoritosPokemonRepository.save(nuevo);
			return "Agregado a favoritos";
		}
	}
	
	public List<FavoritosPokemon> misFavoritos (String mail) {
		return favoritosPokemonRepository.findByMail(mail);
	}
	
	public String eliminarFavorito (String idCard, String mail) {
		List<FavoritosPokemon> misFavoritos = favoritosPokemonRepository.findByMail(mail);
		for (FavoritosPokemon favorito : misFavoritos) {
			if (favorito.getId_card().equals(idCard)) {
				Integer idEliminar = favorito.getId();
				favoritosPokemonRepository.deleteById(idEliminar);
				break;
			}
		}
		
		return "Eliminado de Favoritos";
	}
}
