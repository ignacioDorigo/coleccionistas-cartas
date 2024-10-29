package com.example.demo.modelo;

public class PerfilUsuario {

	private String mail;
	private Integer edad;
	private String nombre;
	private String apellido;

	public PerfilUsuario() {
		super();
	}

	public PerfilUsuario(String mail, Integer edad, String nombre, String apellido) {
		super();
		this.mail = mail;
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
		return "PerfilUsuario [mail=" + mail + ", edad=" + edad + ", nombre=" + nombre + ", apellido=" + apellido + "]";
	}

}
