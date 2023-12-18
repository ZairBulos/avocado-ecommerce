package com.avocado.services.impl;

import com.avocado.dtos.order.OrderDTO;
import com.avocado.dtos.order.OrderDetailRequestDTO;
import com.avocado.dtos.order.OrderRequestDTO;
import com.avocado.entities.Order;
import com.avocado.entities.OrderDetail;
import com.avocado.mappers.OrderDetailMapper;
import com.avocado.mappers.OrderMapper;
import com.avocado.repositories.*;
import com.avocado.services.ItemService;
import com.avocado.services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemService itemService;

    private final OrderMapper orderMapper = OrderMapper.getInstance();

    private final OrderDetailMapper orderDetailMapper = OrderDetailMapper.getInstance();

    @Override
    public List<OrderDTO> findAll() throws Exception {
        try {
            List<Order> orders = orderRepository.findAll();
            List<OrderDTO> ordersDTOsList = new ArrayList<>();

            for (Order order : orders) {
                OrderDTO dto = orderMapper.toDTO(order);

                Double total = orderRepository.findTotalForOrder(order.getId());
                List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(order.getId());

                dto.setTotal(total);
                dto.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

                ordersDTOsList.add(dto);
            }

            return ordersDTOsList;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<OrderDTO> findAllByUser(Long userId) throws Exception {
        try {
            if (!userRepository.existsById(userId)) {
                throw new EntityNotFoundException("User not found with id: " + userId);
            }

            List<Order> orders = orderRepository.findAllByUser_Id(userId);
            List<OrderDTO> ordersDTOsList = new ArrayList<>();

            for (Order order : orders) {
                OrderDTO dto = orderMapper.toDTO(order);

                Double total = orderRepository.findTotalForOrder(order.getId());
                List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(order.getId());

                dto.setTotal(total);
                dto.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

                ordersDTOsList.add(dto);
            }

            return ordersDTOsList;
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public OrderDTO findById(Long id) throws Exception {
        try {
            Order entity = orderRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
            OrderDTO orderDTO = orderMapper.toDTO(entity);

            Double total = orderRepository.findTotalForOrder(id);
            List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(id);

            orderDTO.setTotal(total);
            orderDTO.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

            return orderDTO;
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public OrderDTO save(OrderRequestDTO dto) throws Exception {
        try {
            Order order = orderRepository.save(orderMapper.toEntity(dto));

            // Details
            List<OrderDetail> orderDetails = orderDetailMapper.toEntitiesList(dto.getOrderDetails());
            for (OrderDetail orderDetail : orderDetails) {
                orderDetail.setOrder(order);

            }
            orderDetailRepository.saveAll(orderDetails);

            // Subtract Stock
            for (OrderDetailRequestDTO orderDetailDTO : dto.getOrderDetails()) {
                Long itemId = orderDetailDTO.getItemId();
                Integer stock = -orderDetailDTO.getQuantity();

                itemService.updateStock(itemId, stock);
            }

            return findById(order.getId());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(Long id) throws Exception {
        try {
            if (!orderRepository.existsById(id)) {
                throw new EntityNotFoundException("Order not found with id: " + id);
            }

            // Return Stock
            List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(id);
            for (OrderDetail orderDetail : orderDetails) {
                Long itemId = orderDetail.getItem().getId();
                Integer stock = orderDetail.getQuantity();

                itemService.updateStock(itemId, stock);
            }

            // OrderDetails
            orderDetailRepository.deleteAllByOrderId(id);

            // Order
            orderRepository.deleteById(id);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
