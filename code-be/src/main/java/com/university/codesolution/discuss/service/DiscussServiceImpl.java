package com.university.codesolution.discuss.service;

import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.discuss.exception.ResourceNotFoundException;
import com.university.codesolution.discuss.mapper.DiscussMapper;
import com.university.codesolution.discuss.repository.CategoryRepos;
import com.university.codesolution.discuss.repository.DiscussRepos;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.repository.UserRepos;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DiscussServiceImpl implements DiscussService {

    private DiscussRepos discussRepos;
    private UserRepos userRepos;
    private CategoryRepos categoryRepos;
    private DiscussMapper discussMapper;
    @Autowired
    private final ModelMapper modelMapper;
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

        return this.modelMapper.map(newDiscuss, DiscussDTO.class);
    }

    @Override
    @Transactional

    public Discuss updateDiscuss(DiscussDTO discussDTO, Long discussId) {
        Discuss discuss = this.discussRepos.findById(discussId)
                .orElseThrow(()->new ResourceNotFoundException("Discuss"));
        discuss.setTopic(discussDTO.getTopic());
        discuss.setContent(discussDTO.getContent());
        discuss.setImage(discussDTO.getImage());

        return discuss;
    }

    @Override
    @Transactional

    public void deleteDiscuss(Long discussId) {

    }

    @Override
    @Transactional

    public List<DiscussDTO> getAllDiscuss(Integer pageNumber, Integer pageSize) {

        Pageable p = PageRequest.of(pageNumber, pageSize);
        Page<Discuss> pageDiscuss = this.discussRepos.findAll(p);
        List<Discuss> allDiscusses = pageDiscuss.getContent();
        List<DiscussDTO> discussDTOS = this.discussMapper.dtos(allDiscusses);
        return discussDTOS;
    }
    @Override
    public Discuss getDiscussById(Long discussId) {
        return this.discussRepos.findById(discussId)
                .orElseThrow(()-> new ResourceNotFoundException("Cannot find Discuss with id: "+discussId));

    }

    @Override
    @Transactional

    public List<DiscussDTO> getDiscussesByCategory(Integer categoryId) {
        Category category = this.categoryRepos.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find Category with id : "+categoryId));
        List<Discuss> discusses = this.discussRepos.findByCategory(category);
        List<DiscussDTO> dtos = this.discussMapper.dtos(discusses);
        return dtos;
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
