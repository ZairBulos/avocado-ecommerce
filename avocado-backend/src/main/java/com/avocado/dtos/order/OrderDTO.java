package com.avocado.dtos.order;

import com.avocado.dtos.BaseDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderDTO extends BaseDTO {
    private String user;
    private Double total;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime orderDate;
    private List<OrderDetailDTO> orderDetails;
}
