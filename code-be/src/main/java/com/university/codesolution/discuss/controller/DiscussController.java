package com.university.codesolution.discuss.controller;

import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.discuss.mapper.DiscussMapper;
import com.university.codesolution.discuss.mapper.DiscussMapperImpl;
import com.university.codesolution.discuss.service.DiscussService;
import com.university.codesolution.discuss.service.DiscussServiceImpl;
import com.university.codesolution.discuss.service.FileService;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class DiscussController {
    private DiscussService discussService;
    private FileService fileService;

    private DiscussMapper discussMapper;

    @PostMapping("/user/{userId}/category/{categoryId}/posts")
    public ResponseEntity<DiscussDTO> createDiscuss(
            @RequestBody DiscussDTO discussDTO,
            @PathVariable Long userId,
            @PathVariable Integer categoryId
    )
    {
        DiscussDTO createDiscuss = this.discussService.createDiscuss(discussDTO, userId, categoryId);
        return new ResponseEntity<DiscussDTO>(createDiscuss, HttpStatus.CREATED);
    }
    @GetMapping("/user/{userId}/posts")
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
    public ResponseEntity<List<DiscussDTO>> getAllDiscusses(
            @RequestParam(value = "pageNumber", defaultValue = "10", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "1",required = false) Integer pageSize
    ){
        List<DiscussDTO> discussDTOS = this.discussService.getAllDiscuss(pageNumber, pageSize);
        return new ResponseEntity<List<DiscussDTO>>(discussDTOS,HttpStatus.OK);
    }
    @GetMapping("/posts/{discussId}")
    public ResponseEntity<DiscussDTO> getDiscussById(@PathVariable Long discussId){
        Discuss discuss = this.discussService.getDiscussById(discussId);
        DiscussDTO discussDTO = this.discussMapper.toDto(discuss);

        return new ResponseEntity<DiscussDTO>(discussDTO,HttpStatus.OK);
    }
    @GetMapping("/posts/search/{keywords}")
    public ResponseEntity<List<DiscussDTO>> searchDiscussByTitle(
            @PathVariable("keywords") String keywords
    ){
        List<DiscussDTO> result = this.discussService.searchDiscusses(keywords);
        return new ResponseEntity<List<DiscussDTO>>(result,HttpStatus.OK);
    }
    @PostMapping("/post/image/upload/{discussId}")
    public ResponseEntity<DiscussDTO> uploadPostImage(
            @RequestParam("image") MultipartFile image,
            @PathVariable Long discussId) throws IOException {
        String fileName = this.fileService.storeFile(image);
        DiscussDTO discussDTO = this.discussMapper.toDto(this.discussService.getDiscussById(discussId));
        discussDTO.setImage(fileName);
        DiscussDTO updateDiscussDTO = this.discussMapper.toDto(this.discussService.updateDiscuss(discussDTO, discussId));
        return new ResponseEntity<DiscussDTO>(updateDiscussDTO,HttpStatus.OK);

    }


}
