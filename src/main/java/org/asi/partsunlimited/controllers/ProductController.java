package org.asi.partsunlimited.controllers;

import org.asi.partsunlimited.PatchProduct;
import org.asi.partsunlimited.Product;
import org.asi.partsunlimited.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class ProductController {
    private final ProductService productService;
    private Product[] productArray;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/sendorder")
    public void sendOrder(@RequestBody Product[] productOrder){
        this.productArray = productOrder;
    }

    @GetMapping("/sendorder")
    public Product[] getOrder(){
        return this.productArray;
    }

    @GetMapping("/products")
    public @ResponseBody
    List<Product> getProducts() {
        return productService.getProducts();
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        var savedProduct = productService.addProduct(product);
        URI location = createResourceLocation("/products",savedProduct.getId());
        return ResponseEntity.created(location).body(savedProduct);
    }

    private URI createResourceLocation(String path, Long resourceId) {
        return ServletUriComponentsBuilder.fromCurrentRequestUri().port("8080").path(path)
                .buildAndExpand(resourceId).toUri();
    }

    // Added new stuff below. make sure notes explain each of them

    // Make get single item by id
    // 1. in Repo -> Product findById(Product id);
    // 2. in service ->  public Optional<Product> find(Long id) { return productRepository.findById(id); }
    @GetMapping("/products/{id}")
    public Optional<Product> getById(@PathVariable Long id){
        return productService.find(id);
    }

    // Make patch
    // in service -> public void updateProduct(Product product) { productRepository.save(product); }
    @PatchMapping("/products/{id}")
    public ResponseEntity updateProduct(@PathVariable Long id, @RequestBody PatchProduct product) {
        Product patchItem = productService.find(id).orElse(null);

        if(product.getName() != null) patchItem.setName((product.getName()));
        if(product.getQuantity() != null) patchItem.setQuantity((product.getQuantity()));
        productService.updateProduct(patchItem);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/sendorder")
    public void deleteAll() {
        this.productArray = null;
        }
}
