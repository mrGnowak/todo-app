package com.proj.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.todoapp.model.TodoItem;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

}
