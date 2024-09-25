package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelo.Usuario;
import com.example.demo.modelo.UsuarioCard;
import com.example.demo.repository.UsuarioCardRepository;

@Service
public class UsuarioCardService {

	@Autowired
	UsuarioCardRepository usuarioCardRepository;

	@Autowired
	UsuarioService usuarioService;

//
	public String agregarCarta(String mail, String idSet, String idCard) {

//		Si es que no existe el usuario (aunque no deberia pasar, pero doble validacion por las dudas)
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario == null) {
			return "Usuario no encontrado";
		}

		List<UsuarioCard> misCartas = usuarioCardRepository.findByMail(mail);
		boolean yaEsta = false;
		for (UsuarioCard carta : misCartas) {
			if (carta.getId_card().equals(idCard) && carta.getId_set().equals(idSet)) {
				yaEsta = true;
				break;
			}
		}
		if (yaEsta == false) {
			UsuarioCard nueva = new UsuarioCard(mail, idSet, idCard);
			usuarioCardRepository.save(nueva);
			return "Carta agregada con exito";

		} else {
			return "Ya tenes esa carta";
		}
	}

	public List<UsuarioCard> misCartasSet(String mail, String idSet) {
		List<UsuarioCard> misCartas = usuarioCardRepository.findByMail(mail);
		List<UsuarioCard> misCartasDeUnSet = new ArrayList<>();
		for (UsuarioCard carta : misCartas) {
			if (carta.getId_set().equals(idSet)) {
				misCartasDeUnSet.add(carta);
			}
		}
		return misCartasDeUnSet;
	}

}
