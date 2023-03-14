package com.proj.todoapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.server.ResponseStatusException;

import com.proj.todoapp.dto.UserDto;
import com.proj.todoapp.model.LoginUser;
import com.proj.todoapp.security.SecurityUser;
import com.proj.todoapp.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "/api")
public class LoginController {

    @Autowired
    private AuthenticationManager authManager;

    private HttpSession getSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        var session = attr.getRequest().getSession(true); // true == allow create
        return session;
    }

    @PostMapping(value = "/login", consumes = { "*/*" })
    public Long login(@RequestBody LoginUser loginUser) {
        try {
            var credentials = new UsernamePasswordAuthenticationToken(loginUser.getUserName(), loginUser.getPassword());
            var authenticate = authManager.authenticate(credentials);
            var principial = (SecurityUser) authenticate.getPrincipal();

            var securityContext = SecurityContextHolder.getContext();

            securityContext.setAuthentication(authenticate);
            getSession().setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
            return principial.getId();
        } catch (Exception ex) {
            return null;
        }
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
                setUserName(securityUser.getUsername());
            }
        };
    }
}
