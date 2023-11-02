package com.avocado.repositories;

import com.avocado.entities.ItemStock;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemStockRepository extends BaseRepository<ItemStock, Long> {
}
