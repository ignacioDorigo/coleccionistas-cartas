package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelo.Usuario;
import com.example.demo.modelo.UsuarioCard;
import com.example.demo.modelo.UsuarioCardYugioh;
import com.example.demo.repository.UsuarioCardYugiohRepository;

@Service
public class UsuarioCardYugiohService {
	
	@Autowired
	UsuarioCardYugiohRepository usuarioCardYugiohRepository;

	@Autowired
	UsuarioService usuarioService;
	
	
	public String agregarCarta(String mail, String idSet, String idCard) {

//		Si es que no existe el usuario (aunque no deberia pasar, pero doble validacion por las dudas)
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario == null) {
			return "Usuario no encontrado";
		}

		List<UsuarioCardYugioh> misCartas = usuarioCardYugiohRepository.findByMail(mail);
		boolean yaEsta = false;
		for (UsuarioCardYugioh carta : misCartas) {
			if (carta.getId_card().equals(idCard) && carta.getId_set().equals(idSet)) {
				yaEsta = true;
				break;
			}
		}
		if (yaEsta == false) {
			UsuarioCardYugioh nueva = new UsuarioCardYugioh(mail, idSet, idCard);
			usuarioCardYugiohRepository.save(nueva);
			return "Carta agregada con exito";

		} else {
			return "Ya tenes esa carta";
		}
	}

	public List<UsuarioCardYugioh> misCartasSet(String mail, String idSet) {
		List<UsuarioCardYugioh> misCartas = usuarioCardYugiohRepository.findByMail(mail);
		List<UsuarioCardYugioh> misCartasDeUnSet = new ArrayList<>();
		for (UsuarioCardYugioh carta : misCartas) {
			if (carta.getId_set().equals(idSet)) {
				misCartasDeUnSet.add(carta);
			}
		}
		return misCartasDeUnSet;
	}

	public String eliminarCartaInventario(String mail, String idSet, String idCard) {
		Usuario usuario = usuarioService.buscarUsuario(mail);
		if (usuario != null) {
//			Vamos a buscar el objeto usuarioCard para saber su PRIMARY KEY
			Integer idCardEliminar;
			List<UsuarioCardYugioh> misCartas = misCartasSet(mail, idSet);
			for (UsuarioCardYugioh carta : misCartas) {
				if(carta.getId_set().equals(idSet) && carta.getId_card().equals(idCard)) {
					idCardEliminar = carta.getId();
					usuarioCardYugiohRepository.deleteById(idCardEliminar);
					return "Carta eliminada del inventario";


				}
			}
			return "Carta no encontrada";

		} else {
			return "Usuario no encontrado";
		}

	}
	


}
