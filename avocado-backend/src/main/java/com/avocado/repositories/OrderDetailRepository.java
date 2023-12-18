package com.avocado.repositories;

import com.avocado.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    List<OrderDetail> findAllByOrder_Id(@Param("orderId") Long orderId);

    void deleteAllByOrderId(@Param("orderId") Long orderId);
}
