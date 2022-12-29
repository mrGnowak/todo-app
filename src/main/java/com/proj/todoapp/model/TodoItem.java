package com.proj.todoapp.model;

//import javax.validation.constraints.NotBlank;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class TodoItem {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private boolean isDone;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }    

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean isDone) {
        this.isDone = isDone;
    }

    public TodoItem() {
    }

    public TodoItem(Long id, String title, boolean isDone) {
        this.id = id;
        this.title = title;
        this.isDone = isDone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
