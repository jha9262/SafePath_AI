package com.safepath.ai.service;

import com.safepath.ai.dto.DangerZoneRequest;
import com.safepath.ai.entity.DangerZone;
import com.safepath.ai.entity.User;
import com.safepath.ai.repository.DangerZoneRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DangerZoneService {

    private final DangerZoneRepository dangerZoneRepository;
    private final UserService userService;

    public DangerZoneService(DangerZoneRepository dangerZoneRepository, UserService userService) {
        this.dangerZoneRepository = dangerZoneRepository;
        this.userService = userService;
    }

    @Transactional
    public DangerZone reportDangerZone(DangerZoneRequest request, String userEmail) {
        User user = userService.findByEmail(userEmail);
        
        // Rate limiting: prevent spam reports (max 1 report per minute)
        if (user.getLastReportTime() != null && 
            user.getLastReportTime().isAfter(LocalDateTime.now().minusMinutes(1))) {
            throw new RuntimeException("Please wait before reporting another danger zone");
        }

        DangerZone dangerZone = new DangerZone(
                request.getLatitude(),
                request.getLongitude(),
                request.getCategory(),
                user
        );

        user.setLastReportTime(LocalDateTime.now());
        userService.saveUser(user);
        
        return dangerZoneRepository.save(dangerZone);
    }

    public List<DangerZone> getDangerZonesWithinRadius(Double latitude, Double longitude, Double radiusKm) {
        return dangerZoneRepository.findDangerZonesWithinRadius(latitude, longitude, radiusKm);
    }
}