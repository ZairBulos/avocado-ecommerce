package com.avocado.mappers;

import com.avocado.dtos.order.OrderDetailDTO;
import com.avocado.dtos.order.OrderDetailRequestDTO;
import com.avocado.entities.OrderDetail;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface OrderDetailMapper {

    static OrderDetailMapper getInstance() {
        return Mappers.getMapper(OrderDetailMapper.class);
    }

    @Named("toEntity")
    @Mapping(target = "item.id", source = "source.itemId")
    OrderDetail toEntity(OrderDetailRequestDTO source);

    @Named("toEntitiesList")
    @IterableMapping(qualifiedByName = "toEntity")
    List<OrderDetail> toEntitiesList(List<OrderDetailRequestDTO> source);

    @Named("toDTO")
    OrderDetailDTO toDTO(OrderDetail source);

    @Named("toDTOsList")
    @IterableMapping(qualifiedByName = "toDTO")
    List<OrderDetailDTO> toDTOsList(List<OrderDetail> source);
}
