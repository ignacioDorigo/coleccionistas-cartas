package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.modelo.UsuarioCardYugioh;

@Repository
public interface UsuarioCardYugiohRepository extends JpaRepository<UsuarioCardYugioh, Integer>{
	
	List<UsuarioCardYugioh> findByMail(String mail);

}
