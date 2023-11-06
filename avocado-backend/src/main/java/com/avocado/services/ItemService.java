package com.avocado.services;

import com.avocado.dtos.ItemDTO;
import com.avocado.dtos.ranking.ItemRankingDTO;
import com.avocado.entities.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ItemService extends BaseService<Item, ItemDTO, Long> {
    Page<ItemDTO> findAllPaged(Pageable pageable) throws Exception;
    List<ItemDTO> findAllUnlocked() throws Exception;
    Page<ItemDTO> findAllUnlocked(Pageable pageable) throws Exception;
    List<ItemRankingDTO> findTop5SellingItems() throws Exception;
    Item blockUnblock(Long id) throws Exception;
}
