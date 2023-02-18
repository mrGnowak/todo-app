package com.proj.todoapp;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.proj.todoapp.repository.TodoRepo;
import com.proj.todoapp.service.LinkedList;
import com.proj.todoapp.model.TodoItem;

// import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@ComponentScan(basePackages = "com.proj.todoapp")
class ToDoAppApplicationTests {

	@Autowired
	private LinkedList linkedList;

	@Autowired
	private TodoRepo todoRepo;

	@Test
	void contextLoads() {
		assertEquals(2, 1 + 1);
	}

	@Test
	@DirtiesContext
	void testRepoAdd() {
		var item1 = new TodoItem(1L, "A1", "A", 2L);
		var item2 = new TodoItem(2L, "A2", "A", -1l);

		todoRepo.save(item1);
		todoRepo.save(item2);
		todoRepo.flush();

		assertEquals(todoRepo.findById(1L).get().getTitle(), "A1");
	}

	@Test
	@DirtiesContext
	void testLinkedList_oneColumn() {
		todoRepo.save(new TodoItem(1L, "A1", "A", 2L));
		todoRepo.save(new TodoItem(2L, "A2", "A", 3L));
		todoRepo.save(new TodoItem(3L, "A3", "A", 4L));
		todoRepo.save(new TodoItem(4L, "A4", "A", 4l));
		todoRepo.save(new TodoItem(5L, "A5", "A", -1l));
		// todoRepo.flush();

		// initial condition
		// 1 -> 2 -> 3 -> 4 -> 5
		// linkedList.updateDroppable(2L, 4L, "A");
		// todoRepo.flush();

		// expected order
		// 1 -> 4 -> 2 -> 3 -> 5

		// TODO this line produces assertion error
		assertNextId(1L, 2L);
		assertNextId(2L, 3L);
		assertNextId(3L, 4L);
		assertNextId(4L, 5L);
		assertNextId(5L, -1l);
	}

	void assertNextId(long itemId, Long nextId) {
		assertEquals(nextId, todoRepo.findById(itemId).get().getNextId());
	}

}
