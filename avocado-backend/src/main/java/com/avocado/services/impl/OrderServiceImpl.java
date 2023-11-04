package com.avocado.services.impl;

import com.avocado.dtos.OrderDTO;
import com.avocado.entities.Order;
import com.avocado.entities.OrderDetail;
import com.avocado.mappers.BaseMapper;
import com.avocado.mappers.OrderDetailMapper;
import com.avocado.mappers.OrderMapper;
import com.avocado.repositories.BaseRepository;
import com.avocado.repositories.OrderDetailRepository;
import com.avocado.repositories.OrderRepository;
import com.avocado.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl extends BaseServiceImpl<Order, OrderDTO, Long> implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    private final OrderMapper orderMapper = OrderMapper.getInstance();

    private final OrderDetailMapper orderDetailMapper = OrderDetailMapper.getInstance();

    public OrderServiceImpl(BaseRepository<Order, Long> baseRepository, BaseMapper<Order, OrderDTO> baseMapper) {
        super(baseRepository, baseMapper);
    }

    @Override
    public List<OrderDTO> findAll() throws Exception {
        try {
            List<Order> entities = orderRepository.findAll();
            List<OrderDTO> dtos = new ArrayList<>();

            for (Order order : entities) {
                OrderDTO dto = orderMapper.toDTO(order);

                Double total = orderRepository.findTotalForOrder(order.getId());
                List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(order.getId());

                dto.setTotal(total);
                dto.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

                dtos.add(dto);
            }

            return dtos;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Page<OrderDTO> findAllPaged(Pageable pageable) throws Exception {
        try {
            Page<Order> pageables = orderRepository.findAll(pageable);
            List<OrderDTO> dtos = new ArrayList<>();

            for (Order order : pageables) {
                OrderDTO dto = orderMapper.toDTO(order);

                Double total = orderRepository.findTotalForOrder(order.getId());
                List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(order.getId());

                dto.setTotal(total);
                dto.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

                dtos.add(dto);
            }

            return new PageImpl<>(dtos, pageable, pageables.getTotalElements());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<OrderDTO> findAllByUserId(Long userId) throws Exception {
        try {
            try {
                List<Order> entities = orderRepository.findAllByUser_Id(userId);
                List<OrderDTO> dtos = new ArrayList<>();

                for (Order order : entities) {
                    OrderDTO dto = orderMapper.toDTO(order);

                    Double total = orderRepository.findTotalForOrder(order.getId());
                    List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(order.getId());

                    dto.setTotal(total);
                    dto.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

                    dtos.add(dto);
                }

                return dtos;
            } catch (Exception e) {
                throw new Exception(e.getMessage());
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Page<OrderDTO> findAllByUserId(Long userId, Pageable pageable) throws Exception {
        try {
            Page<Order> pageables = orderRepository.findAllByUser_Id(userId, pageable);
            List<OrderDTO> dtos = new ArrayList<>();

            for (Order order : pageables) {
                OrderDTO dto = orderMapper.toDTO(order);

                Double total = orderRepository.findTotalForOrder(order.getId());
                List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(order.getId());

                dto.setTotal(total);
                dto.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

                dtos.add(dto);
            }

            return new PageImpl<>(dtos, pageable, pageables.getTotalElements());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public OrderDTO findById(Long id) throws Exception {
        try {
            Order entity = orderRepository
                    .findById(id)
                    .orElseThrow(() -> new RuntimeException("Order with id "+ id +" not found"));
            OrderDTO dto = orderMapper.toDTO(entity);

            Double total = orderRepository.findTotalForOrder(id);
            List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(id);

            dto.setTotal(total);
            dto.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

            return dto;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
