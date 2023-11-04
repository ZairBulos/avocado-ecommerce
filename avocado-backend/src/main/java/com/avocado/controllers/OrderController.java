package com.avocado.controllers;

import com.avocado.dtos.OrderDTO;
import com.avocado.entities.Order;
import com.avocado.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/orders")
public class OrderController extends BaseControllerImpl<Order, OrderDTO> {

    @Autowired
    private OrderService service;

    @Override
    @GetMapping("/paged")
    public ResponseEntity<?> getAll(@PageableDefault(page = 0, size = 4) Pageable pageable) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findAllPaged(pageable));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }

    @GetMapping("/{id}/purchase-history")
    public ResponseEntity<?> getAllByUserId(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findAllByUserId(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }

    @GetMapping("/{id}/purchase-history/paged")
    public ResponseEntity<?> getAllByUserId(@PathVariable Long id, @PageableDefault(page = 0, size = 4) Pageable pageable) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findAllByUserId(id, pageable));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }
}
