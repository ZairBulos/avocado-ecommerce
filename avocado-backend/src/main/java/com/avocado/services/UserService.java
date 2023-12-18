package com.avocado.services;

import com.avocado.dtos.auth.AuthDTO;
import com.avocado.dtos.ranking.UserRankingDTO;
import com.avocado.entities.User;

import java.time.LocalDate;
import java.util.List;

public interface UserService {
    List<UserRankingDTO> findTop5UsersWithMostOrders() throws Exception;
    Long countUsersRegisteredInMonth(Integer year, Integer month) throws Exception;
    Long countUsersRegisteredBetweenDates(LocalDate startDate, LocalDate endDate) throws Exception;
    User save(AuthDTO dto) throws Exception;
}
