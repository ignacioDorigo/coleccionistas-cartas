package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Coleccion;
import com.example.demo.service.ColeccionService;
import com.example.demo.service.UsuarioService;

@RestController
@RequestMapping("/coleccionistas")
public class Controlador {

	@Autowired
	UsuarioService usuarioService;

	@Autowired
	ColeccionService coleccionService;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestParam String mail, @RequestParam String password,
			@RequestParam Integer edad, @RequestParam String nombre, @RequestParam String apellido) {
		String resultado = usuarioService.register(mail, password, edad, nombre, apellido);
		if (resultado.contains("Registro exitoso")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestParam String mail, @RequestParam String password) {
		String resultado = usuarioService.login(mail, password);
		if (resultado.contains("Login exitoso")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@GetMapping("/recuperarPassword")
	public ResponseEntity<String> recuperarPassword(@RequestParam String mail) {
		String resultado = usuarioService.recuperarContrasenia(mail);
		if (resultado.contains("Contrasenia enviada al correo")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@GetMapping("/coleccionesDisponibles")
	public List<Coleccion> coleccionesDisponibles() {
		return coleccionService.coleccionesDisponibles();
	}

//	public 

}