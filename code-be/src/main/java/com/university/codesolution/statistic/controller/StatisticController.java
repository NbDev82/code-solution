package com.university.codesolution.statistic.controller;

import com.university.codesolution.statistic.dto.StatisticDTO;
import com.university.codesolution.statistic.service.StatisticService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistic")
public class StatisticController {
    private static final Logger log = LogManager.getLogger(StatisticController.class);

    private final StatisticService service;

    public StatisticController(StatisticService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<StatisticDTO> getStatistic(@RequestParam Long userId) {
        StatisticDTO statisticDTO = service.getStatistic(userId);
        log.info("Get StatisticDTO from StatisticController");
        return ResponseEntity.ok(statisticDTO);
    }
}
