package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.EmailSenderService;
import com.example.demo.modelo.Usuario;
import com.example.demo.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	EmailSenderService emailSenderService;

	public List<Usuario> usuarios() {
		return usuarioRepository.findAll();
	}

	public String register(String mail, String password, Integer edad, String nombre, String apellido) {
		Usuario usuario = buscarUsuario(mail);
		if (usuario == null) {
			if (edad < 18) {
				return "No podes registrarte siendo menor de edad";
			}
			if (nombre.length() == 0) {
				return "Tu nombre no puede estar vacio";
			}
			if (apellido.length() == 0) {
				return "Tu apellido no puede estar vacio";
			}
			if (mail.length() == 0) {
				return "Tu mail no puede estar vacio";
			}
			if (password.length() == 0) {
				return "Tu password no puede estar vacio";
			}
			Usuario nuevo = new Usuario(mail, password, edad, nombre, apellido);
			usuarioRepository.save(nuevo);
			String mensajeMail = "Bienvenido " + nombre + " " + apellido + " te has registrado exitosamente en la APP";
			emailSenderService.sendEmail(mail, "Registro en App Coleccionistas", mensajeMail);
			return "Registro exitoso";
		} else {
			// El mail ya existe
			return "Mail ya registrado";
		}
	}

	public String login(String mail, String password) {
		Usuario usuario = buscarUsuario(mail);
		if (usuario != null) {
			if (usuario.getPassword().equals(password)) {
				return "Login exitoso";
			} else {
				// No me deja poner enies
				return "Contrasenia incorrecta";
			}
		} else {
			return "Usuario no registrado";
		}
	}

	public String recuperarContrasenia(String mail) {
		Optional<Usuario> usuarioOptional = usuarioRepository.findById(mail);
		if (usuarioOptional.isPresent()) {
			Usuario usuario = usuarioOptional.get();
			String motivoMail = "Recupero de contrasenia";
			String mensajeMail = "Su contrasenia es " + usuario.getPassword();
			emailSenderService.sendEmail(mail, motivoMail, mensajeMail);
			return "Contrasenia enviada al correo";

		} else {
			return "No estas registrado en la App";
		}
	}

	public Usuario buscarUsuario(String mail) {
		Optional<Usuario> usuarioOptional = usuarioRepository.findById(mail);
		if (usuarioOptional.isPresent()) {
			return usuarioOptional.get();
		} else {
			return null;
		}
	}
}
