package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ColeccionistasBackApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(ColeccionistasBackApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stu
		System.out.println("BACKEND PRENDIDO");
	}

}
