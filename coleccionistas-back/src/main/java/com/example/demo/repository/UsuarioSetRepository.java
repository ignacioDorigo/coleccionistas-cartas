package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.UsuarioSet;
import java.util.List;

@Repository
public interface UsuarioSetRepository extends JpaRepository<UsuarioSet, Integer> {

	List<UsuarioSet> findByMail(String mail);

}
