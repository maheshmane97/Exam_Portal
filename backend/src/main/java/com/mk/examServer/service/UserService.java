package com.mk.examServer.service;

import java.util.Set;

import com.mk.examServer.model.User;
import com.mk.examServer.model.UserRole;

public interface UserService {
	
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;
	
	public User getUserByUserName(String userName);
	
	public User getById(Integer userId);
}
