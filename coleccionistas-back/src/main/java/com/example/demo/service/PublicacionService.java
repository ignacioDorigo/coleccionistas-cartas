package com.example.demo.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.modelo.FotoPublicacion;
import com.example.demo.modelo.Publicacion;
import com.example.demo.modelo.Usuario;
import com.example.demo.repository.FotoPublicacionRepository;
import com.example.demo.repository.PublicacionRepository;

@Service
public class PublicacionService {

	@Autowired
	PublicacionRepository publicacionRepository;

	@Autowired
	FotoPublicacionRepository fotoPublicacionRepository;

	@Autowired
	UsuarioService usuarioService;

	public String crearPublicacion(String mail, String titulo, String descripcion, Double precio, MultipartFile[] files)
			throws IOException {
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario == null) {
			return "El mail " + mail + " no existe";
		} else {
			Publicacion publicacion = new Publicacion(titulo, descripcion, precio, "Activa", mail);
			publicacionRepository.save(publicacion);

			Integer ultimoId = ultimoIdPublicacion();

			if (files != null) {
				for (MultipartFile foto : files) {
					FotoPublicacion fotoBytes = new FotoPublicacion(foto.getBytes(), ultimoId);
					fotoPublicacionRepository.save(fotoBytes);
					System.out.println("FOTO GUARDADA");
				}
			}
			return "Publicacion generada con exito";
		}
	}

	public Integer ultimoIdPublicacion() {
		if (publicacionRepository.count() == 0) {
			return 0;
		} else {
			List<Publicacion> publicaciones = publicacionRepository.findAll();
			Integer ultimoId = 0;
			for (Publicacion publicacion : publicaciones) {
				ultimoId = publicacion.getId();
			}
			return ultimoId;
		}

	}

	public List<Publicacion> publicacionesActivas() {
		List<Publicacion> activas = publicacionRepository.findByEstado("Activa");
		return activas;
	}

	public List<Publicacion> misPublicaciones(String mail) {
		List<Publicacion> misPublicaciones = publicacionRepository.findByMail(mail);
		return misPublicaciones;
	}

	public String eliminarPublicacion(String mail, Integer idPublicacion) {
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario != null) {
			Optional<Publicacion> publicacionOptional = publicacionRepository.findById(idPublicacion);
			if (publicacionOptional.isPresent()) {
				Publicacion publicacion = publicacionOptional.get();
				if (publicacion.getMail().equals(mail)) {
					if (publicacion.getEstado().equals("Activa")) {

//						Eliminamos las fotos asocaiadas a  ese idPublicacion
						List<FotoPublicacion> fotos = fotoPublicacionRepository.findByPublicacion(idPublicacion);
						for (FotoPublicacion foto : fotos) {
							fotoPublicacionRepository.deleteById(foto.getId());
						}

//						Eliminamos la publicacion
						publicacionRepository.deleteById(idPublicacion);

						return "Publicacion eliminada";
					} else {
						return "No podes borrar publicaciones que no esten activas";
					}
				} else {
					return "No podes borrar una publicacion que no es tuya";
				}
			} else {
				return "No existe ese id publicacion";
			}
		} else {
			return "No existe ese usuario";
		}

	}

}
