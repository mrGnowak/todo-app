package com.proj.todoapp.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.proj.todoapp.repository.UsersRepo;

public class SecurityUserService implements UserDetailsService {

    @Autowired
    private UsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = usersRepo.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not present");
        }
        return new SecurityUser() {
            {
                setId(user.getId());
                setAuthorities(List.of(() -> "read"));
                setPassword(user.getPassword());
                setUsername(user.getUserName());
                setAccountNonExpired(true);
                setAccountNonLocked(true);
                setCredentialsNonExpired(true);
                setEnabled(true);
            }
        };

    }

}