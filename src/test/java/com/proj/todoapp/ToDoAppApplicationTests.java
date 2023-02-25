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
	void testDeleteItem() {
		todoRepo.save(new TodoItem(1L, "A1", "A", 2L));
		todoRepo.save(new TodoItem(2L, "A2", "A", 3L));
		todoRepo.save(new TodoItem(3L, "A3", "A", 4L));
		todoRepo.save(new TodoItem(4L, "A4", "A", 5L));
		todoRepo.save(new TodoItem(5L, "A5", "A", -1L));
		todoRepo.flush();

		// initial condition
		// 1 -> 2 -> 3 -> 4 -> 5
		linkedList.deleteItem(3L);
		todoRepo.flush();

		// expected order
		// 1 -> 2 -> 4 -> 5

		assertNextId(1L, 2L);
		assertNextId(2L, 4L);
		assertNextId(4L, 5L);
		assertNextId(5L, -1l);

		// delete last item
		linkedList.deleteItem(5L);
		todoRepo.flush();
		// expected order
		// 1 -> 2 -> 4
		assertNextId(1L, 2L);
		assertNextId(2L, 4L);
		assertNextId(4L, -1L);

		// delete first item
		linkedList.deleteItem(1L);
		todoRepo.flush();
		// expected order
		// 2 -> 4
		assertNextId(2L, 4L);
		assertNextId(4L, -1L);
	}

	@Test
	@DirtiesContext
	void testLinkedList_oneColumn_srcIdIndex_smaller_dstIdIndex() {
		todoRepo.save(new TodoItem(1L, "A1", "A", 2L));
		todoRepo.save(new TodoItem(2L, "A2", "A", 3L));
		todoRepo.save(new TodoItem(3L, "A3", "A", 4L));
		todoRepo.save(new TodoItem(4L, "A4", "A", 5L));
		todoRepo.save(new TodoItem(5L, "A5", "A", -1L));
		todoRepo.flush();

		// initial condition
		// 1 -> 2 -> 3 -> 4 -> 5
		linkedList.updateDroppable(4L, 2L, "A");
		todoRepo.flush();
		System.out.println(todoRepo.findAll());

		// expected order
		// 1 -> 3 -> 4 -> 2 -> 5

		assertNextId(1L, 3L);
		assertNextId(2L, 5L);
		assertNextId(3L, 4L);
		assertNextId(4L, 2L);
		assertNextId(5L, -1l);
	}

	@Test
	@DirtiesContext
	void testLinkedList_oneColumn_srcIdIndex_greater_dstIdIndex() {
		todoRepo.save(new TodoItem(1L, "A1", "A", 2L));
		todoRepo.save(new TodoItem(2L, "A2", "A", 3L));
		todoRepo.save(new TodoItem(3L, "A3", "A", 4L));
		todoRepo.save(new TodoItem(4L, "A4", "A", 5L));
		todoRepo.save(new TodoItem(5L, "A5", "A", -1L));
		todoRepo.flush();

		// initial condition
		// 1 -> 2 -> 3 -> 4 -> 5
		linkedList.updateDroppable(2L, 4L, "A");
		todoRepo.flush();
		System.out.println(todoRepo.findAll());

		// expected order
		// 1 -> 4 -> 2 -> 3 -> 5

		assertNextId(1L, 4L);
		assertNextId(2L, 3L);
		assertNextId(3L, 5L);
		assertNextId(4L, 2L);
		assertNextId(5L, -1l);
	}

	@Test
	@DirtiesContext
	void testLinkedList_multiColumn_put_to_empty() {
		todoRepo.save(new TodoItem(1L, "A1", "A", 2L));
		todoRepo.save(new TodoItem(2L, "A2", "A", 3L));
		todoRepo.save(new TodoItem(3L, "A3", "A", 4L));
		todoRepo.save(new TodoItem(4L, "A4", "A", 5L));
		todoRepo.save(new TodoItem(5L, "A5", "A", -1L));
		todoRepo.flush();

		// initial condition
		// 1 -> 2 -> 3 -> 4 -> 5
		linkedList.updateDroppable(-1L, 4L, "B");
		todoRepo.flush();
		// expected order
		// A: 1 -> 2 -> 3 -> 5
		// B: 4

		assertNextId(1L, 2L);
		assertNextId(2L, 3L);
		assertNextId(3L, 5L);
		assertNextId(4L, -1L);
		assertNextId(5L, -1L);

		linkedList.updateDroppable(-1L, 2L, "C");
		todoRepo.flush();
		// expected order
		// A: 1 -> 3 -> 5
		// B: 4
		// C: 2

		assertNextId(1L, 3L);
		assertNextId(2L, -1L);
		assertNextId(3L, 5L);
		assertNextId(4L, -1L);
		assertNextId(5L, -1L);
	}

	@Test
	@DirtiesContext
	void testLinkedList_multiColumn() {
		todoRepo.save(new TodoItem(1L, "A1", "A", 2L));
		todoRepo.save(new TodoItem(2L, "A2", "A", -1L));
		todoRepo.save(new TodoItem(3L, "B3", "B", 4L));
		todoRepo.save(new TodoItem(4L, "B4", "B", -1L));
		todoRepo.save(new TodoItem(5L, "C5", "C", 6L));
		todoRepo.save(new TodoItem(6L, "C6", "C", -1L));
		todoRepo.flush();

		// initial condition
		// A: 1 -> 2
		// B: 3 -> 4
		// C: 5 -> 6

		linkedList.updateDroppable(3L, 1L, "B");
		todoRepo.flush();
		// expected order
		// A: 2
		// B: 1 -> 3 -> 4
		// C: 5 -> 6

		assertNextId(1L, 3L);
		assertNextId(2L, -1L);
		assertNextId(3L, 4L);
		assertNextId(4L, -1L);
		assertNextId(5L, 6L);
		assertNextId(6L, -1L);

		linkedList.updateDroppable(4L, 6L, "B");
		todoRepo.flush();
		// expected order
		// A: 2
		// B: 3 -> 1 -> 4 -> 6
		// C: 5

		assertNextId(1L, 4L);
		assertNextId(2L, -1L);
		assertNextId(3L, 1L);
		assertNextId(4L, 6L);
		assertNextId(5L, -1L);
		assertNextId(6L, -1L);
	}

	void assertNextId(long itemId, Long nextId) {
		assertEquals(nextId, todoRepo.findById(itemId).get().getNextId());
	}

}
