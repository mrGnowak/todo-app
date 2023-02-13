package com.proj.todoapp.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.jni.Sockaddr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.proj.todoapp.model.TodoItem;
import com.proj.todoapp.repository.TodoRepo;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.Temporal;

@Component
public class LinkedList {

    @Autowired
    TodoRepo todoRepo;

    List<TodoItem> todoItems = new ArrayList<TodoItem>();
    List<TodoItem> newTodoItems = new ArrayList<TodoItem>();
    Object tempObject = new Object();

    @PostConstruct
    public void filtr() {
        String colName = "to-do";
        createArray(colName);
    }

    public List<TodoItem> createArray(String colName) {

        todoItems = todoRepo.findByColumnName(colName);
        System.out.println("Dane z obrębie kolumny do filtrowania: \n " + todoItems);
        Map<Long, Long> dictionary = new HashMap<>();
        for (TodoItem todoItem : todoItems) {
            dictionary.put(todoItem.getNextId(), todoItem.getId());
            // jeśli pojawią się takie same klucze w next ID - błąd
            // jeśli nie pojawi się null -> błąd
        }
        Long temp = dictionary.get(null);
        for (int i = 0; i < todoItems.size(); i++) {
            newTodoItems.add(i, todoRepo.findById(temp).get());
            temp = dictionary.get(temp);
        }
        Collections.reverse(newTodoItems);
        System.out.println("Wynik filtrowania: \n " + newTodoItems);

        System.out.println("koniec");
        return newTodoItems;

    }
}
