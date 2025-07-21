
package com.backend.user;


import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public long save(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword_hash(userDto.getPassword());
        user.setRole(userDto.getRole());
        return userRepository.addUser(user);
    }

    public User findById(long id) {
        Optional<User> user = userRepository.getUserById(id);
        return user.orElse(null);
    }

    public List<User> findAll() {
        return userRepository.getAllUsers();
    }

    public void delete(long id) {
        userRepository.deleteUserById(id);

    }
}