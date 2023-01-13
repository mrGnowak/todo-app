package com.proj.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.todoapp.model.TodoItem;

public interface TodoRepo extends JpaRepository<TodoItem, Long> {

    // @Query("delete from TodoItem item where item.title=:title")
    // void deleteByTitle(@Param("title") String title);
    // long removeByTitle(String title);
}
