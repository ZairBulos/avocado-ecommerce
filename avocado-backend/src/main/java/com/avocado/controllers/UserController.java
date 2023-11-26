package com.avocado.controllers;

import com.avocado.dtos.UserDTO;
import com.avocado.entities.User;
import com.avocado.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("api/users")
public class UserController extends BaseControllerImpl<User, UserDTO> {

    @Autowired
    private UserService service;

    @GetMapping("/statistics/users-registered-in-month")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getUsersRegisteredInMonth(
            @RequestParam(name = "year", required = false) Integer year,
            @RequestParam(name = "month", required = false) Integer month
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.countUsersRegisteredInMonth(year, month));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Internal server error.\"}");
        }
    }

    @GetMapping("/statistics/users-registered-between-dates")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getUsersRegisteredBetweenDates(
            @RequestParam(name = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam(name = "endDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.countUsersRegisteredBetweenDates(startDate, endDate));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Internal server error.\"}");
        }
    }

    @GetMapping("/ranking/top-users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getTop5UsersWithMostOrders() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findTop5UsersWithMostOrders());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Internal server error.\"}");
        }
    }
}
