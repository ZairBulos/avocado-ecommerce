package com.avocado.dtos.item;

import com.avocado.dtos.BaseDTO;
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
