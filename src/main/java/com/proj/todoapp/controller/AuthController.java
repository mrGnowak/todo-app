package com.proj.todoapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.proj.todoapp.dto.LoginUserDto;
import com.proj.todoapp.dto.UserDto;
import com.proj.todoapp.model.Users;
import com.proj.todoapp.security.SecurityUser;
import com.proj.todoapp.service.UserService;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    UserService userService;

    @Autowired
    private AuthenticationManager authManager;

    private HttpSession getSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        var session = attr.getRequest().getSession(true); // true == allow create
        return session;
    }

    @PostMapping(value = "/register", consumes = { "*/*" })
    public String register(@NonNull @NotBlank @RequestBody Users users) {
        return userService.saveNewUser(users);
    }

    @PostMapping(value = "/login", consumes = { "*/*" })
    public Long login(@RequestBody LoginUserDto loginUser) {
        try {
            var credentials = new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword());
            var authenticate = authManager.authenticate(credentials);
            var principial = (SecurityUser) authenticate.getPrincipal();

            var securityContext = SecurityContextHolder.getContext();

            securityContext.setAuthentication(authenticate);
            getSession().setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    securityContext);
            return principial.getId();
        } catch (Exception ex) {
            return null;
        }
    }

    @PostMapping(value = "/logout")
    public void logout() {
        getSession().removeAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);

    }

    @GetMapping("/getUser")
    public UserDto getUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var principial = authentication.getPrincipal();
        if (!(principial instanceof SecurityUser)) {
            return null;
        }
        var securityUser = (SecurityUser) principial;
        return new UserDto() {
            {
                setId(securityUser.getId());
                setEmail(securityUser.getUsername());
            }
        };
    }
}
