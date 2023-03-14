package com.proj.todoapp.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.proj.todoapp.model.TodoItem;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

    // @Query("SELECT i FROM todo_item i WHERE i.user_id = ?1")
    // Collection<TodoItem> findAllUserTasks(Long userId);

    List<TodoItem> findAllByUserId(Long userId);

    List<TodoItem> findByColumnNameAndUserId(String columnName, Long userId);

    TodoItem findByNextIdAndUserId(Long nextId, Long userId);

    TodoItem findByNextIdAndColumnNameAndUserId(Long nextId, String columnName, Long userId);

    TodoItem findByIdAndColumnNameAndUserId(Long id, String columnName, Long userId);

}
