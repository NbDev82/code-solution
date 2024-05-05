package com.university.codesolution.discuss.controller;

import com.university.codesolution.comment.dto.BlogCommentDTO;
import com.university.codesolution.comment.mapper.BlogCommentMapper;
import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.discuss.mapper.DiscussMapper;
import com.university.codesolution.discuss.response.DiscussListResponse;
import com.university.codesolution.discuss.service.DiscussService;
import com.university.codesolution.discuss.service.DiscussServiceImpl;
import com.university.codesolution.discuss.service.FileService;

import lombok.AllArgsConstructor;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class DiscussController {
    private DiscussService discussService;
    private FileService fileService;
    private BlogCommentMapper blogCommentMapper;

    private DiscussMapper discussMapper;

    @PostMapping("/user/{userId}/category/{categoryId}/posts")
    public ResponseEntity<DiscussDTO> createDiscuss(
            @RequestBody DiscussDTO discussDTO,
            @PathVariable Long userId,
            @PathVariable Integer categoryId
    )
    {
        DiscussDTO createDiscuss = discussService.createDiscuss(discussDTO, userId, categoryId);
        return new ResponseEntity<DiscussDTO>(createDiscuss, HttpStatus.CREATED);
    }
    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<List<DiscussDTO>> getDiscussByUser(@PathVariable Long userId) {
        List<DiscussDTO> discussDTOS = this.discussService.getDiscussesByUser(userId);
        return new ResponseEntity<List<DiscussDTO>>(discussDTOS,HttpStatus.OK);
    }
    @GetMapping("/category/{categoryId}/posts")
    public ResponseEntity<List<DiscussDTO>> getDiscussesByCategory(@PathVariable Integer categoryId) {
        List<DiscussDTO> discussDTOS =discussService.getDiscussesByCategory(categoryId);
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
        DiscussDTO discussDTO = this.discussService.getDiscussById(discussId);
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
        DiscussDTO discussDTO = this.discussService.updateDiscuss(fileName, discussId);
    return new ResponseEntity<DiscussDTO>(discussDTO,HttpStatus.OK);

    }
    @GetMapping(value = "/post/image/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable String imageName) throws MalformedURLException {
        try{
            java.nio.file.Path imagePath = Paths.get("uploads/"+imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            }  else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("uploads/notfound.jpeg").toUri()));
            //return ResponseEntity.notFound().build();
            }
        }  catch (Exception e) {
        return ResponseEntity.notFound().build();
        }

    }
    @PutMapping("/posts/{discussId}")
    public ResponseEntity<DiscussDTO> updateDiscuss(
            @RequestBody DiscussDTO discussDTO,
            @PathVariable Long discussId
    )
    {
        DiscussDTO updatedDiscuss = discussService.updateDiscuss(discussDTO, discussId);
        return new ResponseEntity<DiscussDTO>(updatedDiscuss, HttpStatus.OK);
    }




}
