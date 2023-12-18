package com.avocado.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthDTO {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
