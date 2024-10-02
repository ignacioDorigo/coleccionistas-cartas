package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.EmailSenderService;
import com.example.demo.modelo.PerfilUsuario;
import com.example.demo.modelo.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.mindrot.jbcrypt.BCrypt;
import java.security.SecureRandom;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	EmailSenderService emailSenderService;

	public List<Usuario> usuarios() {
		return usuarioRepository.findAll();
	}

	public class PasswordGenerator {
		private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		private static final int PASSWORD_LENGTH = 10;

		public static String generatePassword() {
			SecureRandom random = new SecureRandom();
			StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
			for (int i = 0; i < PASSWORD_LENGTH; i++) {
				password.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
			}
			return password.toString();
		}
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

			String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(12));

			Usuario nuevo = new Usuario(mail, hashedPassword, edad, nombre, apellido);
			usuarioRepository.save(nuevo);
			String mensajeMail = "Bienvenido " + nombre + " " + apellido + " te has registrado exitosamente en la APP";
			emailSenderService.sendEmail(mail, "Registro en App Coleccionistas", mensajeMail);
			return "Registro exitoso";
		} else {
			return "Mail ya registrado";
		}
	}

	public String login(String mail, String password) {
		Usuario usuario = buscarUsuario(mail);
		if (usuario != null) {
			if (BCrypt.checkpw(password, usuario.getPassword())) {
				return "Login exitoso";
			} else {
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

			String nuevaContrasenia = PasswordGenerator.generatePassword();

			String hashedPassword = BCrypt.hashpw(nuevaContrasenia, BCrypt.gensalt(12));

			usuario.setPassword(hashedPassword);
			usuarioRepository.save(usuario);

			String motivoMail = "Recupero de contraseña temporal";
			String mensajeMail = "Tu nueva contraseña temporal es: " + nuevaContrasenia;
			emailSenderService.sendEmail(mail, motivoMail, mensajeMail);

			return "Nueva contrasenia temporal enviada al correo";
		} else {
			return "No estás registrado en la App";
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

	public PerfilUsuario perfilUsuario(String mail) {
		Usuario usuario = buscarUsuario(mail);
		PerfilUsuario perfil = null;
		if (usuario != null) {
			perfil = new PerfilUsuario(mail, usuario.getEdad(), usuario.getNombre(), usuario.getApellido());
		}
		return perfil;
	}

	public String actualizarNombre(String mail, String nuevoNombre) {
		Usuario usuario = buscarUsuario(mail);
		if (usuario != null) {
			usuario.setNombre(nuevoNombre);
			usuarioRepository.save(usuario);
			return "Nombre modificado";
		} else {
			return "Usuario no encontrado";
		}
	}
}
