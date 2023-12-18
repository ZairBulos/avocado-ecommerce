package com.avocado.dtos.order;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDTO {

    @NotNull
    private Long userId;

    @NotEmpty
    private List<OrderDetailRequestDTO> orderDetails;
}
