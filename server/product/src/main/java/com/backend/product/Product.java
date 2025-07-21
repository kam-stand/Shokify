package com.backend.product;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    private String name;
    private String size;
    private String category;
    private int price;
    private String color;
    private String sku;
    @Lob
    private String description;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
}
