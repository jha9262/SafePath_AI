package com.safepath.ai.controller;

import com.safepath.ai.dto.RouteRequest;
import com.safepath.ai.dto.RouteResponse;
import com.safepath.ai.service.RouteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "http://localhost:3000")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @PostMapping("/safe-route")
    public ResponseEntity<RouteResponse> calculateSafeRoute(@Valid @RequestBody RouteRequest request) {
        RouteResponse response = routeService.calculateSafeRoute(request);
        return ResponseEntity.ok(response);
    }
}