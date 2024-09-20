package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelo.Coleccion;
import com.example.demo.modelo.UsuarioCard;
import com.example.demo.modelo.UsuarioSet;
import com.example.demo.modelo.UsuariosColecciones;
import com.example.demo.repository.UsuarioSetRepository;
import com.example.demo.repository.UsuariosColeccionRepository;

@Service
public class UsuarioSetService {

	@Autowired
	UsuarioSetRepository usuarioSetRepository;

	@Autowired
	UsuariosColeccionRepository usuariosColeccionRepository;

	@Autowired
	ColeccionService coleccionService;

	public String crearSet(String mail, String idSet, Integer idColeccion) {
		List<Coleccion> colecciones = coleccionService.misColecciones(mail);
		Boolean yaEsta = false;
		for (Coleccion coleccion : colecciones) {
			if (coleccion.getId() == idColeccion) {
				yaEsta = true;
				break;
			}
		}
		if (yaEsta == false) {
			UsuariosColecciones nuevo = new UsuariosColecciones(mail, idColeccion);
			usuariosColeccionRepository.save(nuevo);
		}

//		Pedimos y verificamos que no tenga ya creado de esa coleccion 
		List<UsuarioSet> setsUsuario = usuarioSetRepository.findByMail(mail);
		Boolean creado = false;
		for (UsuarioSet sets : setsUsuario) {
			if (sets.getId_set().equals(idSet)) {
				creado = true;
				break;
			}
		}
		if (creado == true) {
			return "Ya tenes este mazo creado";
		} else {
			UsuarioSet nuevo = new UsuarioSet(mail, idSet);
			usuarioSetRepository.save(nuevo);
			return "Set creado correctamente";
		}
	}

	public List<UsuarioSet> misSets(String mail) {
		return usuarioSetRepository.findByMail(mail);
	}

}
