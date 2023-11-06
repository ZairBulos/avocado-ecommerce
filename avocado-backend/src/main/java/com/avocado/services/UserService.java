package com.avocado.services;

import com.avocado.dtos.UserDTO;
import com.avocado.dtos.ranking.UserRankingDTO;
import com.avocado.entities.User;

import java.time.LocalDate;
import java.util.List;

public interface UserService extends BaseService<User, UserDTO, Long> {
    Long countUsersRegisteredInMonth(Integer year, Integer month) throws Exception;
    Long countUsersRegisteredBetweenDates(LocalDate startDate, LocalDate endDate) throws Exception;
    List<UserRankingDTO> findTop5UsersWithMostOrders() throws Exception;
}
