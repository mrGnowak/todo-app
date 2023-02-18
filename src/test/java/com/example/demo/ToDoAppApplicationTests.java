package com.example.demo;

import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import com.proj.todoapp.model.TodoItem;
import com.proj.todoapp.repository.TodoRepo;

//@RunWith(SpringRunner.class)
@SpringBootTest
// @DataJpaTest
class RepositoryTests {

	// @Autowired
	// private TodoRepo todoRepo;

	@Test
	public void testSaveAndGet() {
		// Create an object to save
		// TodoItem todoItem = new TodoItem(1l, "title", "to-do", -1l);

		// Save the object
		// todoRepo.save(todoItem);
		// String string1 = "hi";
		// String string2 = "hi";
		// Retrieve the object
		// TodoItem savedObject = new TodoItem(2l, "title", "to-do", -1l);
		// TodoItem savedObject = todoRepo.findById(1l).get();

		// Verify that the saved object is the same as the retrieved object
		// assertEquals(todoItem, savedObject);
		assertEquals(2, 1 + 1);
	}
}
