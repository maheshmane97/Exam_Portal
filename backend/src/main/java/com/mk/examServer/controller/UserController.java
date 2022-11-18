package com.mk.examServer.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mk.examServer.model.Role;
import com.mk.examServer.model.User;
import com.mk.examServer.model.UserRole;
import com.mk.examServer.service.UserService;

@RestController
@RequestMapping("/examServer")
@CrossOrigin
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/user")
	public User createUser(@RequestBody User user) throws Exception {
		Set<UserRole> userRoles=new HashSet<>();
		Role role=new Role();
		role.setRoleId(1);
		role.setRole("NORMAL");
		
		UserRole userRole=new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		userRoles.add(userRole);
		
		return userService.createUser(user, userRoles);
		
	}
	
	@GetMapping("{userName}")
	public User getUser(@PathVariable String userName) {
		return userService.getUserByUserName(userName);
	}
	
	@GetMapping
	public User getUserById(@RequestParam Integer userId) {
		return userService.getById(userId);
	}
}
