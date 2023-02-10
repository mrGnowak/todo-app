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
    private boolean isDone;
    @Column
    private String columnName;
    @Column
    private Integer posInCol;
    @Column
    private Long prevId;

    public TodoItem() {
    }

    public TodoItem(Long id, String title, boolean isDone, String columnName, Integer posInCol, Long prevId) {

        this.id = id;
        this.title = title;
        this.isDone = isDone;
        this.columnName = columnName;
        this.posInCol = posInCol;
        this.prevId = prevId;
    }
}
