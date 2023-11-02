package com.avocado.repositories;

import com.avocado.entities.Order;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends BaseRepository<Order, Long> {
}
