package com.avocado.services.impl;

import com.avocado.dtos.auth.AuthDTO;
import com.avocado.dtos.ranking.UserRankingDTO;
import com.avocado.entities.User;
import com.avocado.enums.UserRole;
import com.avocado.mappers.UserMapper;
import com.avocado.repositories.UserRepository;
import com.avocado.services.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserMapper userMapper = UserMapper.getInstance();

    @Override
    public List<UserRankingDTO> findTop5UsersWithMostOrders() throws Exception {
        try {
            TypedQuery<Object[]> query = entityManager.createQuery(
                    "SELECT u, COUNT(o) " +
                            "FROM User u " +
                            "JOIN Order o ON u.id = o.user.id " +
                            "GROUP BY u " +
                            "HAVING COUNT(o) > 0 " +
                            "ORDER BY COUNT(o) DESC",
                    Object[].class
            );
            query.setMaxResults(5);
            List<Object[]> results = query.getResultList();
            List<UserRankingDTO> dtos = new ArrayList<>();

            for (Object[] result : results) {
                User user = (User) result[0];
                Long purchases = (Long) result[1];

                UserRankingDTO dto = new UserRankingDTO();
                dto.setUser(user.getEmail());
                dto.setPurchases(purchases.intValue());

                dtos.add(dto);
            }

            return dtos;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Long countUsersRegisteredInMonth(Integer year, Integer month) throws Exception {
        try {
            if (year == null) year = Year.now().getValue();
            if (month == null) month = MonthDay.now().getMonthValue();

            return userRepository.countUsersRegisteredInMonth(year, month);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Long countUsersRegisteredBetweenDates(LocalDate startDate, LocalDate endDate) throws Exception {
        try {
            if (startDate == null) startDate = LocalDate.now();
            if (endDate == null) endDate = LocalDate.now();

            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = endDate.atTime(23, 59, 59);

            return userRepository.countUsersRegisteredBetweenDates(startDateTime, endDateTime);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public User save(AuthDTO dto) throws Exception {
        try {
            User user = userMapper.toEntity(dto);
            user.setRole(UserRole.CLIENT);
            user.setPassword(passwordEncoder.encode(dto.getPassword()));

            return userRepository.save(user);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
