package com.avocado.dtos.ranking;

import com.avocado.dtos.ItemDTO;
import lombok.Data;

@Data
public class ItemRankingDTO {
    private ItemDTO item;
    private Long sales;
}
