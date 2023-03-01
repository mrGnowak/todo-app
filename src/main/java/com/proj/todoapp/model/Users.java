package com.proj.todoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Users {

    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String userName;
    @Column
    private String password;
    @Column
    private String email;

    public Users() {
    }

    public Users(Long id, String userName, String password, String email) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }
}
