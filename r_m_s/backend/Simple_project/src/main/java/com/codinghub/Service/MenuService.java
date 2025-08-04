package com.codinghub.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codinghub.model.MenuItem;
import com.codinghub.repository.MenuItemRepository;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepository menuRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuRepository.findAll();
    }

    public Optional<MenuItem> getMenuItemById(Long id) {
        return menuRepository.findById(id);
    }

    public MenuItem addMenuItem(MenuItem item) {
        return menuRepository.save(item);
    }

    public void deleteMenuItem(Long id) {
        menuRepository.deleteById(id);
    }

    public List<MenuItem> getMenuItemsByCategory(String category) {
        return menuRepository.findByCategory(category);
    }

    public MenuItem updateMenuItem(Long id, MenuItem updatedItem) {
        return menuRepository.findById(id).map(item -> {
            item.setName(updatedItem.getName());
            item.setCategory(updatedItem.getCategory());
            item.setPrice(updatedItem.getPrice());
            item.setImageUrl(updatedItem.getImageUrl());
            return menuRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("Menu item not found with id " + id));
    }

    // ✅ Correct Pagination logic
    public Page<MenuItem> getPaginatedMenuItems(Pageable pageable) {
        return menuRepository.findAll(pageable);
    }
}
