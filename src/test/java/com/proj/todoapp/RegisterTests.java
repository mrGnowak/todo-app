package com.proj.todoapp;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.proj.todoapp.repository.UsersRepo;
import com.proj.todoapp.service.UserService;
import com.proj.todoapp.model.AppUser;

// import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@ComponentScan(basePackages = "com.proj.todoapp")
class RegisterTests {

	@Autowired
	private UsersRepo usersRepo;

	@Autowired
	private UserService userService;

	@Test
	void contextLoads() {
		assertEquals(2, 1 + 1);
	}

	@Test
	@DirtiesContext
	void testRepoAdd() {
		var user1 = new AppUser(1L, "user1", "1234", "user1@user.com");
		var user2 = new AppUser(2L, "user2", "1234", "user2@user.com");

		userService.saveNewUser(user1);
		userService.saveNewUser(user2);
		usersRepo.flush();

		assertEquals(usersRepo.findById(1L).get().getUserName(), "user1");
		assertEquals(usersRepo.findById(2L).get().getEmail(), "user2@user.com");
		assertHashPassword("1234", usersRepo.findById(1L).get().getPassword());

		// check correct statement:
		// except: Created!
		var user3 = new AppUser(2L, "user3", "1234", "user3@user.com");

		assertEquals(userService.saveNewUser(user3), "Created!");
	}

	@Test
	@DirtiesContext
	void testEmailOrUsernameExist() {
		var user1 = new AppUser(1L, "user1", "1234", "user1@user.com");
		var user2 = new AppUser(2L, "user2", "1234", "user2@user.com");

		userService.saveNewUser(user1);
		userService.saveNewUser(user2);
		usersRepo.flush();

		var userWrongUserName = new AppUser(1L, "user1", "1234", "user1234@user.com");
		var userWrongEmail = new AppUser(1L, "user1234", "1234", "user1@user.com");
		var userWrongBoth = new AppUser(2L, "user2", "1234", "user2@user.com");

		// if username exist returnes statement:
		// UserName is occupied!
		var statementuserName = userService.saveNewUser(userWrongUserName);
		assertEquals(statementuserName, "UserName is occupied!");

		// if email exist returned statement:
		// This email is already in use!
		var statementEmail = userService.saveNewUser(userWrongEmail);
		assertEquals(statementEmail, "This email is already in use!");
		// if both exist return only username statement:
		// UserName is occupied!
		var statementBoth = userService.saveNewUser(userWrongBoth);
		assertEquals(statementBoth, "UserName is occupied!");
	}

	void assertHashPassword(String password, String dbHashPassword) {
		var check = userService.checkPasswordMatches(password, dbHashPassword);
		assertEquals(check, true);
	}
}
