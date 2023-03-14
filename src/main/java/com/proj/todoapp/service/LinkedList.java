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
    private TodoRepo todoRepo;

    public boolean updateDroppable(Long srcId, Long dstId, String dstColName, Long userId) {
        if (dstId.equals(srcId)) {
            return false;
        }
        popItemFcn(srcId, userId);
        putItemBefore(srcId, dstId, dstColName, userId);
        return true;
    }

    public void deleteItem(Long delId, Long userId) {
        popItemFcn(delId, userId);
        todoRepo.deleteById(delId);
    }

    public void popItemFcn(Long srcId, Long userId) {
        // ---------POP-------

        var srcPrevItem = todoRepo.findByNextIdAndUserId(srcId, userId);
        if (srcPrevItem == null) {
            // if there is no exist previous item, that was taken
        } else {
            srcPrevItem.setNextId(todoRepo.findById(srcId).get().getNextId());
        }
        todoRepo.flush();
    }

    public void putItemBefore(Long srcId, Long dstId, String dstColName, Long userId) {
        // -----------PUT----------

        try {
            var srcItem = todoRepo.findById(srcId).get();
            if (srcItem == null) {
                return;
            }
            var prevDstItem = todoRepo.findByNextIdAndColumnNameAndUserId(dstId, dstColName, userId);
            if (prevDstItem != null) {
                prevDstItem.setNextId(srcId);
            }
            srcItem.setNextId(dstId);
            srcItem.setColumnName(dstColName);
            todoRepo.flush();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public List<TodoItem> createArray(String colName, Long userId) {

        List<TodoItem> todoItems = new ArrayList<TodoItem>();
        List<TodoItem> newTodoItems = new ArrayList<TodoItem>();

        todoItems = todoRepo.findByColumnNameAndUserId(colName, userId);

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
