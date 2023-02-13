package com.proj.todoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class TodoItem {

    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String title;
    @Column
    private String columnName;
    @Column
    private Long nextId;

    public TodoItem() {
    }

    public TodoItem(Long id, String title, String columnName, Long nextId) {

        this.id = id;
        this.title = title;
        this.columnName = columnName;
        this.nextId = nextId;
    }
}
