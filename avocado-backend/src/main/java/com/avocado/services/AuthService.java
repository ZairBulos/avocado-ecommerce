package com.avocado.services;

import com.avocado.dtos.LoginDTO;
import com.avocado.dtos.UserDTO;

public interface AuthService {

    String login(LoginDTO dto) throws Exception;
    String register(UserDTO dto) throws Exception;
}
