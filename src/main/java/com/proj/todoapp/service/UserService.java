package com.proj.todoapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.proj.todoapp.model.AppUser;
import com.proj.todoapp.repository.UsersRepo;

import jakarta.servlet.http.HttpSession;

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

    public void startSession(Long userId) {
        var session = getSession();
        session.setAttribute("USER_ID", userId);
    }

    public AppUser getSessionUser() {
        var session = getSession();
        var userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return null;
        }
        return getUserById((Long) userId);

    }

    public HttpSession getSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        var session = attr.getRequest().getSession(true); // true == allow create
        return session;
    }

}
