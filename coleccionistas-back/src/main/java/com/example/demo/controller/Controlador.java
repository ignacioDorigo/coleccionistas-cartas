package com.example.demo.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.modelo.Avatar;
import com.example.demo.modelo.Coleccion;
import com.example.demo.modelo.FavoritosPokemon;
import com.example.demo.modelo.FavoritosYugioh;
import com.example.demo.modelo.FotoPublicacion;
import com.example.demo.modelo.PerfilUsuario;
import com.example.demo.modelo.Publicacion;
import com.example.demo.modelo.Usuario;
import com.example.demo.modelo.UsuarioCard;
import com.example.demo.modelo.UsuarioCardYugioh;
import com.example.demo.modelo.UsuarioSet;
import com.example.demo.modelo.UsuarioSetYugioh;
import com.example.demo.repository.AvatarRepository;
import com.example.demo.repository.FotoPublicacionRepository;
import com.example.demo.repository.PublicacionRepository;
import com.example.demo.service.ChatgptService;
import com.example.demo.service.ColeccionService;
import com.example.demo.service.FavoritosPokemonService;
import com.example.demo.service.FavoritosYugiohService;
import com.example.demo.service.PublicacionService;
import com.example.demo.service.UsuarioCardService;
import com.example.demo.service.UsuarioCardYugiohService;
import com.example.demo.service.UsuarioService;
import com.example.demo.service.UsuarioSetService;
import com.example.demo.service.UsuarioSetYugiohService;
import com.example.demo.service.CompraPublicacionService;
import com.example.demo.repository.CompraPublicacionRepository;


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

	@Autowired
	FavoritosYugiohService favoritosYugiohService;

	@Autowired
	PublicacionRepository publicacionRepository;

	@Autowired
	AvatarRepository avatarRepository;

	@Autowired
	PublicacionService publicacionService;

	@Autowired
	FotoPublicacionRepository fotoPublicacionRepository;

	@Autowired
	UsuarioSetYugiohService usuarioSetYugiohService;

	@Autowired
	UsuarioCardYugiohService usuarioCardYugiohService;

	@Autowired
	ChatgptService chatgptService;
	
	@Autowired
	CompraPublicacionService compraPublicacionService;
	
	@Autowired
	CompraPublicacionRepository compraPublicacionRepository;

