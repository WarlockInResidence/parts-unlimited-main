package org.asi.partsunlimited;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer model;

    private Integer quantity;

    private String color;

    public Product(String name, Integer model, Integer quantity, String color) {
        this.name = name;
        this.model = model;
        this.quantity = quantity;
        this.color = color;

    }

}
