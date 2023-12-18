package com.avocado.mappers;

import com.avocado.dtos.item.ItemDTO;
import com.avocado.dtos.item.ItemRequestDTO;
import com.avocado.dtos.item.ItemSimpleDTO;
import com.avocado.entities.Item;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ItemMapper {

    static ItemMapper getInstance() {
        return Mappers.getMapper(ItemMapper.class);
    }

    @Named("toEntity")
    Item toEntity(ItemRequestDTO source);

    @Named("toDTO")
    ItemDTO toDTO(Item source);

    @Named("toDTOsList")
    @IterableMapping(qualifiedByName = "toDTO")
    List<ItemDTO> toDTOsList(List<Item> source);

    @Named("toSimpleDTO")
    ItemSimpleDTO toSimpleDTO(Item source);

    @Named("toSimpleDTOsList")
    @IterableMapping(qualifiedByName = "toSimpleDTO")
    List<ItemSimpleDTO> toSimpleDTOsList(List<Item> source);
}
