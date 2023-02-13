package com.proj.todoapp.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.todoapp.model.TodoItem;

import jakarta.validation.constraints.NotBlank;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

    List<TodoItem> findByColumnName(String columnName);

    Object findByNextId(Long nextId);

    // public List<TodoItem> findByColumnName(String columnName);

    // public List<TodoItem> findById(int id);

    // @Query("delete from TodoItem item where item.title=:title")
    // void deleteByTitle(@Param("title") String title);
    // long removeByTitle(String title);
}
