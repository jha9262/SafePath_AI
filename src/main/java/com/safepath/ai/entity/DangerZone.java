package com.safepath.ai.entity;

import com.safepath.ai.enums.DangerCategory;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "danger_zones")
public class DangerZone {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Double latitude;
    
    @Column(nullable = false)
    private Double longitude;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DangerCategory category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_by", nullable = false)
    private User reportedBy;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "severity_score")
    private Integer severityScore = 1;

    public DangerZone() {}

    public DangerZone(Double latitude, Double longitude, DangerCategory category, User reportedBy) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.category = category;
        this.reportedBy = reportedBy;
        this.createdAt = LocalDateTime.now();
        this.severityScore = 1;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    
    public DangerCategory getCategory() { return category; }
    public void setCategory(DangerCategory category) { this.category = category; }
    
    public User getReportedBy() { return reportedBy; }
    public void setReportedBy(User reportedBy) { this.reportedBy = reportedBy; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Integer getSeverityScore() { return severityScore; }
    public void setSeverityScore(Integer severityScore) { this.severityScore = severityScore; }
}