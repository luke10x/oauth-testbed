package dev.luke10x.example.api.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoryController {
	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}
}
