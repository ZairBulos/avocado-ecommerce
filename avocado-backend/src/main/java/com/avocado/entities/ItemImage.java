package com.avocado.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "item_image")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "id_item_image"))
public class ItemImage extends Base {

    @NotBlank
    @Column(name = "image", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String image;

    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id")
    private Item item;
}
