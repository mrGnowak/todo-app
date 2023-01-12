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
import com.proj.todoapp.repository.TodoRepo;

import io.micrometer.common.lang.NonNull;

@RestController
@RequestMapping(value = "/api")
public class TodoController {

    Logger logger = LoggerFactory.getLogger(TodoController.class);

    @Autowired
    private TodoRepo todoRepo;

    @GetMapping(value = "/get")
    public List<TodoItem> findAll() {
        return todoRepo.findAll();
    }

    @PostMapping(value = "/save", consumes = { "*/*" })
    public TodoItem save(@NonNull @RequestBody TodoItem todoItem) {
        return todoRepo.save(todoItem);
    }

    @PutMapping(value = "/put")
    public TodoItem update(@NonNull @RequestBody TodoItem todoItem) {
        return todoRepo.save(todoItem);
    }

    @DeleteMapping(value = "/remove/{id}")
    public Integer remove(@PathVariable Long id) {
        todoRepo.deleteById(id);
        return null;
    }

    // @DeleteMapping(value = "/remove/{title}")
    // public void remove(@PathVariable String title) {
    // todoRepo.removeByTitle(title);
    // }
    // @DeleteMapping(value = "/remove/{title}")
    // public void remove(@PathVariable String title) {
    // todoRepo.deleteByTitle(title);
    // }

}//
