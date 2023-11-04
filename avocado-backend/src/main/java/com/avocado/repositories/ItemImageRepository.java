package com.avocado.repositories;

import com.avocado.entities.ItemImage;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemImageRepository extends BaseRepository<ItemImage, Long> {

    ItemImage findByItem_Id(@Param("itemId") Long itemId);

    void deleteByItem_Id(@Param("itemId") Long itemId);
}
