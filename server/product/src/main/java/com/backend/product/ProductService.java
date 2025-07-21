package com.backend.product;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductDao productDao;

    public ProductService(ProductDao productDao) {
        this.productDao = productDao;
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productDao.findAll();
    }

    // Get product by id
    public Optional<Product> getProductById(Long id) {
        return productDao.findById(id);
    }

    // Save or update a product
    public Product saveProduct(Product product) {
        return productDao.save(product);
    }

    // Delete product by id
    public void deleteProduct(Long id) {
        productDao.deleteById(id);
    }
}
