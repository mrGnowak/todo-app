package com.proj.todoapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.todoapp.model.TodoItem;
import com.proj.todoapp.model.Users;
import com.proj.todoapp.repository.TodoRepo;

import com.proj.todoapp.service.LinkedList;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;

//@RestController
//@RequestMapping(value = "/api/sign")
public class UserRegController {

    // Logger logger = LoggerFactory.getLogger(UserRegController.class);
    //
    // @Autowired
    // private UserRepo userRepo;
    //
    // @PostMapping(value = "/save", consumes = { "*/*" })
    // public User save(@RequestBody User user) {
    // return userRepo.save(user);
    // }
}