//	FotoPublicacion foto;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestParam String mail, @RequestParam String password,
			@RequestParam Integer edad, @RequestParam String nombre, @RequestParam String apellido) {
		String resultado = usuarioService.register(mail, password, edad, nombre, apellido);
		if (resultado.contains("Registro exitoso")) {
			System.out.println("ESTADO DEL REGISTER: EXITOSO");
			return ResponseEntity.ok(resultado);
		} else {
			System.out.println("ESTADO DEL REGISTER: FALLIDO " + resultado);
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestParam String mail, @RequestParam String password) {
		String resultado = usuarioService.login(mail, password);
		if (resultado.contains("Login exitoso")) {
			System.out.println("ESTADO DEL LOGIN: EXITOSO ");
			return ResponseEntity.ok(resultado);
		} else {
			System.out.println("ESTADO DEL LOGIN: FALLIDO " + resultado);
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

	@DeleteMapping("/eliminarCartaInventario")
	public ResponseEntity<String> eliminarCartaInventario(@RequestParam String mail, @RequestParam String idSet,
			@RequestParam String idCard) {
		String resultado = usuarioCardService.eliminarCartaInventario(mail, idSet, idCard);
		if (resultado.contains("Carta eliminada del inventario")) {
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
	public List<FavoritosPokemon> misFavoritosPokemons(@RequestParam String mail) {
		return favoritosPokemonService.misFavoritos(mail);
	}

	@DeleteMapping("/eliminarFavoritoPokemon")
	public ResponseEntity<String> eliminarFavoritoPokemon(@RequestParam String idCard, @RequestParam String mail) {
		String resultado = favoritosPokemonService.eliminarFavorito(idCard, mail);
		if (resultado.contains("Eliminado de Favoritos")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@GetMapping("/perfilUsuario")
	public PerfilUsuario perfilUsuario(@RequestParam String mail) {
		return usuarioService.perfilUsuario(mail);
	}

	@PutMapping("/actualizarNombre")
	public ResponseEntity<String> actualizarNombre(@RequestParam String mail, @RequestParam String nuevoNombre) {
		String resultado = usuarioService.actualizarNombre(mail, nuevoNombre);
		if (resultado.contains("Nombre modificado")) {
			System.out.println("Nombre actualizado");
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@PutMapping("/actualizarApellido")
	public ResponseEntity<String> actualizarApellido(@RequestParam String mail, @RequestParam String nuevoApellido) {
		String resultado = usuarioService.actualizarApellido(mail, nuevoApellido);
		if (resultado.contains("Apellido modificado")) {
			System.out.println("Apellido modificado");
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@PutMapping("/actualizarContrasenia")
	public ResponseEntity<String> actualizarContrasenia(@RequestParam String mail, @RequestParam String actual,
			@RequestParam String nueva, @RequestParam String repetirNueva) {
		String resultado = usuarioService.actualizarContrasenia(mail, actual, nueva, repetirNueva);
		if (resultado.contains("Contrasena actualizada")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@PostMapping("/actualizarAvatar")
	public ResponseEntity<String> uploadImagen(@RequestParam String mail, @RequestParam("file") MultipartFile file) {
		try {
			Avatar avatar = new Avatar();
			avatar.setMail(mail);
			avatar.setFoto(file.getBytes()); // convertir el archivo en array de bytes
			avatarRepository.save(avatar);
			return ResponseEntity.ok("Imagen guardada exitosamente");
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen");
		}
	}

	@GetMapping("/avatar/{mail}")
	public ResponseEntity<byte[]> getAvatar(@PathVariable String mail) {
		byte[] imageBytes = avatarRepository.findById(mail).map(Avatar::getFoto).orElse(null);

		if (imageBytes != null) {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_JPEG);
			return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@GetMapping("/publicaciones")
	public List<Publicacion> publicacionesActivas() {
		return publicacionService.publicacionesActivas();
	}

	@GetMapping("/imagenes/{idPublicacion}")
	public ResponseEntity<List<byte[]>> imagenesPublicacion(@PathVariable Integer idPublicacion) {
		List<byte[]> imagenes = fotoPublicacionRepository.findByPublicacion(idPublicacion).stream()
				.map(FotoPublicacion::getImagen).collect(Collectors.toList());
		if (!imagenes.isEmpty()) {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON); // Configuración para enviar lista de imágenes
			return new ResponseEntity<>(imagenes, headers, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping("/publicarCarta")
	public ResponseEntity<String> publicarCarta(@RequestParam String mail, @RequestParam String titulo,
			@RequestParam String descripcion, @RequestParam Double precio,
			@RequestParam(value = "files", required = false) MultipartFile[] files) throws IOException {
		String resultado = publicacionService.crearPublicacion(mail, titulo, descripcion, precio, files);
		if (resultado.contains("Publicacion generada con exito")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}

	@GetMapping("/misPublicaciones")
	public List<Publicacion> misPublicaciones(@RequestParam String mail) {
		return publicacionService.misPublicaciones(mail);
	}

	@DeleteMapping("/eliminarPublicacion")
	public ResponseEntity<String> eliminarPublicacion(@RequestParam String mail, @RequestParam Integer idPublicacion) {
		String resultado = publicacionService.eliminarPublicacion(mail, idPublicacion);
		if (resultado.contains("Publicacion eliminada")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}

	@PutMapping("/publicacion/actualizarTitulo")
	public ResponseEntity<String> actualizarTitulo(@RequestParam String mail, @RequestParam Integer idPublicacion,
			@RequestParam String titulo) {
		String resultado = publicacionService.actualizarTitulo(mail, idPublicacion, titulo);
		if (resultado.contains("Titulo actualizado correctamente")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}

	@PutMapping("/publicacion/actualizarDescripcion")
	public ResponseEntity<String> actualizarDescripcion(@RequestParam String mail, @RequestParam Integer idPublicacion,
			@RequestParam String descripcion) {
		String resultado = publicacionService.actualizarDescripcion(mail, idPublicacion, descripcion);
		if (resultado.contains("Descripcion actualizada correctamente")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}

	@PutMapping("/publicacion/actualizarPrecio")
	public ResponseEntity<String> actualizarPrecio(@RequestParam String mail, @RequestParam Integer idPublicacion,
			@RequestParam Double precio) {
		String resultado = publicacionService.actualizarPrecio(mail, idPublicacion, precio);
		if (resultado.contains("Precio actualizado correctamente")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}
	
	@PutMapping("/publicacion/actualizarEstado")
	public ResponseEntity<String> actualizarEstado (@RequestParam Integer idPublicacion) {
		String resultado = publicacionService.actualizarEstado(idPublicacion);
		if (resultado.contains("Estado actualizado correctamente")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}
	
	@PutMapping("/editarPublicacion")
	public ResponseEntity<String> editarPublicacion(@RequestParam String mail, @RequestParam Integer idPublicacion,
			@RequestBody Publicacion nuevaPublicacion) {
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario != null) {
			Optional<Publicacion> publicacionOptional = publicacionRepository.findById(idPublicacion);
			if (publicacionOptional.isPresent()) {
				Publicacion publicacion = publicacionOptional.get();
				if (publicacion.getMail().equals(mail)) {
					publicacion.setTitulo(nuevaPublicacion.getTitulo());
					publicacion.setDescripcion(nuevaPublicacion.getDescripcion());
					publicacion.setPrecio(nuevaPublicacion.getPrecio());
					publicacionRepository.save(publicacion);
					return ResponseEntity.ok("Publicación actualizada exitosamente");
				} else {
					return ResponseEntity.status(HttpStatus.FORBIDDEN)
							.body("No puedes editar una publicación que no es tuya");
				}
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe esa publicación");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe ese usuario");
		}
	}

	@PostMapping("/yugioh/crearColeccion")
	public ResponseEntity<String> crearColeccionYugioh(@RequestParam String mail, @RequestParam String setName,
			@RequestParam Integer idColeccion) {
		String resultado = usuarioSetYugiohService.crearSet(mail, setName, idColeccion);
		if (resultado.contains("Set creado correctamente")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@PostMapping("yugioh/agregarCarta")
	public ResponseEntity<String> agregarCartaYugioh(@RequestParam String mail, @RequestParam String setName,
			@RequestParam String cardName) {
		String resultado = usuarioCardYugiohService.agregarCarta(mail, setName, cardName);
		if (resultado.contains("Carta agregada con exito")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@DeleteMapping("yugioh/eliminarCartaInventario")
	public ResponseEntity<String> eliminarCartaInventarioYugioh(@RequestParam String mail, @RequestParam String setName,
			@RequestParam String cardName) {
		String resultado = usuarioCardYugiohService.eliminarCartaInventario(mail, setName, cardName);
		if (resultado.contains("Carta eliminada del inventario")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@GetMapping("yugioh/misSets")
	public List<UsuarioSetYugioh> misSetsYugioh(@RequestParam String mail) {
		return usuarioSetYugiohService.misSets(mail);
	}

	@DeleteMapping("pokemon/eliminarSet")
	public ResponseEntity<String> eliminarSetPokemon(@RequestParam String mail, @RequestParam String idSet) {
		String resultado = usuarioSetService.eliminarSet(mail, idSet);
		if (resultado.contains("Set eliminado")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}

	@GetMapping("/yugioh/misCartas")
	public List<UsuarioCardYugioh> misCartasSetYugioh(@RequestParam String mail, @RequestParam String idSet) {
		return usuarioCardYugiohService.misCartasSet(mail, idSet);
	}

	@DeleteMapping("yugioh/eliminarSet")
	public ResponseEntity<String> eliminarSetYugioh(@RequestParam String mail, @RequestParam String idSet) {
		String resultado = usuarioSetYugiohService.eliminarSet(mail, idSet);
		if (resultado.contains("Set eliminado")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}

	@GetMapping("/misFavoritosYugioh")
	public List<FavoritosYugioh> misFavoritosYugioh(@RequestParam String mail) {
		return favoritosYugiohService.misFavoritos(mail);
	}

	@PostMapping("/agregarFavoritoYugioh")
	public ResponseEntity<String> agregarFavoritoYugioh(@RequestParam String idCard, @RequestParam String mail) {
		String resultado = favoritosYugiohService.agregarFavorito(idCard, mail);
		if (resultado.contains("Agregado a favoritos")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@DeleteMapping("/eliminarFavoritoYugioh")
	public ResponseEntity<String> eliminarFavoritoYugioh(@RequestParam String idCard, @RequestParam String mail) {
		String resultado = favoritosYugiohService.eliminarFavorito(idCard, mail);
		if (resultado.contains("Eliminado de Favoritos")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.status(400).body(resultado);
		}
	}

	@PostMapping("/obtenerFiabilidadDeTarjeta")
	public ResponseEntity<String> obtenerFiabilidadDeTarjeta(@RequestParam String imageUrl) {
		String resultado = chatgptService.obtenerFiabilidadDeTarjeta(imageUrl);
		if (resultado.contains("Score de la carte es:")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}
	
	
	@PostMapping("/agregarCompra")
	public ResponseEntity<String> agregarCompra(@RequestParam String mail, @RequestParam Integer idPublicacion) throws IOException {
		
		String resultado = compraPublicacionService.crearCompraPublicacion(mail, idPublicacion);
		
		if (resultado.contains("Compra generada con exito")) {
			return ResponseEntity.ok(resultado);
		} else {
			return ResponseEntity.badRequest().body(resultado);
		}
	}
}