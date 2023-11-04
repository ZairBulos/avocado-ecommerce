package com.avocado.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderDetailDTO extends BaseDTO {
    private Integer quantity;
    private Double unitPrice;
    private Long itemId;
    private ItemDTO item;
}
