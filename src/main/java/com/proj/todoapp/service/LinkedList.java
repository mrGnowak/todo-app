package com.proj.todoapp.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.proj.todoapp.model.TodoItem;
import com.proj.todoapp.repository.TodoRepo;

import jakarta.annotation.PostConstruct;

@Component
public class LinkedList {

    @Autowired
    TodoRepo todoRepo;

    @PostConstruct
    public void filtr() {
        Long dstId = 3l;
        Long srcId = 4l;
        String dstColName = "done";

        updateDroppable(dstId, srcId, dstColName);
    }

    public void updateDroppable(Long dstId, Long srcId, String dstColName) {

        TodoItem temp = new TodoItem();

        Long nextId = todoRepo.findById(srcId).get().getNextId(); // znajdz next Id do updateu
        System.out.println("kolumna do update: " + todoRepo.findById(srcId));
        temp = todoRepo.findByNextId(srcId); // temp- obiekt do zaktualizowania, ustaw nextID z zabieranego elementu
        System.out.println("obiekt do zaktualizowania, ustaw nextID z zabieranego elementu " + temp);

        Long temp2 = temp.getId();
        todoRepo.setNextId(nextId, temp2);
        // operacia pop wykonana.
        // ------------PUT--------------
        todoRepo.findById(dstId);
        System.out.println(todoRepo.findById(dstId));

        System.out.println(todoRepo.findById(srcId).get().getColumnName()); // zmieniam na dstColName
        todoRepo.findById(srcId).get().setColumnName(dstColName); // zmieniam na dstColName
        System.out.println(todoRepo.findById(srcId).get().getColumnName()); // zmieniam na dstColName
        todoRepo.setColumnName(dstColName, srcId);
        System.out.println(todoRepo.findById(srcId).get().getNextId()); // src ID -nextId zamiana na nowe nextId
        todoRepo.findById(srcId).get().setNextId(dstId); // src ID -nextId zamiana na nowe nextId
        todoRepo.setNextId(dstId, srcId); // src ID -nextId zamiana na nowe nextId

        System.out.println(todoRepo.findById(srcId).get().getNextId());

        System.out.println("koniec");

    }

    public List<TodoItem> createArray(String colName) {

        List<TodoItem> todoItems = new ArrayList<TodoItem>();
        List<TodoItem> newTodoItems = new ArrayList<TodoItem>();

        todoItems = todoRepo.findByColumnName(colName);

        Map<Long, Long> dictionary = new HashMap<>();
        for (TodoItem todoItem : todoItems) {
            try {
                dictionary.put(todoItem.getNextId(), todoItem.getId());
            } catch (Exception e) {
                System.out.println(e + " | Wrong ID and nextID id db");
            }
        }
        try {
            Long temp = dictionary.get(null);
            for (int i = 0; i < todoItems.size(); i++) {
                newTodoItems.add(i, todoRepo.findById(temp).get());
                temp = dictionary.get(temp);
            }
        } catch (Exception e) {
            System.out.println(e + " | Tail of LinikedList doesn't exist");
        }
        Collections.reverse(newTodoItems);
        return newTodoItems;
    }

}
