package com.avocado.dtos.order;

import com.avocado.dtos.BaseDTO;
import com.avocado.dtos.item.ItemDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderDetailDTO extends BaseDTO {
    private Integer quantity;
    private Double unitPrice;
    private ItemDTO item;
}
