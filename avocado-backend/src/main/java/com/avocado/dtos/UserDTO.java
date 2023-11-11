package com.avocado.dtos;

import com.avocado.enums.RoleUser;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserDTO extends BaseDTO {
    private String email;
    private String password;
    private RoleUser role;
}
