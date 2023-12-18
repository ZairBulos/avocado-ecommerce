package com.avocado.repositories;

import com.avocado.entities.ItemAttributes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemAttributesRepository extends JpaRepository<ItemAttributes, Long> {

    ItemAttributes findByItem_Id(@Param("itemId") Long itemId);

    void deleteByItem_Id(@Param("itemId") Long itemId);
}
