package com.example.demo.modelo;

import java.util.Arrays;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "avatares")
public class Avatar {

	@Id
	private String mail;

	@Lob
	private byte[] foto;

	public Avatar() {

	}

	public Avatar(String mail, byte[] foto) {
		super();
		this.mail = mail;
		this.foto = foto;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public byte[] getFoto() {
		return foto;
	}

	public void setFoto(byte[] foto) {
		this.foto = foto;
	}

	@Override
	public String toString() {
		return "Avatar [mail=" + mail + ", foto=" + Arrays.toString(foto) + "]";
	}

}
