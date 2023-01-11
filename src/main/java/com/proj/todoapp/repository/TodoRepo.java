package com.proj.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.proj.todoapp.model.TodoItem;

import jakarta.transaction.Transactional;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

    // @Query("delete from TodoItem item where item.title=:title")
    // void deleteByTitle(@Param("title") String title);
    // long removeByTitle(String title);
}
