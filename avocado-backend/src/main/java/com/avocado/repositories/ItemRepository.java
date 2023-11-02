package com.avocado.repositories;

import com.avocado.entities.Item;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends BaseRepository<Item, Long> {
}
