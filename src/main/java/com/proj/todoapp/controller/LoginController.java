package com.proj.todoapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.proj.todoapp.model.LoginUser;
import com.proj.todoapp.service.UserService;

@RestController
@RequestMapping(value = "/api")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/login", consumes = { "*/*" })
    public Long login(@RequestBody LoginUser loginUser) {

        try {
            var userId = userService.returnLoggedUserId(loginUser.getEmail(), loginUser.getPassword());
            System.out.println(userId);
            return userId;
            // zwraca id zalogowanego uzytkownika
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
    }
}
