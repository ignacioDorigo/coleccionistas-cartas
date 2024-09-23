package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.UsuarioCard;
import java.util.List;


@Repository
public interface UsuarioCardRepository extends JpaRepository<UsuarioCard, Integer> {

	List<UsuarioCard> findByMail(String mail);
	
}
