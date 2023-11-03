package com.avocado.services.impl;

import com.avocado.dtos.ItemDTO;
import com.avocado.entities.Item;
import com.avocado.mappers.BaseMapper;
import com.avocado.mappers.ItemMapper;
import com.avocado.repositories.*;
import com.avocado.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl extends BaseServiceImpl<Item, ItemDTO, Long> implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemImageRepository itemImageRepository;

    @Autowired
    private ItemStockRepository itemStockRepository;

    @Autowired
    private ItemSellPriceRepository itemSellPriceRepository;

    private final ItemMapper itemMapper = ItemMapper.getInstance();

    public ItemServiceImpl(BaseRepository<Item, Long> baseRepository, BaseMapper<Item, ItemDTO> baseMapper) {
        super(baseRepository, baseMapper);
    }

    @Override
    public List<ItemDTO> findAll() throws Exception {
        try {
            List<Item> entities = itemRepository.findAll();
            List<ItemDTO> dtos = new ArrayList<>();

            for (Item item : entities) {
                ItemDTO dto = itemMapper.toDTO(item);

                List<String> images = itemImageRepository.findAllImagesByItemId(item.getId());
                Integer currentStock = itemStockRepository.findCurrentStockByItemId(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());

                dto.setImages(images);
                dto.setSellPrice(sellPrice);
                dto.setCurrentStock(currentStock);

                dtos.add(dto);
            }

            return dtos;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<ItemDTO> findAllUnlocked() throws Exception {
        try {
            List<Item> entities = itemRepository.findAllByBlockedFalse();
            List<ItemDTO> dtos = new ArrayList<>();

            for (Item item : entities) {
                ItemDTO dto = itemMapper.toDTO(item);

                List<String> images = itemImageRepository.findAllImagesByItemId(item.getId());
                Integer currentStock = itemStockRepository.findCurrentStockByItemId(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());

                dto.setImages(images);
                dto.setSellPrice(sellPrice);
                dto.setCurrentStock(currentStock);

                dtos.add(dto);
            }

            return dtos;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Page<ItemDTO> findAllUnlocked(Pageable pageable) throws Exception {
        try {
            Page<Item> pageables = itemRepository.findAllByBlockedFalse(pageable);
            List<ItemDTO> dtos = new ArrayList<>();

            for (Item item : pageables) {
                ItemDTO dto = itemMapper.toDTO(item);

                List<String> images = itemImageRepository.findAllImagesByItemId(item.getId());
                Integer currentStock = itemStockRepository.findCurrentStockByItemId(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());

                dto.setImages(images);
                dto.setSellPrice(sellPrice);
                dto.setCurrentStock(currentStock);

                dtos.add(dto);
            }

            return new PageImpl<>(dtos, pageable, pageables.getTotalElements());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public ItemDTO findById(Long id) throws Exception {
        try {
            Optional<Item> optional = itemRepository.findById(id);

            if (optional.isEmpty()) {
                throw new Exception("Item not found");
            }

            ItemDTO dto = itemMapper.toDTO(optional.get());

            List<String> images = itemImageRepository.findAllImagesByItemId(id);
            Integer currentStock = itemStockRepository.findCurrentStockByItemId(id);
            Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(id);

            dto.setImages(images);
            dto.setSellPrice(sellPrice);
            dto.setCurrentStock(currentStock);

            return dto;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
