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

    public void updateDroppable(Long dstId, Long srcId, String dstColName) {

        if (dstId == null) {
            dstId = -1l;
        }
        TodoItem srcPervItem = new TodoItem();
        TodoItem droppedItem = new TodoItem();
        TodoItem dstPervitem = new TodoItem();

        // ---------POP-------

        try {
            srcPervItem = todoRepo.findByNextId(srcId);
            srcPervItem.setNextId(todoRepo.findById(srcId).get().getNextId());
            todoRepo.save(srcPervItem);
        } catch (Exception e) {
            System.out.println(e);
        }

        // ------------PUT--------------

        droppedItem = todoRepo.findById(srcId).get();
        try {
            if (dstId == -1l) { // nie wiem co w przypadku, jak upuści się w przestrzeń na droppable area, jaka
                                // wartość będzie zwraana - do rozważenia
                droppedItem.setColumnName(dstColName);
                droppedItem.setNextId(-1l);
                todoRepo.save(droppedItem);
            } else {
                droppedItem.setColumnName(dstColName);
                droppedItem.setNextId(todoRepo.findById(dstId).get().getId());
                dstPervitem = todoRepo.findByNextIdAndColumnName(dstId, dstColName);
                dstPervitem.setNextId(srcId);
                todoRepo.save(dstPervitem);
                todoRepo.save(droppedItem);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
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
