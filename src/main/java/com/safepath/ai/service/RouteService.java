package com.safepath.ai.service;

import com.safepath.ai.dto.RouteRequest;
import com.safepath.ai.dto.RouteResponse;
import com.safepath.ai.dto.DangerZoneResponse;
import com.safepath.ai.entity.DangerZone;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteService {

    private final DangerZoneService dangerZoneService;

    public RouteService(DangerZoneService dangerZoneService) {
        this.dangerZoneService = dangerZoneService;
    }

    public RouteResponse calculateSafeRoute(RouteRequest request) {
        // Calculate distance between source and destination
        double distance = calculateDistance(request.getSourceLat(), request.getSourceLng(), 
                                          request.getDestLat(), request.getDestLng());
        
        // Get danger zones along the route (simplified: within 2km radius of midpoint)
        double midLat = (request.getSourceLat() + request.getDestLat()) / 2;
        double midLng = (request.getSourceLng() + request.getDestLng()) / 2;
        
        List<DangerZone> dangerZones = dangerZoneService.getDangerZonesWithinRadius(midLat, midLng, 2.0);
        
        // Calculate safety score (10 - number of danger zones, minimum 1)
        double safetyScore = Math.max(1.0, 10.0 - dangerZones.size());
        
        // Convert to response DTOs
        List<DangerZoneResponse> dangerZoneResponses = dangerZones.stream()
                .map(zone -> new DangerZoneResponse(
                        zone.getLatitude(),
                        zone.getLongitude(),
                        zone.getCategory().name(),
                        zone.getSeverityScore()))
                .collect(Collectors.toList());

        String routeDescription = generateRouteDescription(safetyScore, dangerZones.size());

        return new RouteResponse(safetyScore, routeDescription, dangerZoneResponses, distance);
    }

    private double calculateDistance(double lat1, double lng1, double lat2, double lng2) {
        // Haversine formula for distance calculation
        final int R = 6371; // Earth's radius in kilometers
        
        double latDistance = Math.toRadians(lat2 - lat1);
        double lngDistance = Math.toRadians(lng2 - lng1);
        
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }

    private String generateRouteDescription(double safetyScore, int dangerCount) {
        if (safetyScore >= 8) {
            return "Excellent route with minimal safety concerns. Safe to travel.";
        } else if (safetyScore >= 6) {
            return "Good route with some minor safety considerations. Exercise normal caution.";
        } else if (safetyScore >= 4) {
            return "Moderate safety concerns detected. Consider alternative route if possible.";
        } else {
            return "High risk route with multiple danger zones. Strongly recommend alternative path.";
        }
    }
}