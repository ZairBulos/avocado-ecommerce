package com.avocado.mappers;

import com.avocado.dtos.auth.AuthDTO;
import com.avocado.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UserMapper {

    static UserMapper getInstance() {
        return Mappers.getMapper(UserMapper.class);
    }


    @Named("toEntity")
    User toEntity(AuthDTO source);
}
