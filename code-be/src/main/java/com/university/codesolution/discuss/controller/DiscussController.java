package com.university.codesolution.discuss.controller;

import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.service.DiscussService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class DiscussController {
    private DiscussService discussService;
    @PostMapping("/users/{userId}/category/{categoryId}/posts")
    public ResponseEntity<DiscussDTO> createDiscuss(
            @RequestBody DiscussDTO discussDTO,
            @PathVariable Long userId,
            @PathVariable Integer categoryId
    )
    {
        DiscussDTO createDiscuss = this.discussService.createDiscuss(discussDTO, userId, categoryId);
        return new ResponseEntity<DiscussDTO>(createDiscuss, HttpStatus.CREATED);
    }
    @GetMapping("/users/{userId}/posts")
    public ResponseEntity<List<DiscussDTO>> getDiscussByUser(@PathVariable Long userId) {
        List<DiscussDTO> discussDTOS = this.discussService.getDiscussesByUser(userId);
        return new ResponseEntity<List<DiscussDTO>>(discussDTOS,HttpStatus.OK);
    }
    @GetMapping("/category/{categoryId}/posts")
    public ResponseEntity<List<DiscussDTO>> getDiscussesByCategory(@PathVariable Integer categoryId) {
        List<DiscussDTO> discussDTOS = this.discussService.getDiscussesByCategory(categoryId);
        return new ResponseEntity<List<DiscussDTO>>(discussDTOS,HttpStatus.OK);
    }
    @GetMapping("/posts")
    public ResponseEntity<List<DiscussDTO>> getAllDiscusses(){
        List<DiscussDTO> discussDTOS = this.discussService.getAllDiscuss();
        return new ResponseEntity<List<DiscussDTO>>(discussDTOS,HttpStatus.OK);
    }

}
