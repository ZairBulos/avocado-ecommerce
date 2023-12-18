package com.avocado.services;

import com.avocado.dtos.order.OrderDTO;
import com.avocado.dtos.order.OrderRequestDTO;

import java.util.List;

public interface OrderService {
    List<OrderDTO> findAll() throws Exception;
    List<OrderDTO> findAllByUser(Long userId) throws Exception;
    OrderDTO findById(Long id) throws Exception;
    OrderDTO save(OrderRequestDTO dto) throws Exception;
    void delete(Long id) throws Exception;
}
