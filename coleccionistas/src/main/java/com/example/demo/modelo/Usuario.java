package com.example.demo.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario {

	@Id
	private String mail;
	private String password;
	private Integer edad;
	private String nombre;
	private String apellido;

	public Usuario() {

	}

	public Usuario(String mail, String password, Integer edad, String nombre, String apellido) {
		super();
		this.mail = mail;
		this.password = password;
		this.edad = edad;
		this.nombre = nombre;
		this.apellido = apellido;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getEdad() {
		return edad;
	}

	public void setEdad(Integer edad) {
		this.edad = edad;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	@Override
	public String toString() {
		return "Usuario [mail=" + mail + ", password=" + password + ", edad=" + edad + ", nombre=" + nombre
				+ ", apellido=" + apellido + "]";
	}

}
