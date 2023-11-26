package com.avocado.services.impl;

import com.avocado.dtos.OrderDTO;
import com.avocado.dtos.OrderDetailDTO;
import com.avocado.entities.Item;
import com.avocado.entities.ItemStock;
import com.avocado.entities.Order;
import com.avocado.entities.OrderDetail;
import com.avocado.mappers.BaseMapper;
import com.avocado.mappers.OrderDetailMapper;
import com.avocado.mappers.OrderMapper;
import com.avocado.repositories.*;
import com.avocado.services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemStockRepository itemStockRepository;

    @Autowired
    private UserRepository userRepository;

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
            if (!userRepository.existsById(userId)) {
                throw new EntityNotFoundException("User not found with id:" + userId);
            }

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
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Page<OrderDTO> findAllByUserId(Long userId, Pageable pageable) throws Exception {
        try {
            if (!userRepository.existsById(userId)) {
                throw new EntityNotFoundException("User not found with id:" + userId);
            }

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
            OrderDTO dto = orderMapper.toDTO(entity);

            Double total = orderRepository.findTotalForOrder(id);
            List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_Id(id);

            dto.setTotal(total);
            dto.setOrderDetails(orderDetailMapper.toDTOsList(orderDetails));

            return dto;
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Order save(OrderDTO dto) throws Exception {
        try {
            Order order = orderRepository.save(orderMapper.toEntity(dto));

            // Details
            List<OrderDetail> orderDetails = orderDetailMapper.toEntitiesList(dto.getOrderDetails());
            for (OrderDetail orderDetail : orderDetails) {
                orderDetail.setOrder(order);
            }
            orderDetailRepository.saveAll(orderDetails);

            // Subtract Stock
            for (OrderDetailDTO orderDetailDTO : dto.getOrderDetails()) {
                ItemStock itemStock = new ItemStock();

                Item item = itemRepository.findById(orderDetailDTO.getItemId()).get();
                Integer latestStock = itemStockRepository.findCurrentStockByItemId(orderDetailDTO.getItemId());
                Integer currentStock = latestStock - orderDetailDTO.getQuantity();

                itemStock.setCurrentStock(currentStock);
                itemStock.setItem(item);

                itemStockRepository.save(itemStock);
            }

            return order;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
