package com.proj.todoapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.todoapp.model.Users;
import com.proj.todoapp.repository.UsersRepo;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping(value = "/api/sign")
public class UserRegController {

    Logger logger = LoggerFactory.getLogger(UserRegController.class);

    @Autowired
    private UsersRepo usersRepo;

    @PostMapping(value = "/save", consumes = { "*/*" })
    public Users save(@NonNull @NotBlank @RequestBody Users users) {
        return usersRepo.save(users);
    }
}
