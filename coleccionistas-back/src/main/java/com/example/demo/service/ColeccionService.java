package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelo.Coleccion;
import com.example.demo.repository.ColeccionRepository;

@Service
public class ColeccionService {

	@Autowired
	ColeccionRepository coleccionRepository;

	public List<Coleccion> coleccionesDisponibles() {
		return coleccionRepository.findAll();

	}
}
