package com.avocado.controllers;

import com.avocado.dtos.OrderDTO;
import com.avocado.entities.Order;
import com.avocado.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/orders")
public class OrderController extends BaseControllerImpl<Order, OrderDTO> {

    @Autowired
    private OrderService service;

    @Override
    @GetMapping("")
    @PreAuthorize("hasAuthority('CLIENT')")
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }

    @Override
    @GetMapping("/paged")
    @PreAuthorize("hasAuthority('CLIENT')")
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
    @PreAuthorize("hasAuthority('CLIENT')")
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
    @PreAuthorize("hasAuthority('CLIENT')")
    public ResponseEntity<?> getAllByUserId(@PathVariable Long id, @PageableDefault(page = 0, size = 4) Pageable pageable) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findAllByUserId(id, pageable));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('CLIENT')")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }

    @Override
    @PostMapping
    @PreAuthorize("hasAuthority('CLIENT')")
    public ResponseEntity<?> save(@RequestBody OrderDTO dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(service.save(dto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }
}
