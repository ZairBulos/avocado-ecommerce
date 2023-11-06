package com.avocado.repositories;

import com.avocado.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {

    @Query("SELECT COUNT(u) FROM User u " +
            "WHERE u.role = 'CLIENT' " +
            "AND YEAR(u.createdAt) = :year " +
            "AND MONTH(u.createdAt) = :month"
    )
    Long countUsersRegisteredInMonth(@Param("year") Integer year, @Param("month") Integer month);

    @Query("SELECT COUNT(u) FROM User u " +
            "WHERE u.role = 'CLIENT' " +
            "AND u.createdAt BETWEEN :startDate AND :endDate"
    )
    Long countUsersRegisteredBetweenDates(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
