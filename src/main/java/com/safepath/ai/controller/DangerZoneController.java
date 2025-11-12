package com.safepath.ai.controller;

import com.safepath.ai.dto.DangerZoneRequest;
import com.safepath.ai.entity.DangerZone;
import com.safepath.ai.service.DangerZoneService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/danger-zones")
@CrossOrigin(origins = "http://localhost:3000")
public class DangerZoneController {

    private final DangerZoneService dangerZoneService;

    public DangerZoneController(DangerZoneService dangerZoneService) {
        this.dangerZoneService = dangerZoneService;
    }

    @PostMapping("/report")
    public ResponseEntity<DangerZone> reportDangerZone(@Valid @RequestBody DangerZoneRequest request,
                                                       Authentication authentication) {
        DangerZone dangerZone = dangerZoneService.reportDangerZone(request, authentication.getName());
        return ResponseEntity.ok(dangerZone);
    }

    @GetMapping("/radius")
    public ResponseEntity<List<DangerZone>> getDangerZonesWithinRadius(
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam Double radius) {
        List<DangerZone> dangerZones = dangerZoneService.getDangerZonesWithinRadius(lat, lng, radius);
        return ResponseEntity.ok(dangerZones);
    }
}