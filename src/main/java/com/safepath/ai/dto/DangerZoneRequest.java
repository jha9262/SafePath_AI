package com.safepath.ai.dto;

import com.safepath.ai.enums.DangerCategory;
import jakarta.validation.constraints.NotNull;

public class DangerZoneRequest {
    
    @NotNull(message = "Latitude is required")
    private Double latitude;
    
    @NotNull(message = "Longitude is required")
    private Double longitude;
    
    @NotNull(message = "Category is required")
    private DangerCategory category;

    public DangerZoneRequest() {}

    public DangerZoneRequest(Double latitude, Double longitude, DangerCategory category) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.category = category;
    }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    
    public DangerCategory getCategory() { return category; }
    public void setCategory(DangerCategory category) { this.category = category; }
}