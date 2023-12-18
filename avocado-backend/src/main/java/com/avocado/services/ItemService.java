package com.avocado.services;

import com.avocado.dtos.item.ItemDTO;
import com.avocado.dtos.item.ItemRequestDTO;
import com.avocado.dtos.item.ItemSimpleDTO;
import com.avocado.dtos.ranking.ItemRankingDTO;

import java.util.List;

public interface ItemService {
    List<ItemDTO> findAll() throws Exception;
    List<ItemSimpleDTO> findAllUnlocked() throws Exception;
    List<ItemRankingDTO> findTop5SellingItems() throws Exception;
    ItemDTO findById(Long id) throws Exception;
    ItemDTO save(ItemRequestDTO dto) throws Exception;
    ItemDTO update(Long id, ItemRequestDTO dto) throws Exception;
    ItemDTO updateStock(Long id, Integer stock) throws Exception;
    ItemDTO lockUnlock(Long id) throws Exception;
    void delete(Long id) throws Exception;
}
