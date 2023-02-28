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

    @GetMapping(value = "/get")
    public List<TodoItem> getAll() {
        return todoRepo.findAll();
    }

    @GetMapping(value = "/get/{colName}")
    public List<TodoItem> findForCols(@PathVariable String colName) {
        return linkedList.createArray(colName);
    }

    @PostMapping(value = "/save", consumes = { "*/*" })
    public TodoItem save(@NonNull @NotBlank @RequestBody TodoItem todoItem) {
        return todoRepo.save(todoItem);
    }

    @PutMapping(value = "/put", consumes = { "*/*" })
    public TodoItem update(@NonNull @NotBlank @RequestBody TodoItem todoItem) {
        return todoRepo.save(todoItem);
    }

    @GetMapping(value = "/get/{srcId}/{dstId}/{dstColName}", consumes = { "*/*" })
    public String updateDroppable(@PathVariable Long srcId, @PathVariable Long dstId, @PathVariable String dstColName) {
        linkedList.updateDroppable(srcId, dstId, dstColName);
        return "end";
    }

    @DeleteMapping(value = "/remove/{id}")
    public void remove(@PathVariable Long id) {
        linkedList.deleteItem(id);
    }
}
