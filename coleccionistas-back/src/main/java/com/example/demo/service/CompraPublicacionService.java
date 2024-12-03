package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.modelo.CompraPublicacion;
import com.example.demo.repository.CompraPublicacionRepository;

import com.example.demo.modelo.FotoPublicacion;
import com.example.demo.modelo.Publicacion;
import com.example.demo.modelo.Usuario;
import com.example.demo.repository.FotoPublicacionRepository;
import com.example.demo.repository.PublicacionRepository;

@Service
public class CompraPublicacionService {

	@Autowired
	CompraPublicacionRepository compraPublicacion;

	@Autowired
	PublicacionRepository publicacionRepository;

	@Autowired
	FotoPublicacionRepository fotoPublicacionRepository;

	UsuarioService usuarioService;

	public String crearCompraPublicacion(String mail, Integer idPublicacion) throws IOException {

		CompraPublicacion compra = new CompraPublicacion(mail, idPublicacion);
		compraPublicacion.save(compra);

		return "Compra generada con exito";

	}

	public List<CompraPublicacion> misCompras(String mail) {
		List<CompraPublicacion> misCompras = compraPublicacion.findByMail(mail);
		return misCompras;
	}

	public List<CompraPublicacion> misVentas(String mail) {
		List<Publicacion> publicaciones = publicacionRepository.findByMail(mail);
		List<CompraPublicacion> ventas = new ArrayList<>();
		for (Publicacion publicacion : publicaciones) {
			Integer idPublicacion = publicacion.getId();
			List<CompraPublicacion> compra = compraPublicacion.findByIdPublicacion(idPublicacion);
			if (compra.size() > 0) {
				ventas.add(compra.get(0));
			}
		}
		return ventas;
	}
}
