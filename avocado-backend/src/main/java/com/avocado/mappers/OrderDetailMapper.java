package com.avocado.mappers;

import com.avocado.dtos.OrderDetailDTO;
import com.avocado.entities.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper extends BaseMapper<OrderDetail, OrderDetailDTO> {

    static OrderDetailMapper getInstance() {
        return Mappers.getMapper(OrderDetailMapper.class);
    }

    @Override
    @Mapping(target = "item.id", source = "source.itemId")
    OrderDetail toEntity(OrderDetailDTO source);
}
