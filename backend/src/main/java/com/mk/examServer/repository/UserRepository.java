package com.mk.examServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mk.examServer.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	public User findByUserName(String userName);
}
