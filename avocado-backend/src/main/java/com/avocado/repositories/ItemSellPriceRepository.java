package com.avocado.repositories;

import com.avocado.entities.ItemSellPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemSellPriceRepository extends JpaRepository<ItemSellPrice, Long> {

    @Query("SELECT i.sellPrice FROM ItemSellPrice i WHERE i.item.id = :itemId ORDER BY i.sellPriceDate DESC LIMIT 1")
    Double findLastSellPriceByItemId(@Param("itemId") Long itemId);

    void deleteAllByItem_Id(@Param("itemId") Long itemId);
}
