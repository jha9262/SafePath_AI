package com.safepath.ai.dto;

import java.util.List;

public class RouteResponse {
    private Double safetyScore;
    private String routeDescription;
    private List<DangerZoneResponse> dangerZones;
    private Double estimatedDistance;

    public RouteResponse() {}

    public RouteResponse(Double safetyScore, String routeDescription, List<DangerZoneResponse> dangerZones, Double estimatedDistance) {
        this.safetyScore = safetyScore;
        this.routeDescription = routeDescription;
        this.dangerZones = dangerZones;
        this.estimatedDistance = estimatedDistance;
    }

    public Double getSafetyScore() { return safetyScore; }
    public void setSafetyScore(Double safetyScore) { this.safetyScore = safetyScore; }
    
    public String getRouteDescription() { return routeDescription; }
    public void setRouteDescription(String routeDescription) { this.routeDescription = routeDescription; }
    
    public List<DangerZoneResponse> getDangerZones() { return dangerZones; }
    public void setDangerZones(List<DangerZoneResponse> dangerZones) { this.dangerZones = dangerZones; }
    
    public Double getEstimatedDistance() { return estimatedDistance; }
    public void setEstimatedDistance(Double estimatedDistance) { this.estimatedDistance = estimatedDistance; }
}