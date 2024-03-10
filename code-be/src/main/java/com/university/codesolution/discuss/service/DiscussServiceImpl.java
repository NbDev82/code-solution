package com.university.codesolution.discuss.service;

import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.discuss.exception.ResourceNotFoundException;
import com.university.codesolution.discuss.mapper.DiscussMapper;
import com.university.codesolution.discuss.repository.CategoryRepos;
import com.university.codesolution.discuss.repository.DiscussRepos;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.repository.UserRepos;
import lombok.AllArgsConstructor;
import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DiscussServiceImpl implements DiscussService {
    private DiscussRepos discussRepos;
    private ModelMapper modelMapper;
    private UserRepos userRepos;
    private CategoryRepos categoryRepos;
    private DiscussMapper discussMapper;
    @Override
    public DiscussDTO createDiscuss(DiscussDTO discussDTO, Long userId, Integer categoryId) {
        User user = this.userRepos.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find User with id : "+userId));

        Category category = this.categoryRepos.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find Category with id : "+categoryId));
        Discuss discuss = this.discussMapper.toEntity(discussDTO);
        discuss.setOwner(user);
        discuss.setCategory(category);
        discuss.setStartDate(LocalDateTime.now());
        Discuss newDiscuss = this.discussRepos.save(discuss);

        return this.discussMapper.toDto(newDiscuss);
    }

    @Override
    public Discuss updateDiscuss(DiscussDTO discussDTO, Long discussId) {
        Discuss discuss = this.discussRepos.findById(discussId)
                .orElseThrow(()->new ResourceNotFoundException("Discuss"));
        discuss.setTopic(discussDTO.getTopic());
        discuss.setContent(discussDTO.getContent());
        discuss.setOwner(discussDTO.getOwner());
        discuss.setCategory(discussDTO.getCategory());

        return null;
    }

    @Override
    public void deleteDiscuss(Long discussId) {

    }

    @Override
    public List<DiscussDTO> getAllDiscuss() {
        List<Discuss> discussList = this.discussRepos.findAll();
        return this.discussMapper.toDtos(discussList);
    }

    @Override
    public DiscussDTO getDiscussById(Long discussId) {
        Discuss discuss = this.discussRepos.findById(discussId)
                .orElseThrow(()-> new ResourceNotFoundException("Cannot find Discuss with id: "+discussId));
        return this.discussMapper.toDto(discuss);

    }

    @Override
    public List<DiscussDTO> getDiscussesByCategory(Integer categoryId) {
        Category category = this.categoryRepos.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find Category with id : "+categoryId));
        List<Discuss> discusses = this.discussRepos.findByCategory(category);
        List<DiscussDTO> discussDTOS = this.discussMapper.toDtos(discusses);
        return discussDTOS;
    }

    @Override
    public List<DiscussDTO> getDiscussesByUser(Long userId) {
        User user = this.userRepos.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find User with id : "+userId));
        List<Discuss> discusses = this.discussRepos.findByOwner(user);
        return this.discussMapper.toDtos(discusses);

    }

    @Override
    public List<Discuss> searchDiscusses(String keyword) {
        return null;
    }
}
