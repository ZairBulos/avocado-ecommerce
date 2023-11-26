package com.avocado.services.impl;

import com.avocado.dtos.ItemDTO;
import com.avocado.dtos.ranking.ItemRankingDTO;
import com.avocado.entities.*;
import com.avocado.mappers.BaseMapper;
import com.avocado.mappers.ItemAttributesMapper;
import com.avocado.mappers.ItemMapper;
import com.avocado.repositories.*;
import com.avocado.services.ItemService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
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

    @Autowired
    private ItemAttributesRepository itemAttributesRepository;

    @Autowired
    private EntityManager entityManager;

    private final ItemMapper itemMapper = ItemMapper.getInstance();

    private final ItemAttributesMapper itemAttributesMapper = ItemAttributesMapper.getInstance();

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

                ItemImage image = itemImageRepository.findByItem_Id(item.getId());
                Integer currentStock = itemStockRepository.findCurrentStockByItemId(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());
                ItemAttributes attributes = itemAttributesRepository.findByItem_Id(item.getId());

                dto.setImage(image.getImage());
                dto.setSellPrice(sellPrice);
                dto.setCurrentStock(currentStock);
                dto.setAttributes(itemAttributesMapper.toDTO(attributes));

                dtos.add(dto);
            }

            return dtos;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Page<ItemDTO> findAllPaged(Pageable pageable) throws Exception {
        try {
            Page<Item> pageables = itemRepository.findAll(pageable);
            List<ItemDTO> dtos = new ArrayList<>();

            for (Item item : pageables) {
                ItemDTO dto = itemMapper.toDTO(item);

                ItemImage image = itemImageRepository.findByItem_Id(item.getId());
                Integer currentStock = itemStockRepository.findCurrentStockByItemId(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());
                ItemAttributes attributes = itemAttributesRepository.findByItem_Id(item.getId());

                dto.setImage(image.getImage());
                dto.setSellPrice(sellPrice);
                dto.setCurrentStock(currentStock);
                dto.setAttributes(itemAttributesMapper.toDTO(attributes));

                dtos.add(dto);
            }

            return new PageImpl<>(dtos, pageable, pageables.getTotalElements());
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

                ItemImage image = itemImageRepository.findByItem_Id(item.getId());
                Integer currentStock = itemStockRepository.findCurrentStockByItemId(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());
                ItemAttributes attributes = itemAttributesRepository.findByItem_Id(item.getId());

                dto.setImage(image.getImage());
                dto.setSellPrice(sellPrice);
                dto.setCurrentStock(currentStock);
                dto.setAttributes(itemAttributesMapper.toDTO(attributes));

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

                ItemImage image = itemImageRepository.findByItem_Id(item.getId());
                Integer currentStock = itemStockRepository.findCurrentStockByItemId(item.getId());
                Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(item.getId());
                ItemAttributes attributes = itemAttributesRepository.findByItem_Id(item.getId());

                dto.setImage(image.getImage());
                dto.setSellPrice(sellPrice);
                dto.setCurrentStock(currentStock);
                dto.setAttributes(itemAttributesMapper.toDTO(attributes));

                dtos.add(dto);
            }

            return new PageImpl<>(dtos, pageable, pageables.getTotalElements());
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
            ItemDTO dto = itemMapper.toDTO(item);

            ItemImage image = itemImageRepository.findByItem_Id(id);
            Integer currentStock = itemStockRepository.findCurrentStockByItemId(id);
            Double sellPrice = itemSellPriceRepository.findLastSellPriceByItemId(id);
            ItemAttributes attributes = itemAttributesRepository.findByItem_Id(id);

            dto.setImage(image.getImage());
            dto.setSellPrice(sellPrice);
            dto.setCurrentStock(currentStock);
            dto.setAttributes(itemAttributesMapper.toDTO(attributes));

            return dto;
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Item save(ItemDTO dto) throws Exception {
        try {
            Item item = itemRepository.save(itemMapper.toEntity(dto));

            // Image
            ItemImage itemImage = new ItemImage();
            itemImage.setImage(dto.getImage());
            itemImage.setItem(item);

            // Attributes
            ItemAttributes itemAttributes = itemAttributesMapper.toEntity(dto.getAttributes());
            itemAttributes.setItem(item);
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

            return item;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Item update(Long id, ItemDTO dto) throws Exception {
        try {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            // Item
            item.setName(dto.getName());
            item.setBlocked(dto.getBlocked());
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
            itemAttributes.setShape(dto.getAttributes().getShape());
            itemAttributes.setTaste(dto.getAttributes().getTaste());
            itemAttributes.setHardiness(dto.getAttributes().getHardiness());
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

            return item;
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Item blockUnblock(Long id) throws Exception {
        try {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            item.setBlocked(!item.getBlocked());

            return itemRepository.save(item);
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
            Optional<Item> optional = itemRepository.findById(id);

            if (optional.isEmpty()) {
                throw new EntityNotFoundException("Item not found with id: " + id);
            }

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
