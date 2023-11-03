package com.avocado.repositories;

import com.avocado.entities.ItemStock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemStockRepository extends BaseRepository<ItemStock, Long> {

    @Query("SELECT i.currentStock FROM ItemStock i WHERE i.item.id = :itemId ORDER BY i.currentStockDate DESC LIMIT 1")
    Integer findCurrentStockByItemId(@Param("itemId") Long itemId);
}
