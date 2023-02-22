package dev.luke10x.example.api.domain;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class StoryService {

  @PreAuthorize("hasAuthority('SCOPE_messages')")
  public String getSecretStory() {
    return "✨ This story is very secret ✨";
  }
}
