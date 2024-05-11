package com.university.codesolution.discuss.service;

import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.login.entity.User;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
public interface DiscussService {
    DiscussDTO createDiscuss(DiscussDTO discussDTO, Long userId, Integer categoryId);
    DiscussDTO updateDiscuss(String fileName, Long discussId);
    DiscussDTO updateDiscuss(DiscussDTO discussDTO, Long discussId);

    void deleteDiscuss(Long discussId);
    List<DiscussDTO> getAllDiscuss(Integer pageNumber, Integer pageSize) ;
    DiscussDTO getDiscussById(Long discussId);
    List<DiscussDTO> getDiscussesByCategory(Integer categoryId) ;
    List<DiscussDTO> getDiscussesByUser(Long userId);
    List<DiscussDTO> searchDiscusses(String keyword);
}
