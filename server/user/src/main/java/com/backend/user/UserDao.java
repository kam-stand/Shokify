package com.backend.user;

import java.util.List;
import java.util.Optional;

public interface UserDao {

    long addUser(User user);
    int deleteUserById(long id);
    int updateUser(User user);
    Optional<User> getUserById(long id);
    List<User> getAllUsers();
}

