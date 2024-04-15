package com.university.codesolution.statistic.service;


import com.university.codesolution.statistic.dto.StatisticDTO;

public interface StatisticService {
    StatisticDTO getStatistic(Long userId);
}
