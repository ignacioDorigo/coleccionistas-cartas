package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.Coleccion;

public interface ColeccionRepository extends JpaRepository<Coleccion, Integer> {

}
