package com.proj.todoapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.todoapp.model.Users;
import com.proj.todoapp.service.UserService;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping(value = "/api/register")
public class UserRegController {

    Logger logger = LoggerFactory.getLogger(UserRegController.class);

    @Autowired
    UserService userService;

    @PostMapping(value = "/save", consumes = { "*/*" })
    public Users register(@NonNull @NotBlank @RequestBody Users users) {
        return userService.saveNewUser(users);
    }
}
