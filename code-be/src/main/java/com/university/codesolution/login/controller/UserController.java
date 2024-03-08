package com.university.codesolution.login.controller;

import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.dto.UserLoginDTO;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.response.RegisterResponse;
import com.university.codesolution.login.service.TokenService;
import com.university.codesolution.login.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private static final Logger log = LogManager.getLogger(UserController.class);
    private final UserService userService;
    private final TokenService tokenService;
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
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> createUser(
           @Valid @RequestBody UserDTO userDTO
    ) {
     RegisterResponse registerResponse=new RegisterResponse();
     try{
         UserDTO user = userService.createUser(userDTO);
         registerResponse.setMessage("Register successfully");
         registerResponse.setUser(user);
         return ResponseEntity.ok(registerResponse);
     } catch (Exception e) {
       registerResponse.setMessage(e.getMessage());
       return ResponseEntity.badRequest().body(registerResponse);
     }

    }
    @PostMapping("/login")
    public ResponseEntity<String> login(
             @RequestBody UserLoginDTO userLoginDTO, HttpServletRequest request
    ) {
      try{
          String token = userService.login(
                  userLoginDTO.getPhoneNumber(),
                  userLoginDTO.getPassword(),
                  userLoginDTO.getRole()
          );
          String userAgent = request.getHeader("User-Agent");
          User user = userService.getUserDetailsFromToken(token);
          tokenService.addToken(user,token);
          return ResponseEntity.ok(token);
      }catch (Exception e){
          return ResponseEntity.badRequest().body("Exception");
      }
    }
}
