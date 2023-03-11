package com.proj.todoapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors()
                .disable()
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/todoapp/**").authenticated()
                .requestMatchers("/todoapp").authenticated()
                .requestMatchers("/**").permitAll()
                .requestMatchers("/api/login/**").permitAll()
                .anyRequest().permitAll()
                // .and()
                // .formLogin()
                // .loginPage("/login")
                // .loginProcessingUrl("/api/login")
                // .defaultSuccessUrl("/homepage.html", true)
                // .failureUrl("/login.html?error=true")
                // .failureHandler(authenticationFailureHandler())
                .and()
                .logout()
                .logoutUrl("/perform_logout")
                .deleteCookies("JSESSIONID");
        // .logoutSuccessHandler(logoutSuccessHandler());

        return http.build();
    }

}
