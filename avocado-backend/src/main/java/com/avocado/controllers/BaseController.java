package com.avocado.controllers;

import com.avocado.dtos.BaseDTO;
import com.avocado.entities.Base;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.Serializable;

public interface BaseController<E extends Base, D extends BaseDTO, ID extends Serializable> {
    ResponseEntity<?> getAll();
    ResponseEntity<?> getAll(Pageable pageable);
    ResponseEntity<?> getOne(@PathVariable ID id);
    ResponseEntity<?> save(@RequestBody D dto);
    ResponseEntity<?> update(@PathVariable ID id, @RequestBody D dto);
    ResponseEntity<?> delete(@PathVariable ID id);
}
