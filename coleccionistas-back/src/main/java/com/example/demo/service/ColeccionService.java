package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelo.Coleccion;
import com.example.demo.modelo.UsuariosColecciones;
import com.example.demo.repository.ColeccionRepository;
import com.example.demo.repository.UsuariosColeccionRepository;

@Service
public class ColeccionService {

	@Autowired
	ColeccionRepository coleccionRepository;

	@Autowired
	UsuariosColeccionRepository usuariosColeccionRepository;

	public List<Coleccion> coleccionesDisponibles() {
		return coleccionRepository.findAll();
	}

	public List<Coleccion> misColecciones(String mail) {
		List<UsuariosColecciones> todosLasColecciones = usuariosColeccionRepository.findAll();
		List<Integer> buscarIdMisColecciones = new ArrayList<>();
		for (UsuariosColecciones coleccion : todosLasColecciones) {
			if (coleccion.getId_usuario().equals(mail)) {
				buscarIdMisColecciones.add(coleccion.getId_coleccion());
			}
		}
		List<Coleccion> misColecciones = dameColeccionesObjetos(buscarIdMisColecciones);
		return misColecciones;
	}

	public List<Coleccion> dameColeccionesObjetos(List<Integer> idsColecciones) {
		List<Coleccion> misColecciones = new ArrayList<>();
		for (Integer idColeccion : idsColecciones) {
			misColecciones.add(coleccionRepository.findById(idColeccion).get());
		}
		return misColecciones;
	}
}
