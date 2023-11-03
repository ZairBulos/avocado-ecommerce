package com.avocado.services;


import com.avocado.dtos.BaseDTO;
import com.avocado.entities.Base;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;

public interface BaseService<E extends Base, D extends BaseDTO, ID extends Serializable>  {
    public List<D> findAll() throws Exception;
    public Page<E> findAll(Pageable pageable) throws Exception;
    public D findById(ID id) throws Exception;
    public E save(D dto) throws Exception;
    public E update(ID id, D dto) throws Exception;
    public void delete(ID id) throws Exception;
}
