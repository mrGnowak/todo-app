package com.proj.todoapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.todoapp.model.TodoItem;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

    List<TodoItem> findByColumnName(String columnName);

    TodoItem findByNextId(Long nextId);

    TodoItem findByNextIdAndColumnName(Long nextId, String columnName);

    TodoItem findByIdAndColumnName(Long id, String columnName);

}
