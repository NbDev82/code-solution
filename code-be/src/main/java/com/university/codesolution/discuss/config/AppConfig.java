package com.university.codesolution.discuss.config;

import com.university.codesolution.discuss.mapper.CategoryMapper;
import com.university.codesolution.discuss.mapper.DiscussMapper;
import com.university.codesolution.discuss.mapper.DiscussMapperImpl;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.response.LoginResponse;
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
        return modelMapper;
    }
    @Bean
    public UserDTO userDTO(){
        return new UserDTO();
    }
    @Bean
    public DiscussMapper discussMapper(){
        return new DiscussMapper();
    }
    @Bean
    public LoginResponse loginResponse(){return new LoginResponse();}
    @Bean
    public CategoryMapper categoryMapper(){return new CategoryMapper();}
}
