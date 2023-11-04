package com.avocado.controllers;

import com.avocado.dtos.ItemDTO;
import com.avocado.entities.Item;
import com.avocado.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/items")
public class ItemController extends BaseControllerImpl<Item, ItemDTO> {

    @Autowired
    private ItemService service;

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

    @GetMapping("/unlocked")
    public ResponseEntity<?> getAllUnlocked() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findAllUnlocked());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }

    @GetMapping("/unlocked/paged")
    public ResponseEntity<?> getAllUnlocked(@PageableDefault(page = 0, size = 4) Pageable pageable) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.findAllUnlocked(pageable));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> blockUnblock(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(service.blockUnblock(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"something went wrong\"}");
        }
    }
}
