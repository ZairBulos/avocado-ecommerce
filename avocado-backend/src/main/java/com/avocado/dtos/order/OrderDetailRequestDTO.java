package com.avocado.dtos.order;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderDetailRequestDTO {

    @NotNull
    private Integer quantity;

    @NotNull
    private Double unitPrice;

    @NotNull
    private Long itemId;
}
