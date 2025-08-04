package com.codinghub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codinghub.model.ContactMessage;
import com.codinghub.Service.ContactMessageService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactMessageService contactMessageService;

    @PostMapping("/submit")
    public ContactMessage submitMessage(@RequestBody ContactMessage message) {
        return contactMessageService.saveMessage(message);
    }
}
