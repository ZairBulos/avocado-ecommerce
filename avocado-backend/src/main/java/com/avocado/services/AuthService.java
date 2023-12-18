package com.avocado.services;

import com.avocado.dtos.auth.AuthDTO;
import com.avocado.dtos.auth.TokenDTO;

public interface AuthService {

    TokenDTO login(AuthDTO dto) throws Exception;
    TokenDTO register(AuthDTO dto) throws Exception;
}
