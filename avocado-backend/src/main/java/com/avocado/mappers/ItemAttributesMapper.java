package com.avocado.mappers;

import com.avocado.dtos.ItemAttributesDTO;
import com.avocado.entities.ItemAttributes;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ItemAttributesMapper extends BaseMapper<ItemAttributes, ItemAttributesDTO> {

    static ItemAttributesMapper getInstance() {
        return Mappers.getMapper(ItemAttributesMapper.class);
    }

}
