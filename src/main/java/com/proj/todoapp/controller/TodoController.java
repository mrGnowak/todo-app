package com.proj.todoapp.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.todoapp.model.TodoItem;
import com.proj.todoapp.repository.TodoRepo;

import io.micrometer.common.lang.NonNull;

@RestController
@RequestMapping(value = "/api")
public class TodoController {

    @Autowired
    private TodoRepo todoRepo;

    @GetMapping
    public List<TodoItem> findAll() {
        return todoRepo.findAll();
    }

    @PostMapping
    public TodoItem save(@Valid @NonNull @RequestBody TodoItem todoItem) {
        return todoRepo.save(todoItem);
    }

    @PutMapping
    public TodoItem update(@Valid @NonNull @RequestBody TodoItem todoItem) {
        return todoRepo.save(todoItem);
    }

}
