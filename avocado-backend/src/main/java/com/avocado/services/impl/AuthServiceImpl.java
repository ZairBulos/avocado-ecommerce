package com.avocado.services.impl;

import com.avocado.dtos.auth.AuthDTO;
import com.avocado.dtos.auth.TokenDTO;
import com.avocado.entities.User;
import com.avocado.repositories.UserRepository;
import com.avocado.services.AuthService;
import com.avocado.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtUtil jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public TokenDTO login(AuthDTO dto) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    dto.getEmail(),
                    dto.getPassword()
            ));

            User user = userRepository.findByEmail(dto.getEmail())
                    .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + dto.getEmail()));

            TokenDTO token = new TokenDTO();
            token.setAccessToken(jwtService.generateToken(user));

            return token;
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public TokenDTO register(AuthDTO dto) throws Exception {
        try {
            User user = userService.save(dto);

            TokenDTO token = new TokenDTO();
            token.setAccessToken(jwtService.generateToken(user));

            return token;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
