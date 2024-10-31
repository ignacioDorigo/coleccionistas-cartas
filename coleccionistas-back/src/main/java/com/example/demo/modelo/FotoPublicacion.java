package com.example.demo.modelo;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "fotos_publicaciones")
public class FotoPublicacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Lob
	private byte[] imagen; // Puedes usar byte[] para almacenar el BLOB de la imagen

	@Column(name = "idpublicacion")
	private Integer publicacion;

	public FotoPublicacion() {

	}

	public FotoPublicacion(byte[] imagen, Integer publicacion) {
		super();
		this.id = id;
		this.imagen = imagen;
		this.publicacion = publicacion;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public byte[] getImagen() {
		return imagen;
	}

	public void setImagen(byte[] imagen) {
		this.imagen = imagen;
	}

	public Integer getPublicacion() {
		return publicacion;
	}

	public void setPublicacion(Integer publicacion) {
		this.publicacion = publicacion;
	}

	@Override
	public String toString() {
		return "FotoPublicacion [id=" + id + ", imagen=" + Arrays.toString(imagen) + ", publicacion=" + publicacion
				+ "]";
	}

}
