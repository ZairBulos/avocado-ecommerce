package com.avocado.services;

import com.avocado.dtos.ItemDTO;
import com.avocado.entities.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ItemService extends BaseService<Item, ItemDTO, Long> {
    List<ItemDTO> findAllUnlocked() throws Exception;
    Page<ItemDTO> findAllUnlocked(Pageable pageable) throws Exception;
    Item blockUnblock(Long id) throws Exception;
}
