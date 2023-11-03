package com.avocado.services.impl;

import com.avocado.dtos.BaseDTO;
import com.avocado.entities.Base;
import com.avocado.mappers.BaseMapper;
import com.avocado.repositories.BaseRepository;
import com.avocado.services.BaseService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public abstract class BaseServiceImpl<E extends Base, D extends BaseDTO, ID extends Serializable> implements BaseService<E, D, ID> {

    protected BaseRepository<E, ID> baseRepository;
    protected BaseMapper<E, D> baseMapper;

    public BaseServiceImpl(BaseRepository<E, ID> baseRepository, BaseMapper<E, D> baseMapper) {
        this.baseRepository = baseRepository;
        this.baseMapper = baseMapper;
    }

    @Override
    public List<D> findAll() throws Exception {
        try {
            List<E> entities = baseRepository.findAll();
            return baseMapper.toDTOsList(entities);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Page<E> findAll(Pageable pageable) throws Exception {
        try {
            return baseRepository.findAll(pageable);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public D findById(ID id) throws Exception {
        try {
            Optional<E> optional = baseRepository.findById(id);

            if (optional.isEmpty()) {
                throw new Exception("Entity not found");
            }

            E entity = optional.get();
            return baseMapper.toDTO(entity);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public E save(D dto) throws Exception {
        try {
            E entity = baseMapper.toEntity(dto);
            return baseRepository.save(entity);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public E update(ID id, D dto) throws Exception {
        try {
            Optional<E> optional = baseRepository.findById(id);

            if (optional.isEmpty()) {
                throw new Exception("Entity not found");
            }

            E entity = baseMapper.toEntity(dto);
            return baseRepository.save(entity);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(ID id) throws Exception {
        try {
            Optional<E> optional = baseRepository.findById(id);

            if (optional.isEmpty()) {
                throw new Exception("Entity not found");
            }

            baseRepository.deleteById(id);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
