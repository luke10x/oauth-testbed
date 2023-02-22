package dev.luke10x.example.api;

import javax.servlet.http.Cookie;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.util.WebUtils;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Bean
  public CorsFilter corsFilter() {
      final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      final CorsConfiguration config = new CorsConfiguration();
      config.addAllowedOrigin("*");
      config.addAllowedHeader("*");
      config.addAllowedMethod("*");
      source.registerCorsConfiguration("/**", config);
      return new CorsFilter(source);
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http
          .authorizeHttpRequests(authorize -> authorize
              .anyRequest().authenticated()
          )
          .oauth2ResourceServer(oauth2 -> oauth2
              .jwt(jwt -> jwt
                  .jwkSetUri("http://0.0.0.0:28080/realms/bigrealm/protocol/openid-connect/certs")
                  .jwkSetUri("http://keycloak:8080/realms/bigrealm/protocol/openid-connect/certs")
              )
              .bearerTokenResolver(this::tokenExtractor)
          )
          .cors().and().csrf().disable(); // disable Cors

          
      return http.build();
  }

  public String tokenExtractor(HttpServletRequest request) {
    String header = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (header != null)
      return header.replace("Bearer ", "");
    Cookie cookie = WebUtils.getCookie(request, "auth.access_token");
    if (cookie != null)
      return cookie.getValue();
    return null;
  }
}
