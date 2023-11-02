package com.avocado.entities;

import com.avocado.enums.ItemShape;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "item_attributes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "id_item_attributes"))
public class ItemAttributes extends Base {

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "shape", nullable = false)
    private ItemShape shape;

    @NotBlank
    @Column(name = "taste", nullable = false)
    private String taste;

    @NotNull
    @Column(name = "hardiness", nullable = false)
    private Integer hardiness;

    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id")
    private Item item;
}
