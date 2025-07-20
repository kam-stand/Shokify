package com.backend.user;

import lombok.*;
import org.springframework.validation.annotation.Validated;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Validated
public class UserDto{
    long user_id;

    private String name;

    private String email;

    private String password;

    private String role;
}