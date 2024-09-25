package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Coleccion;
import com.example.demo.modelo.FavoritosPokemon;
import com.example.demo.modelo.UsuarioCard;
import com.example.demo.modelo.UsuarioSet;
import com.example.demo.service.ColeccionService;
import com.example.demo.service.FavoritosPokemonService;
import com.example.demo.service.UsuarioCardService;
import com.example.demo.service.UsuarioService;
import com.example.demo.service.UsuarioSetService;

@RestController
@RequestMapping("/coleccionistas")
public class Controlador {

	@Autowired
	UsuarioService usuarioService;

	@Autowired
	ColeccionService coleccionService;

	@Autowired
	UsuarioSetService usuarioSetService;

	@Autowired
	UsuarioCardService usuarioCardService;
	
	@Autowired
	FavoritosPokemonService favoritosPokemonService;
	
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
		if (resultado.equals("Nueva contrasenia temporal enviada al correo")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@GetMapping("/coleccionesDisponibles")
	public List<Coleccion> coleccionesDisponibles() {
		return coleccionService.coleccionesDisponibles();
	}

	@GetMapping("/misColecciones")
	public List<Coleccion> misColecciones(@RequestParam String mail) {
		return coleccionService.misColecciones(mail);
	}

	@PostMapping("/crearColeccion")
	public ResponseEntity<String> crearColeccion(@RequestParam String mail, @RequestParam String idMazo,
			@RequestParam Integer idColeccion) {
		String resultado = usuarioSetService.crearSet(mail, idMazo, idColeccion);
		if (resultado.contains("Set creado correctamente")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@PostMapping("/agregarCarta")
	public ResponseEntity<String> agregarCarta(@RequestParam String mail, @RequestParam String idSet,
			@RequestParam String idCard) {
		String resultado = usuarioCardService.agregarCarta(mail, idSet, idCard);
		if (resultado.contains("Carta agregada con exito")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@GetMapping("/misSets")
	public List<UsuarioSet> misSets(@RequestParam String mail) {
		return usuarioSetService.misSets(mail);
	}

	@GetMapping("/misCartasSet")
	public List<UsuarioCard> misCartasSet(@RequestParam String mail, @RequestParam String idSet) {
		return usuarioCardService.misCartasSet(mail, idSet);

	}
	
	@PostMapping("/agregarFavoritoPokemon")
	public ResponseEntity<String> agregarFavoritoPokemon(@RequestParam String idCard, @RequestParam String mail) {
		String resultado = favoritosPokemonService.agregarFavorito(idCard, mail);
		if (resultado.contains("Agregado a favoritos")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}
	
	@GetMapping("/misFavoritosPokemon")
	public List<FavoritosPokemon> misFavoritosPokemons(@RequestParam String mail){
		return favoritosPokemonService.misFavoritos(mail);
	}
	
	@DeleteMapping("/eliminarFavoritoPokemon")
	public ResponseEntity<String> eliminarFavoritoPokemon(@RequestParam String idCard, @RequestParam String mail){
		String resultado = favoritosPokemonService.eliminarFavorito(idCard, mail);
		if (resultado.contains("Eliminado de Favoritos")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}
	
}