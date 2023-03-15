package com.proj.todoapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.todoapp.model.TodoItem;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

    List<TodoItem> findAllByUserId(Long userId);

    List<TodoItem> findByColumnNameAndUserId(String columnName, Long userId);

    TodoItem findByNextIdAndUserId(Long nextId, Long userId);

    TodoItem findByNextIdAndColumnNameAndUserId(Long nextId, String columnName, Long userId);

    TodoItem findByIdAndColumnNameAndUserId(Long id, String columnName, Long userId);

}
