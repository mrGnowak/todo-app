package com.proj.todoapp.model;

import javax.validation.constraints.NotBlank;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class TodoItem {

    private Long id;
    @NotBlank
    private String title;
    private boolean isDone;

    public TodoItem() {
    }

    public TodoItem(Long id, String title, boolean isDone) {
        this.id = id;
        this.title = title;
        this.isDone = isDone;
    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

}
