package com.proj.todoapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.proj.todoapp.model.AppUser;
import com.proj.todoapp.repository.UsersRepo;

@Component
public class UserService {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private PasswordEncoder globalPasswordEncoder;

    public String saveNewUser(AppUser user) {
        if (checkUserExistUserName(user)) {
            if (checkUserExistEmail(user)) {
                String hashPass = globalPasswordEncoder.encode(user.getPassword());
                user.setPassword(hashPass);
                usersRepo.save(user);
                System.out.println("Created!");
                return "Created!";
            } else {
                System.out.println("This email is already in use!");
                return "This email is already in use!";
            }
        } else {
            System.out.println("UserName is occupied");
            return "UserName is occupied!";
        }
    }

    public Boolean checkUserExistEmail(AppUser user) {
        if (usersRepo.findByEmail(user.getEmail()) == null) {
            return true;
        }
        return false;
    }

    public Boolean checkUserExistUserName(AppUser user) {
        if (usersRepo.findByUserName(user.getUserName()) == null) {
            return true;
        }
        return false;
    }

    public boolean checkPasswordMatches(String password, String hashPassword) {
        boolean isPasswordMatches = globalPasswordEncoder.matches(password, hashPassword);
        return isPasswordMatches;
    }

    public Long returnLoggedUserId(String email, String password) {
        var user = usersRepo.findByEmail(email);
        if (user == null) {
            return null;
        } else {
            var checkPass = checkPasswordMatches(password, user.getPassword());
            if (checkPass) {
                return user.getId();
            }
        }
        return null;

    }

    public AppUser getUserById(Long userId) {
        var user = usersRepo.findById(userId);
        return user.isPresent() ? user.get() : null;
    }

    public void updateUser(AppUser appUser) {
        var id = appUser.getId();
        var newUser = usersRepo.findById(id).get();
        newUser.setPassword(globalPasswordEncoder.encode(appUser.getPassword()));
        usersRepo.save(newUser);

    }

}
