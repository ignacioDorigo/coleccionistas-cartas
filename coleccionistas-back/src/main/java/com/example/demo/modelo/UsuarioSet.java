package com.example.demo.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios_sets")
public class UsuarioSet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String mail;
	private String id_set;

	public UsuarioSet() {

	}

	public UsuarioSet(String mail, String id_set) {
		super();
		this.mail = mail;
		this.id_set = id_set;
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

	@Override
	public String toString() {
		return "UsuarioSet [id=" + id + ", mail=" + mail + ", id_set=" + id_set + "]";
	}

}
