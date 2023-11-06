package com.avocado.repositories;

import com.avocado.entities.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends BaseRepository<Item, Long> {

    List<Item> findAllByBlockedFalse();

    Page<Item> findAllByBlockedFalse(Pageable pageable);
}
