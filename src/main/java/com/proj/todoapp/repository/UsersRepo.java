package com.proj.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.todoapp.model.AppUser;

public interface UsersRepo extends JpaRepository<AppUser, Long> {

    AppUser findByEmail(String email);

    AppUser findByUserName(String userName);
}
