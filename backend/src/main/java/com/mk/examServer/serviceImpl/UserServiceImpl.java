package com.mk.examServer.serviceImpl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.mk.examServer.model.User;
import com.mk.examServer.model.UserRole;
import com.mk.examServer.repository.RoleRepository;
import com.mk.examServer.repository.UserRepository;
import com.mk.examServer.service.UserService;

import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	
	//Create User
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		User local=userRepository.findByUserName(user.getUserName());
		if(local!=null) {
		System.out.println("User Already Exist.!!");
		throw new Exception("User Already exist..!!");
		}else {
			//Create User
			for(UserRole ur: userRoles) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local=userRepository.save(user);
		}
		return user;
	}

	
	@Override
	public User getUserByUserName(@PathVariable String userName) {
		return userRepository.findByUserName(userName);
	}


	@Override
	public User getById(Integer userId) {
		return userRepository.findById(userId).get();
	}

}
