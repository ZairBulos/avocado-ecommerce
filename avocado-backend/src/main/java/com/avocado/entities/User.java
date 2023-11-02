package com.avocado.entities;

import com.avocado.enums.RoleUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "id_user"))
public class User extends Base {

    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private RoleUser role;

    @PrePersist
    private void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
