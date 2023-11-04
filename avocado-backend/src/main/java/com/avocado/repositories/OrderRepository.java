package com.avocado.repositories;

import com.avocado.entities.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends BaseRepository<Order, Long> {

    @Query("SELECT SUM(od.quantity * od.unitPrice) FROM OrderDetail od WHERE od.order.id = :orderId")
    Double findTotalForOrder(@Param("orderId") Long orderId);

    List<Order> findAllByUser_Id(@Param("userId") Long userId);

    Page<Order> findAllByUser_Id(@Param("userId") Long userId, Pageable pageable);
}
