package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelo.Coleccion;
import com.example.demo.modelo.Usuario;
import com.example.demo.modelo.UsuarioSet;
import com.example.demo.modelo.UsuarioSetYugioh;
import com.example.demo.modelo.UsuariosColecciones;
import com.example.demo.repository.UsuarioSetRepository;
import com.example.demo.repository.UsuarioSetYugiohRepository;
import com.example.demo.repository.UsuariosColeccionRepository;

@Service
public class UsuarioSetYugiohService {
	
	@Autowired
	UsuarioSetYugiohRepository usuarioSetYugiohRepository;

	@Autowired
	UsuariosColeccionRepository usuariosColeccionRepository;

	@Autowired
	ColeccionService coleccionService;

	@Autowired
	UsuarioService usuarioService;
	
	public String crearSet(String mail, String idSet, Integer idColeccion) {

//		Si es que no existe el usuario (aunque no deberia pasar, pero doble validacion por las dudas)
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario == null) {
			return "Usuario no encontrado";
		}

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
		List<UsuarioSetYugioh> setsUsuario = usuarioSetYugiohRepository.findByMail(mail);
		Boolean creado = false;
		for (UsuarioSetYugioh sets : setsUsuario) {
			if (sets.getId_set().equals(idSet)) {
				creado = true;
				break;
			}
		}
		if (creado == true) {
			return "Ya tenes este mazo creado";
		} else {
			UsuarioSetYugioh nuevo = new UsuarioSetYugioh(mail, idSet);
			usuarioSetYugiohRepository.save(nuevo);
			return "Set creado correctamente";
		}
	}

	public List<UsuarioSetYugioh> misSets(String mail) {
		return usuarioSetYugiohRepository.findByMail(mail);
	}

}
