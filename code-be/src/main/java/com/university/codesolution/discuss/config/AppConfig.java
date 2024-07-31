package com.university.codesolution.discuss.config;

import com.university.codesolution.comment.mapper.BlogCommentMapper;
import com.university.codesolution.discuss.mapper.CategoryMapper;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.response.LoginResponse;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public ModelMapper modelMapper() {
        // Tạo object và cấu hình
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.getConfiguration()
                .setPropertyCondition(Conditions.isNotNull());
        return modelMapper;
    }
    @Bean
    public UserDTO userDTO(){
        return new UserDTO();
    }

    @Bean
    public LoginResponse loginResponse(){return new LoginResponse();}
    @Bean
    public CategoryMapper categoryMapper(){return new CategoryMapper();}
    @Bean
    public BlogCommentMapper blogCommentMapper(){return new BlogCommentMapper();}

}
