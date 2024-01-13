package com.university.codesolution.user;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger log = LogManager.getLogger(UserController.class);

    @GetMapping("/public-string")
    public String publicApi() {
        log.info("get public string");
        return "Public api";
    }

    @GetMapping("/private-string")
    public String privateApi() {
        log.info("get private string");
        return "Private api";
    }
}
