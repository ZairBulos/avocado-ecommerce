package com.avocado.dtos.ranking;

import com.avocado.dtos.item.ItemDTO;
import lombok.Data;

@Data
public class ItemRankingDTO {
    private ItemDTO item;
    private Long sales;
}
