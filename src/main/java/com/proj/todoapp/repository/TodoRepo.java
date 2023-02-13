package com.proj.todoapp.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.proj.todoapp.model.TodoItem;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

    List<TodoItem> findByColumnName(String columnName);

    TodoItem findByNextId(Long nextId);

    TodoItem findByIdAndColumnName(Long id, String columnName);

    @Modifying
    @Query("update TodoItem t set t.nextId = ?1 where t.id = ?2")
    void setNextId(Long nextId, Long id);

    @Modifying
    @Query("update TodoItem t set t.columnName = ?1 where t.id = ?2")
    void setColumnName(String columnName, Long id);

}
