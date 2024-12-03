package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.CompraPublicacion;

import java.util.List;


@Repository
public interface CompraPublicacionRepository  extends JpaRepository<CompraPublicacion, Integer>{
	
	List<CompraPublicacion> findByMail(String mail);
	
	List<CompraPublicacion> findByIdPublicacion(Integer idPublicacion);
}
