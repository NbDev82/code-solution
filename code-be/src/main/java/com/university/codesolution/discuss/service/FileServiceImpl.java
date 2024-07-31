package com.university.codesolution.discuss.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{
    private static String UPLOADS_FOLDER = "uploads";

//    @Override
//    public String uploadImage(String path, MultipartFile file) throws IOException{
//        String name = file.getOriginalFilename();
//        //abc.png
//
//
//        //random name generated file
//        String randomID = UUID.randomUUID().toString();
//        String fileName1 = randomID.concat(name.substring(name.lastIndexOf(".")));
//        String filePath = path + File.separator + fileName1;
//        //create folder if not created
//        File director = new File(path);
//        if(!director.exists()){
//            director.mkdir();
//        }

        //file copy
//        Files.copy(file.getInputStream(), Paths.get(filePath));
//        return fileName1;
//
//    }
    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }
    @Override
    public String storeFile(MultipartFile file) throws IOException {
        if (!isImageFile(file) || file.getOriginalFilename() == null) {
            throw new IOException("Invalid image format");
        }
        String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        // Thêm UUID vào trước tên file để đảm bảo tên file là duy nhất
        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;
        // Đường dẫn đến thư mục mà bạn muốn lưu file
//        java.nio.file.Path uploadDir = Paths.get(UPLOADS_FOLDER);
        java.nio.file.Path uploadDir = Paths.get(UPLOADS_FOLDER);
        // Kiểm tra và tạo thư mục nếu nó không tồn tại
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        // Đường dẫn đầy đủ đến file
        java.nio.file.Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
        // Sao chép file vào thư mục đích
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }



}