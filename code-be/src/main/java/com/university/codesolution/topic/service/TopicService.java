package com.university.codesolution.topic.service;

import com.university.codesolution.topic.dto.TopicDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TopicService {
    List<TopicDTO> getTopics();
}
