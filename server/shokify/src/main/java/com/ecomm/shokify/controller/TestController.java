package com.ecomm.shokify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public ResponseEntity<?> testEndpoint() {
        return ResponseEntity.ok("Hello, Shokify!");
    }
}