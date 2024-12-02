package com.example.demo.service;

import java.io.IOException;

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
	
	public String crearCompraPublicacion(String mail, Integer idPublicacion)
			throws IOException {

		CompraPublicacion compra = new CompraPublicacion(mail, idPublicacion);
		compraPublicacion.save(compra);

		return "Compra generada con exito";
		
	}
}
