package com.proj.todoapp.security;

import lombok.Data;

@Data
public class UserDto {
    Long id;
    String userName;
    String email;
}
