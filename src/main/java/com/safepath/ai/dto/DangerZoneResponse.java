package com.safepath.ai.dto;

public class DangerZoneResponse {
    private Double latitude;
    private Double longitude;
    private String category;
    private Integer severityScore;

    public DangerZoneResponse() {}

    public DangerZoneResponse(Double latitude, Double longitude, String category, Integer severityScore) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.category = category;
        this.severityScore = severityScore;
    }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Integer getSeverityScore() { return severityScore; }
    public void setSeverityScore(Integer severityScore) { this.severityScore = severityScore; }
}