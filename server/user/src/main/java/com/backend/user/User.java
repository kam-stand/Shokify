package com.backend.user;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class User {
    private long user_id;
    private String name;
    private String email;
    private String password_hash;
    private String role;

}
