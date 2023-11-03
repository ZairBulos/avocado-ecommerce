package com.avocado.repositories;

import com.avocado.entities.ItemImage;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemImageRepository extends BaseRepository<ItemImage, Long> {

    @Query("SELECT i.image FROM ItemImage i WHERE i.item.id = :itemId")
    List<String> findAllImagesByItemId(@Param("itemId") Long itemId);
}
