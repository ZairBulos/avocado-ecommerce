package com.avocado.services;

import com.avocado.dtos.OrderDTO;
import com.avocado.entities.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService extends BaseService<Order, OrderDTO, Long> {
    Page<OrderDTO> findAllPaged(Pageable pageable) throws Exception;
    List<OrderDTO> findAllByUserId(Long userId) throws Exception;
    Page<OrderDTO> findAllByUserId(Long userId, Pageable pageable) throws Exception;
}
