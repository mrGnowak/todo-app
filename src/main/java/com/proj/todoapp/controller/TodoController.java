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
import com.proj.todoapp.service.LinkedList;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping(value = "/api/todoapp")
public class TodoController {

    Logger logger = LoggerFactory.getLogger(TodoController.class);

    @Autowired
    LinkedList linkedList;

    @Autowired
    private TodoRepo todoRepo;

    @GetMapping(value = "/get/{userId}")
    public List<TodoItem> getAllForUser(@PathVariable Long userId) {
        return todoRepo.findAllByUserId(userId);
    }

    @GetMapping(value = "/get/{colName}/{userId}")
    public List<TodoItem> findForCols(@PathVariable String colName, @PathVariable Long userId) {
        return linkedList.createArray(colName, userId);
    }

    @PostMapping(value = "/save", consumes = { "*/*" })
    public TodoItem save(@NonNull @NotBlank @RequestBody TodoItem todoItem) {
        return todoRepo.save(todoItem);
    }

    @PutMapping(value = "/put", consumes = { "*/*" })
    public TodoItem update(@NonNull @NotBlank @RequestBody TodoItem todoItem) {
        return todoRepo.save(todoItem);
    }

    @GetMapping(value = "/get/{srcId}/{dstId}/{dstColName}/{userId}", consumes = { "*/*" })
    public void updateDroppable(@PathVariable Long srcId, @PathVariable Long dstId, @PathVariable String dstColName,
            @PathVariable Long userId) {
        linkedList.updateDroppable(srcId, dstId, dstColName, userId);
    }

    @DeleteMapping(value = "/remove/{id}/{userId}")
    public void remove(@PathVariable Long id, @PathVariable Long userId) {
        linkedList.deleteItem(id, userId);
    }
}
