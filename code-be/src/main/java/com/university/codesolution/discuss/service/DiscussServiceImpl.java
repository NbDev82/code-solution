package com.university.codesolution.discuss.service;

import com.university.codesolution.comment.dto.BlogCommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.mapper.BlogCommentMapper;
import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.discuss.exception.ResourceNotFoundException;
import com.university.codesolution.discuss.mapper.CategoryMapper;
import com.university.codesolution.discuss.mapper.DiscussMapper;
import com.university.codesolution.discuss.repository.CategoryRepos;
import com.university.codesolution.discuss.repository.DiscussRepos;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.mapper.UserMapper;
import com.university.codesolution.login.repository.UserRepos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Data
public class DiscussServiceImpl implements DiscussService {

    private DiscussRepos discussRepos;
    private UserRepos userRepos;
    private CategoryRepos categoryRepos;
    private DiscussMapper discussMapper;

    @Autowired
    private final ModelMapper modelMapper;
    private final BlogCommentMapper blogCommentMapper;
    @Override
    public DiscussDTO createDiscuss(DiscussDTO discussDTO, Long userId, Integer categoryId) {
        User user = this.userRepos.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find User with id : "+userId));

        Category category = this.categoryRepos.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find Category with id : "+categoryId));

        Discuss discuss = this.modelMapper.map(discussDTO,Discuss.class);
        discuss.setOwner(user);
        discuss.setCategory(category);
        discuss.setStartDate(LocalDateTime.now());
        Discuss newDiscuss = this.discussRepos.save(discuss);
        return this.discussMapper.toDto(newDiscuss);

    }

    @Override
    @Transactional

    public DiscussDTO updateDiscuss(String fileName, Long discussId) {
        Discuss discuss = this.discussRepos.findById(discussId)
                .orElseThrow(()->new ResourceNotFoundException("Discuss"));
        discuss.setImage(fileName);
        Discuss updateDiscuss = this.discussRepos.save(discuss);

        return this.discussMapper.toDto(updateDiscuss);
    }
    @Override
    @Transactional

    public DiscussDTO updateDiscuss(DiscussDTO discussDTO, Long discussId) {
        Discuss discuss = this. discussRepos.findById(discussId)
                .orElseThrow(()-> new ResourceNotFoundException("Discuss"));
        discuss.setTopic(discussDTO.getTopic());
        discuss.setContent(discussDTO.getContent());
        if (discussDTO.getImage() != null) {
            discuss.setImage(discussDTO.getImage());
        }
        Discuss updatedDiscuss = this.discussRepos.save(discuss);
        return this.discussMapper.toDto(updatedDiscuss);
    }

    @Override
    @Transactional

    public void deleteDiscuss(Long discussId) {
        Discuss discuss = discussRepos.findById(discussId)
                .orElseThrow(() -> new ResourceNotFoundException("Discuss"));

        // Delete any associated data/dependencies if needed

        discussRepos.delete(discuss);
    }

    @Override
    @Transactional

    public List<DiscussDTO> getAllDiscuss(Integer pageNumber, Integer pageSize)
    {
            Pageable p = PageRequest.of(pageNumber, pageSize);
            Page<Discuss> pageDiscuss = this.discussRepos.findAll(p);
            List<Discuss> allDiscusses = pageDiscuss.getContent();
            List<DiscussDTO> discussDTOList = this.discussMapper.dtos(allDiscusses);
            return discussDTOList;

    }
    @Override
    public DiscussDTO getDiscussById(Long discussId) {
        Discuss discuss = this.discussRepos.findById(discussId)
                .orElseThrow(()-> new ResourceNotFoundException("Cannot find Discuss with id: "+discussId));

        DiscussDTO discussDTO = this.discussMapper.toDto(discuss);
        return discussDTO;



    }

    @Override
    @Transactional

    public List<DiscussDTO> getDiscussesByCategory(Integer categoryId) {
        Category category = this.categoryRepos.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find Category with id : "+categoryId));
        List<Discuss> discusses = this.discussRepos.findByCategory(category);
        return this.discussMapper.dtos(discusses);
    }

    @Override
    public List<DiscussDTO> getDiscussesByUser(Long userId) {
        User user = this.userRepos.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find User with id : "+userId));
        List<Discuss> discusses = this.discussRepos.findByOwner(user);
        List<DiscussDTO> dtos = this.discussMapper.dtos(discusses);
        return dtos;
    }

    @Override
    public List<DiscussDTO> searchDiscusses(String keyword) {
        List<Discuss> discusses = this.discussRepos.findByTopicContaining(keyword);
        List<DiscussDTO> dtos = this.discussMapper.dtos(discusses);
        return dtos;
    }
}
