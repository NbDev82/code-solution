package com.university.codesolution.discuss.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import jakarta.annotation.Resource;
import org.springframework.web.multipart.MultipartFile;
public interface FileService {
//    String uploadImage(MultipartFile file) throws IOException;
//    Resource getResource(String fileName) throws FileNotFoundException;
    String storeFile(MultipartFile file) throws IOException;

}
