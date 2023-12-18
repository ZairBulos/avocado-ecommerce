package com.avocado.mappers;

import com.avocado.dtos.item.ItemAttributesDTO;
import com.avocado.entities.ItemAttributes;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ItemAttributesMapper {

    static ItemAttributesMapper getInstance() {
        return Mappers.getMapper(ItemAttributesMapper.class);
    }

    @Named("toDTO")
    ItemAttributesDTO toDTO(ItemAttributes source);
}
