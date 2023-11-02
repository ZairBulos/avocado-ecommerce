package com.avocado.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "item")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "id_item"))
public class Item extends Base {

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    @Basic
    @Column(name = "blocked", nullable = false)
    @Convert(converter = org.hibernate.type.YesNoConverter.class)
    private Boolean blocked;

    @NotBlank
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
}
