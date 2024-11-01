package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.FotoPublicacion;
import java.util.List;


@Repository
public interface FotoPublicacionRepository extends JpaRepository<FotoPublicacion, Integer> {
	
	List<FotoPublicacion> findByPublicacion(Integer publicacion);

}
