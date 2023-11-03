package com.avocado.mappers;

import com.avocado.dtos.BaseDTO;
import com.avocado.entities.Base;

import java.util.List;

public interface BaseMapper<E extends Base, D extends BaseDTO> {
    D toDTO(E source);
    E toEntity(D source);
    List<D> toDTOsList(List<E> source);
    List<E> toEntitiesList(List<D> source);
}
