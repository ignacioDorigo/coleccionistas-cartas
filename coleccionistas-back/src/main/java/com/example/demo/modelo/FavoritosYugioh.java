package com.example.demo.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "favoritos_yugioh")
public class FavoritosYugioh {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String mail;
	private String id_card;

	public FavoritosYugioh() {

	}

	public FavoritosYugioh(String mail, String id_card) {
		super();
		this.id = id;
		this.mail = mail;
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

	public String getId_card() {
		return id_card;
	}

	public void setId_card(String id_card) {
		this.id_card = id_card;
	}

	@Override
	public String toString() {
		return "FavoritosYugioh [id=" + id + ", mail=" + mail + ", id_card=" + id_card + "]";
	}

}
