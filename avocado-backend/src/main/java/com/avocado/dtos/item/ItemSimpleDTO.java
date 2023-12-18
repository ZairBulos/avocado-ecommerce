package com.avocado.dtos.item;

import com.avocado.dtos.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ItemSimpleDTO extends BaseDTO {
    private String name;
    private String image;
    private Double sellPrice;
}
