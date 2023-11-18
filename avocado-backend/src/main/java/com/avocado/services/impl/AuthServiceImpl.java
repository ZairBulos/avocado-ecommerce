package com.avocado.services.impl;

import com.avocado.dtos.LoginDTO;
import com.avocado.dtos.UserDTO;
import com.avocado.entities.User;
import com.avocado.repositories.UserRepository;
import com.avocado.services.AuthService;
import com.avocado.services.UserService;
import com.avocado.utils.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public String login(LoginDTO dto) throws Exception {
        try {
             authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                     dto.getEmail(),
                     dto.getPassword()
             ));

            User user = userRepository.findByEmail(dto.getEmail()).orElseThrow(
                    () -> new Exception("User with email " + dto.getEmail() + " not found")
            );

            return jwtService.generateToken(user);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String register(UserDTO dto) throws Exception {
        try {
            User user = userService.save(dto);
            return jwtService.generateToken(user);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
