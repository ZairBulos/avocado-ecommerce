package com.avocado.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderDTO extends BaseDTO {
    private Double total;
    private Long userId;
    private String userEmail;
    private LocalDateTime orderDate;
    private List<OrderDetailDTO> orderDetails;
}
