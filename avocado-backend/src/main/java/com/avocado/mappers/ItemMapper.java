package com.avocado.mappers;

import com.avocado.dtos.ItemDTO;
import com.avocado.entities.Item;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ItemMapper extends BaseMapper<Item, ItemDTO> {

    static ItemMapper getInstance() {
        return Mappers.getMapper(ItemMapper.class);
    }

}
