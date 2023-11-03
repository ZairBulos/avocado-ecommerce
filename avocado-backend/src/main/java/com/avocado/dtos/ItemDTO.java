package com.avocado.dtos;

import lombok.Data;

import java.util.List;

@Data
public class ItemDTO extends BaseDTO {
    private String name;
    private Boolean blocked;
    private String description;
    private List<String> images;
    private Double sellPrice;
    private Integer currentStock;
}
