package com.codinghub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codinghub.model.MenuItem;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategory(String category);
}

