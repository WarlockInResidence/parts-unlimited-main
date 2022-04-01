package org.asi.partsunlimited;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatchProduct {

    private long id;

    private String name;

    private Integer quantity;


    public PatchProduct(String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;

    }

}
