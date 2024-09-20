package com.example.demo.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios_colecciones")
public class UsuariosColecciones {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String id_usuario;
	private Integer id_coleccion;

	public UsuariosColecciones() {

	}

	public UsuariosColecciones(String id_usuario, Integer id_coleccion) {
		super();
		this.id = id;
		this.id_usuario = id_usuario;
		this.id_coleccion = id_coleccion;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(String id_usuario) {
		this.id_usuario = id_usuario;
	}

	public Integer getId_coleccion() {
		return id_coleccion;
	}

	public void setId_coleccion(Integer id_coleccion) {
		this.id_coleccion = id_coleccion;
	}

	@Override
	public String toString() {
		return "UsuariosColecciones [id=" + id + ", id_usuario=" + id_usuario + ", id_coleccion=" + id_coleccion + "]";
	}

}
