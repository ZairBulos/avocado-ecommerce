package com.avocado.controllers;

import com.avocado.dtos.LoginDTO;
import com.avocado.dtos.TokenDTO;
import com.avocado.dtos.UserDTO;
import com.avocado.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        try {
            TokenDTO token = new TokenDTO();
            token.setAccessToken(service.login(dto));

            return ResponseEntity.status(HttpStatus.OK)
                    .body(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO dto) {
        try {
            TokenDTO token = new TokenDTO();
            token.setAccessToken(service.register(dto));

            return ResponseEntity.status(HttpStatus.OK)
                    .body(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }
}
