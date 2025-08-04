package com.codinghub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codinghub.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}