package com.avocado.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_detail")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "id_order_detail"))
public class OrderDetail extends Base {

    @NotNull
    @Min(1)
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull
    @Min(1)
    @Column(name = "unit_price", nullable = false, columnDefinition = "DECIMAL(10,2)")
    private Double unitPrice;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id")
    private Item item;
}
