package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.UsuariosColecciones;
import java.util.List;

@Repository
public interface UsuariosColeccionRepository extends JpaRepository<UsuariosColecciones, Integer> {
	


}
