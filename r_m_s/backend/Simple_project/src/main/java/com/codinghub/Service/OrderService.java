package com.codinghub.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codinghub.model.Order;
import com.codinghub.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    public Order placeOrder(Order order) {
        order.setOrderTime(LocalDateTime.now());
        return orderRepo.save(order); // ✅ Save with timestamp
    }

    public List<Order> getOrdersByUser(String email) {
        return orderRepo.findByUserEmail(email); // ✅ Corrected return
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll(); // ✅ Return all orders
    }
}
