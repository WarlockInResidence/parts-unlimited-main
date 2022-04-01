package org.asi.partsunlimited.services;

import lombok.AllArgsConstructor;
import org.asi.partsunlimited.Product;
import org.asi.partsunlimited.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    ProductRepository productRepository;

    public Product addProduct(String product) {
        return productRepository.save(new Product(product, 0));
    }

    public Product addProduct(Product product) {
        return productRepository.save( product );
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> find(Long id) {
        return productRepository.findById(id);
    }

    public void updateProduct(Product product) {
        productRepository.save(product);
    }
}
