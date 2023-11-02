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
@Table(name = "item_sell_price")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "id_item_sell_price"))
public class ItemSellPrice extends Base {

    @NotNull
    @Min(1)
    @Column(name = "sell_price", nullable = false, columnDefinition = "DECIMAL(10,2)")
    private Double sellPrice;

    @NotNull
    @Column(name = "sell_price_date", nullable = false)
    private LocalDateTime sellPriceDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id")
    private Item item;

    @PrePersist
    private void onCreate() {
        sellPriceDate = LocalDateTime.now();
    }
}
