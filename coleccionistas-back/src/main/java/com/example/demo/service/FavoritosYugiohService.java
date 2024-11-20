package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.modelo.FavoritosYugioh;
import com.example.demo.modelo.Usuario;
import com.example.demo.repository.FavoritosYugiohRepository;

@Service
public class FavoritosYugiohService {
	
	@Autowired
	FavoritosYugiohRepository favoritosYugiohRepository;
	
	@Autowired
	UsuarioService usuarioService;
	
	public String agregarFavorito(String idCard, String mail) {
//		Si es que no existe el usuario (aunque no deberia pasar, pero doble validacion por las dudas)
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario == null) {
			return "Usuario no encontrado";
		}

		List<FavoritosYugioh> misFavoritos = favoritosYugiohRepository.findByMail(mail);
		Boolean yaEsta = false;
		for (FavoritosYugioh favorito : misFavoritos) {
			if (favorito.getId_card().equals(idCard)) {
				yaEsta = true;
				break;
			}
		}
		if (yaEsta == true) {
			return "Ya esta en favoritos";
		} else {
			FavoritosYugioh nuevo = new FavoritosYugioh(mail, idCard);
			favoritosYugiohRepository.save(nuevo);
			return "Agregado a favoritos";
		}
	}

	public List<FavoritosYugioh> misFavoritos(String mail) {
		return favoritosYugiohRepository.findByMail(mail);
	}

	public String eliminarFavorito(String idCard, String mail) {
//		Si es que no existe el usuario (aunque no deberia pasar, pero doble validacion por las dudas)
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario == null) {
			return "Usuario no encontrado";
		}
		List<FavoritosYugioh> misFavoritos = favoritosYugiohRepository.findByMail(mail);
		for (FavoritosYugioh favorito : misFavoritos) {
			if (favorito.getId_card().equals(idCard)) {
				Integer idEliminar = favorito.getId();
				favoritosYugiohRepository.deleteById(idEliminar);
				return "Eliminado de Favoritos";
			}
		}

		return "ID Card no encontrado en Favoritos";
	}
}
