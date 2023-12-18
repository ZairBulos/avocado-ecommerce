package com.avocado.mappers;

import com.avocado.dtos.order.OrderDTO;
import com.avocado.dtos.order.OrderRequestDTO;
import com.avocado.entities.Order;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface OrderMapper {

    static OrderMapper getInstance() {
        return Mappers.getMapper(OrderMapper.class);
    }

    @Named("toEntity")
    @Mapping(target = "user.id", source = "source.userId")
    Order toEntity(OrderRequestDTO source);

    @Named("toDTO")
    @Mapping(target = "user", source = "source.user.email")
    OrderDTO toDTO(Order source);

    @Named("toDTOsList")
    @IterableMapping(qualifiedByName = "toDTO")
    List<OrderDTO> toDTOsList(List<Order> source);
}
