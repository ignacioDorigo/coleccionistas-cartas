package com.example.demo.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "compra_publicacion")

public class CompraPublicacion {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 50)
	private String mail;
	
	@Column(nullable = false)
	private Integer idPublicacion;
	
	public CompraPublicacion() {
		
	}
	
	public CompraPublicacion(String mail, Integer idPublicacion) {
		super();
		this.mail = mail;
		this.idPublicacion = idPublicacion;
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

	public Integer getIdPublicacion() {
		return idPublicacion;
	}

	public void setIdPublicacion(Integer idPublicacion) {
		this.idPublicacion = idPublicacion;
	}
	
	@Override
	public String toString() {
		return "Publicacion [id=" + id + ", mail=" + mail + ", idPublicacion=" + idPublicacion +"]";
	}

}
