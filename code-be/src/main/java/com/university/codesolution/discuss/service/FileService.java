package com.university.codesolution.discuss.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
public interface FileService {
//    String uploadImage(MultipartFile file) throws IOException;
//    Resource getResource(String fileName) throws FileNotFoundException;
    String storeFile(MultipartFile file) throws IOException;

}
