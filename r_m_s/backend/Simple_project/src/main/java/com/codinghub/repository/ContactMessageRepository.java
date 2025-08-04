package com.codinghub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codinghub.model.ContactMessage;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
