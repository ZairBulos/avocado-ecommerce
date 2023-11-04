package com.avocado.mappers;

import com.avocado.dtos.OrderDetailDTO;
import com.avocado.entities.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper extends BaseMapper<OrderDetail, OrderDetailDTO> {

    static OrderDetailMapper getInstance() {
        return Mappers.getMapper(OrderDetailMapper.class);
    }

}
