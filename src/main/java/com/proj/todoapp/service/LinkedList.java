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

@Component
public class LinkedList {

    @Autowired
    TodoRepo todoRepo;

    public Boolean updateDroppable(Long srcId, Long dstId, String dstColName) {
        if (dstId.equals(srcId)) {
            return false;
        }
        var item = pop(srcId);
        if (item != null) {
            putBefore(item, dstId, dstColName);
        }

        return true;
    }

    public TodoItem pop(Long itemId) {
        /*
         * Three cases:
         * Case 1) ITEM -> NEXT -> ...
         * Case 2) PREV -> ITEM -> NEXT => ...
         * Case 3) .... -> PREV -> ITEM | ...
         */

        try {
            var item = todoRepo.findById(itemId).get();
            if (item == null) {
                return null;
            }
            var prev = todoRepo.findByNextId(itemId);
            if (prev == null) {
                // Case 1
            } else {
                // Case 2 & 3
                prev.setNextId(item.getNextId());
            }
            todoRepo.flush();
            return item;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public void putBefore(TodoItem srcItem, Long dstId, String dstColName) {
        try {
            var prev = todoRepo.findByNextIdAndColumnName(dstId, dstColName);
            if (prev != null) {
                prev.setNextId(srcItem.getId());
            }
            srcItem.setNextId(dstId);
            srcItem.setColumnName(dstColName);
            todoRepo.flush();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void deleteitem(Long delId) {
        pop(delId);
        todoRepo.deleteById(delId);
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
            Long temp = dictionary.get(-1l);
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
