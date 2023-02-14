package com.proj.todoapp.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.proj.todoapp.model.TodoItem;

import jakarta.annotation.Nullable;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

    List<TodoItem> findByColumnName(String columnName);

    TodoItem findByNextId(Long nextId);

    @Nullable
    TodoItem findByNextIdAndColumnName(Long nextId, String columnName);

    TodoItem findByIdAndColumnName(Long id, String columnName);

}
