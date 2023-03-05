package com.proj.todoapp.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class SpringCookieController {

	@GetMapping("/create-spring-cookie")
	public ResponseEntity<?> setCookie() {

		ResponseCookie resCookie = ResponseCookie.from("user-id",
				"cad2e5e2e5d04f30979d28fc10faf8d0")
				.httpOnly(false)
				.secure(false)
				.path("/")
				.maxAge(300)
				.domain("localhost")
				.build();

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
				resCookie.toString()).build();

	}

	@GetMapping("/delete-spring-cookie")
	public ResponseEntity<?> deleteCookie() {

		// create a cookie
		ResponseCookie resCookie = ResponseCookie.from("user-id", null)
				.build();

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
				resCookie.toString()).build();

	}

	@GetMapping("/read-spring-cookie")
	public String readCookie(@CookieValue(name = "user-id", defaultValue = "default-user-id") String cookieName) {
		return String.format("value of the cookie with name user-id is: %s",
				cookieName);
	}

}