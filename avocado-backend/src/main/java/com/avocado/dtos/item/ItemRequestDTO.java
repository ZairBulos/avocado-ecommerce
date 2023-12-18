package com.avocado.dtos.item;

import com.avocado.enums.ItemShape;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String image;

    @NotNull
    @Min(1)
    private Double sellPrice;

    @NotNull
    @Min(1)
    private Integer currentStock;

    @NotNull
    private ItemShape shape;

    @NotBlank
    private String taste;

    @NotNull
    private Integer hardiness;
}
