package com.proj.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.todoapp.model.Users;

public interface UsersRepo extends JpaRepository<Users, Long> {

}
