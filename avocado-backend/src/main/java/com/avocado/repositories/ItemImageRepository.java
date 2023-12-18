package com.avocado.repositories;

import com.avocado.entities.ItemImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {

    ItemImage findByItem_Id(@Param("itemId") Long itemId);

    void deleteByItem_Id(@Param("itemId") Long itemId);
}
