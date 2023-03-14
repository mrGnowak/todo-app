package com.proj.todoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class AppUser {

    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String userName;
    @Column
    private String password;
    @Column
    private String email;

    public AppUser() {
    }

    public AppUser(Long id, String userName, String password, String email) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }
}
