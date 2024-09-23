package com.example.demo.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios_cards")
public class UsuarioCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String mail;
	private String id_set;
	private String id_card;

	public UsuarioCard() {

	}

	public UsuarioCard(String mail, String id_set, String id_card) {
		super();
		this.id = id;
		this.mail = mail;
		this.id_set = id_set;
		this.id_card = id_card;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getId_set() {
		return id_set;
	}

	public void setId_set(String id_set) {
		this.id_set = id_set;
	}

	public String getId_card() {
		return id_card;
	}

	public void setId_card(String id_card) {
		this.id_card = id_card;
	}

	@Override
	public String toString() {
		return "UsuarioCard [id=" + id + ", mail=" + mail + ", id_set=" + id_set + ", id_card=" + id_card + "]";
	}

}
