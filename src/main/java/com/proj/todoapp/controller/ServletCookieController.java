package com.proj.todoapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.todoapp.utils.CookieUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
public class ServletCookieController {

	@GetMapping("/create-servlet-cookie")
	public String setCookie(HttpServletRequest request, HttpServletResponse response) {

		Cookie servletCookie = CookieUtil.createCookie("user-id", "c2FtLnNtaXRoQGV4YW1wbGUuY29t", 1 * 24 * 60 * 60,
				true, true, "/", request.getServerName());
		response.addCookie(servletCookie);

		return String.format("Cookie with name %s and value %s was created", servletCookie.getName(),
				servletCookie.getValue());
	}

	@GetMapping("/delete-servlet-cookie")
	public String deleteCookie(HttpServletRequest request, HttpServletResponse response) {

		Cookie deleteServletookie = CookieUtil.createCookie("user-id", null, 0, true, true, "/",
				request.getServerName());
		response.addCookie(deleteServletookie);

		return String.format("Cookie with name %s was deleted", deleteServletookie.getName());
	}

	@GetMapping("/all-servlet-cookies")
	public String readAllCookies(HttpServletRequest request) {

		return CookieUtil.readCookie(request, "user-id").orElse("cookie with name \"user-id\" is missing");

	}

}