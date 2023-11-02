package com.avocado.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "id_order"))
public class Order extends Base {

    @NotNull
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    private void onCreate() {
        orderDate = LocalDateTime.now();
    }
}
