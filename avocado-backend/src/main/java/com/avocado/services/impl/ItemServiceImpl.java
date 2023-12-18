package com.avocado.services.impl;

import com.avocado.dtos.item.ItemDTO;
import com.avocado.dtos.item.ItemRequestDTO;
import com.avocado.dtos.item.ItemSimpleDTO;
import com.avocado.dtos.ranking.ItemRankingDTO;
import com.avocado.entities.*;
import com.avocado.mappers.ItemAttributesMapper;
import com.avocado.mappers.ItemMapper;
import com.avocado.repositories.*;
import com.avocado.services.ItemService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemAttributesRepository itemAttributesRepository;

    @Autowired
    private ItemImageRepository itemImageRepository;

    @Autowired
    private ItemSellPriceRepository itemSellPriceRepository;

    @Autowired
    private ItemStockRepository itemStockRepository;

    @Autowired
    private EntityManager entityManager;

    private final ItemMapper itemMapper = ItemMapper.getInstance();

    private final ItemAttributesMapper itemAttributesMapper = ItemAttributesMapper.getInstance();

    @Override
    public List<ItemDTO> findAll() throws Exception {
        try {
            List<Item> items = itemRepository.findAll();
            List<ItemDTO> itemDTOs = new ArrayList<>();

            for (Item item : items) {
                ItemDTO dto = itemMapper.toDTO(item);

                ItemImage image = itemImageRepository.findByItem_Id(item.getId());
                Integer currentStock = itemStockRepository.findCurrentStockByItemId(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());
                ItemAttributes attributes = itemAttributesRepository.findByItem_Id(item.getId());

                dto.setImage(image.getImage());
                dto.setSellPrice(sellPrice);
                dto.setCurrentStock(currentStock);
                dto.setAttributes(itemAttributesMapper.toDTO(attributes));

                itemDTOs.add(dto);
            }

            return itemDTOs;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<ItemSimpleDTO> findAllUnlocked() throws Exception {
        try {
            List<Item> items = itemRepository.findAllByBlockedFalse();
            List<ItemSimpleDTO> itemSimpleDTOs = new ArrayList<>();

            for (Item item : items) {
                ItemSimpleDTO dto = itemMapper.toSimpleDTO(item);

                ItemImage image = itemImageRepository.findByItem_Id(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());

                dto.setImage(image.getImage());
                dto.setSellPrice(sellPrice);

                itemSimpleDTOs.add(dto);
            }

            return itemSimpleDTOs;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<ItemRankingDTO> findTop5SellingItems() throws Exception {
        try {
            TypedQuery<Object[]> query = entityManager.createQuery(
                    "SELECT i, SUM(od.quantity) as totalSales " +
                            "FROM Item i " +
                            "LEFT JOIN OrderDetail od ON i.id = od.item.id " +
                            "GROUP BY i " +
                            "HAVING SUM(od.quantity) > 0 " +
                            "ORDER BY totalSales DESC",
                    Object[].class
            );
            query.setMaxResults(5);
            List<Object[]> results = query.getResultList();
            List<ItemRankingDTO> dtos = new ArrayList<>();

            for (Object[] result : results) {
                Item item = (Item) result[0];
                Long sales = (Long) result[1];

                ItemRankingDTO dto = new ItemRankingDTO();
                dto.setItem(itemMapper.toDTO(item));
                dto.setSales(sales);

                dtos.add(dto);
            }

            return dtos;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public ItemDTO findById(Long id) throws Exception {
        try {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));
            ItemDTO itemDTO = itemMapper.toDTO(item);

            ItemImage image = itemImageRepository.findByItem_Id(id);
            Integer currentStock = itemStockRepository.findCurrentStockByItemId(id);
            Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(id);
            ItemAttributes attributes = itemAttributesRepository.findByItem_Id(id);

            itemDTO.setImage(image.getImage());
            itemDTO.setSellPrice(sellPrice);
            itemDTO.setCurrentStock(currentStock);
            itemDTO.setAttributes(itemAttributesMapper.toDTO(attributes));

            return itemDTO;
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public ItemDTO save(ItemRequestDTO dto) throws Exception {
        try {
            Item item = itemMapper.toEntity(dto);
            item.setBlocked(false);

            item = itemRepository.save(item);

            // Image
            ItemImage itemImage = new ItemImage(dto.getImage(), item);

            itemImageRepository.save(itemImage);

            // Attributes
            ItemAttributes itemAttributes = new ItemAttributes(dto.getShape(), dto.getTaste(), dto.getHardiness(), item);

            itemAttributesRepository.save(itemAttributes);

            // SellPrice
            ItemSellPrice itemSellPrice = new ItemSellPrice();
            itemSellPrice.setSellPrice(dto.getSellPrice());
            itemSellPrice.setItem(item);

            itemSellPriceRepository.save(itemSellPrice);

            // CurrentStock
            ItemStock itemStock = new ItemStock();
            itemStock.setCurrentStock(dto.getCurrentStock());
            itemStock.setItem(item);

            itemStockRepository.save(itemStock);

            return findById(item.getId());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public ItemDTO update(Long id, ItemRequestDTO dto) throws Exception {
        try {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            // Item
            item.setName(dto.getName());
            item.setDescription(dto.getDescription());

            itemRepository.save(item);

            // Image
            ItemImage itemImage = itemImageRepository.findByItem_Id(id);
            if (!itemImage.getImage().equals(dto.getImage())) {
                itemImage.setImage(dto.getImage());

                itemImageRepository.save(itemImage);
            }

            // Attributes
            ItemAttributes itemAttributes = itemAttributesRepository.findByItem_Id(id);
            itemAttributes.setShape(dto.getShape());
            itemAttributes.setTaste(dto.getTaste());
            itemAttributes.setHardiness(dto.getHardiness());

            itemAttributesRepository.save(itemAttributes);

            // SellPrice
            Double latestSellPrice = itemSellPriceRepository.findLastSellPriceByItemId(id);
            if (latestSellPrice == null || !latestSellPrice.equals(dto.getSellPrice())) {
                ItemSellPrice itemSellPrice = new ItemSellPrice();
                itemSellPrice.setSellPrice(dto.getSellPrice());
                itemSellPrice.setItem(item);

                itemSellPriceRepository.save(itemSellPrice);
            }

            // CurrentStock
            Integer latestCurrentStock = itemStockRepository.findCurrentStockByItemId(id);
            if (latestCurrentStock == null || !latestCurrentStock.equals(dto.getCurrentStock())) {
                ItemStock itemStock = new ItemStock();
                itemStock.setCurrentStock(dto.getCurrentStock());
                itemStock.setItem(item);

                itemStockRepository.save(itemStock);
            }

            return findById(item.getId());
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public ItemDTO updateStock(Long id, Integer stock) throws Exception {
        try {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            // CurrentStock
            Integer latestCurrentStock = itemStockRepository.findCurrentStockByItemId(id);
            Integer currentStock = latestCurrentStock + stock;

            ItemStock itemStock = new ItemStock();
            itemStock.setCurrentStock(currentStock);
            itemStock.setItem(item);

            itemStockRepository.save(itemStock);

            return findById(id);
        } catch (
                EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (
                Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public ItemDTO lockUnlock(Long id) throws Exception {
        try {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            item.setBlocked(!item.getBlocked());

            return findById(item.getId());
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void delete(Long id) throws Exception {
        try {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            // Image
            itemImageRepository.deleteByItem_Id(id);

            // Attributes
            itemAttributesRepository.deleteByItem_Id(id);

            // SellPrice History
            itemSellPriceRepository.deleteAllByItem_Id(id);

            // Stock History
            itemStockRepository.deleteAllByItem_Id(id);

            // Item
            itemRepository.deleteById(id);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
