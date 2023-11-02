package com.avocado.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "item_stock")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "id_item_stock"))
public class ItemStock extends Base {

    @NotNull
    @Min(0)
    @Column(name = "current_stock", nullable = false)
    private Integer currentStock;

    @NotNull
    @Column(name = "current_stock_date", nullable = false)
    private LocalDateTime currentStockDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id")
    private Item item;

    @PrePersist
    private void onCreate() {
        currentStockDate = LocalDateTime.now();
    }
}
