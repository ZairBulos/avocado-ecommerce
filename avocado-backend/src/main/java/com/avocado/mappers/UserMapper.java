package com.avocado.mappers;

import com.avocado.dtos.UserDTO;
import com.avocado.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper extends BaseMapper<User, UserDTO> {

    static UserMapper getInstance() {
        return Mappers.getMapper(UserMapper.class);
    }

    @Override
    @Mapping(target = "source.password", ignore = true)
    UserDTO toDTO(User source);
}
