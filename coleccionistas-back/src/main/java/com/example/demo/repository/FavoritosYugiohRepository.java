package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.FavoritosYugioh;
import java.util.List;

@Repository
public interface FavoritosYugiohRepository extends JpaRepository<FavoritosYugioh, Integer> {

	List<FavoritosYugioh> findByMail(String mail);
}
