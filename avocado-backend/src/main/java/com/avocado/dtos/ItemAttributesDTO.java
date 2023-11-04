package com.avocado.dtos;

import com.avocado.enums.ItemShape;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ItemAttributesDTO extends BaseDTO {
    private ItemShape shape;
    private String taste;
    private Integer hardiness;
}
