package com.avocado.mappers;

import com.avocado.dtos.OrderDTO;
import com.avocado.entities.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderMapper extends BaseMapper<Order, OrderDTO> {

    static OrderMapper getInstance() {
        return Mappers.getMapper(OrderMapper.class);
    }

    @Override
    @Mapping(target = "userId", source = "source.user.id")
    @Mapping(target = "userEmail", source = "source.user.email")
    OrderDTO toDTO(Order source);

    @Override
    @Mapping(target = "user.id", source = "source.userId")
    Order toEntity(OrderDTO source);
}
