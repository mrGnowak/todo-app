package com.proj.todoapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.proj.todoapp.config.PasswordEncoderConfig;
import com.proj.todoapp.model.Users;
import com.proj.todoapp.repository.UsersRepo;

@Component
public class UserService {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    PasswordEncoderConfig passwordEncoder;

    public Users saveNewUser(Users users) {
        String hashPass = passwordEncoder.encoder().encode(users.getPassword());
        users.setPassword(hashPass);
        return usersRepo.save(users);
    }

}
