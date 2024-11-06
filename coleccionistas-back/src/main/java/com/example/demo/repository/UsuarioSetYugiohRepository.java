package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.UsuarioSet;
import com.example.demo.modelo.UsuarioSetYugioh;

public interface UsuarioSetYugiohRepository extends JpaRepository<UsuarioSetYugioh, Integer> {
	List<UsuarioSetYugioh> findByMail(String mail);

}
