package dev.luke10x.example.api.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.luke10x.example.api.domain.StoryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StoryController {

	private final StoryService storyService;

	@GetMapping("/")
	public String index() {
		System.out.println("index hit");

		return "Greetings from Spring Boot!";
	}

	
	
	@GetMapping("/public")
	public String publicAction() {
		System.out.println("latest!");
		return "ctrl-alt-delete(dy) the latest and the greatest !!! \n\n!";
	}

	@GetMapping("/secret")
	public String secret() {
			System.out.println("secret hit");
			return storyService.getSecretStory();
	}
}
