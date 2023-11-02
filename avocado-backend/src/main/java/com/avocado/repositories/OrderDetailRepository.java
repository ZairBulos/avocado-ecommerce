package com.avocado.repositories;

import com.avocado.entities.OrderDetail;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends BaseRepository<OrderDetail, Long> {
}
