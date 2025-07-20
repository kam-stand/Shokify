package com.backend.user;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;
@Repository
public class UserRepository implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public long addUser(User user) {
        String sql = "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword_hash());
            ps.setString(4, user.getRole());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    @Override
    public int deleteUserById(long id) {
        return jdbcTemplate.update("DELETE FROM users WHERE user_id = ?", id);
    }

    @Override
    public int updateUser(User user) {
        return jdbcTemplate.update("UPDATE users SET name = ?, email = ?, password_hash = ?, role = ? WHERE user_id = ?",
                user.getName(), user.getEmail(), user.getPassword_hash(), user.getRole(), user.getUser_id());
    }

    @Override
    public Optional<User> getUserById(long id) {
        try {
            User user = jdbcTemplate.queryForObject("SELECT * FROM users WHERE user_id = ?",
                    new BeanPropertyRowMapper<>(User.class), id);
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<User> getAllUsers() {
        return jdbcTemplate.query("SELECT * FROM users", new BeanPropertyRowMapper<>(User.class));
    }
}
