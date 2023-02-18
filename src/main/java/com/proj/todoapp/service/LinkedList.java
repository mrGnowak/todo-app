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
        if (dstId.equals(srcId)) {
            return;
        }
        popItemFcn(srcId);
        putItemFcn(dstId, srcId, dstColName);
    }

    public void deleteItem(Long delId) {
        popItemFcn(delId);
        todoRepo.deleteById(delId);
    }

    public void popItemFcn(Long srcId) {
        // ---------POP-------

        TodoItem srcPervItem = new TodoItem();

        try {
            srcPervItem = todoRepo.findByNextId(srcId);
            if (srcPervItem == null) {
                // if there is no exist previous item, that was taken
            } else {
                srcPervItem.setNextId(todoRepo.findById(srcId).get().getNextId());
                todoRepo.save(srcPervItem);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void putItemFcn(Long dstId, Long srcId, String dstColName) {

        // ------------PUT--------------
        TodoItem srcItem = new TodoItem();
        TodoItem dstPervItem = new TodoItem();
        TodoItem dstItem = new TodoItem();
        TodoItem dstSecPervItem = new TodoItem();
        srcItem = todoRepo.findById(srcId).get();
        try {
            if (dstId.equals(-1l) && todoRepo.findByColumnName(dstColName).isEmpty()) {
                // if the drop column is empty
                srcItem.setColumnName(dstColName);
                srcItem.setNextId(-1l);
                todoRepo.save(srcItem);
            } else if (dstId.equals(-1l) && !todoRepo.findByColumnName(dstColName).isEmpty()) {
                // if the drop column isn't empty, but put item on the end
                dstPervItem = todoRepo.findByNextIdAndColumnName(-1l, dstColName);
                dstPervItem.setNextId(srcId);
                todoRepo.save(dstPervItem);
                srcItem.setColumnName(dstColName);
                srcItem.setNextId(-1l);
                todoRepo.save(srcItem);
            } else if (todoRepo.findById(srcId).get().getNextId().equals(dstId)
                    && dstColName.equals(todoRepo.findById(srcId).get().getColumnName())) {
                // if you move the item one position down
                if (todoRepo.findById(dstId).get().getNextId().equals(-1l)) { // if put item to the begin of column
                    srcItem.setNextId(-1l);
                } else {
                    srcItem.setNextId(todoRepo.findById(dstId).get().getNextId());
                }
                dstItem = todoRepo.findById(dstId).get();
                dstItem.setNextId(srcId);
                dstSecPervItem = todoRepo.findByNextIdAndColumnName(srcId, dstColName);
                if (dstSecPervItem == null) { // check if there is a secondary previous element
                } else { // if it is, set next id of this item.
                    dstSecPervItem.setNextId(dstId);
                    todoRepo.save(dstSecPervItem);
                }
                todoRepo.save(dstItem);
                todoRepo.save(srcItem);
            } else { // if it's normal column with items
                srcItem.setColumnName(dstColName);
                srcItem.setNextId(todoRepo.findById(dstId).get().getId());
                dstPervItem = todoRepo.findByNextIdAndColumnName(dstId, dstColName);
                if (dstPervItem == null) { // if put item to the begin of column
                } else {
                    dstPervItem.setNextId(srcId);
                    todoRepo.save(dstPervItem);
                }
                todoRepo.save(srcItem);
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
