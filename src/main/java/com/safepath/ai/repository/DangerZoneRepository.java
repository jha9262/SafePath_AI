package com.safepath.ai.repository;

import com.safepath.ai.entity.DangerZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DangerZoneRepository extends JpaRepository<DangerZone, Long> {
    
    @Query("SELECT d FROM DangerZone d WHERE " +
           "(6371 * acos(cos(radians(:lat)) * cos(radians(d.latitude)) * " +
           "cos(radians(d.longitude) - radians(:lng)) + " +
           "sin(radians(:lat)) * sin(radians(d.latitude)))) <= :radius")
    List<DangerZone> findDangerZonesWithinRadius(@Param("lat") Double latitude, 
                                                 @Param("lng") Double longitude, 
                                                 @Param("radius") Double radiusKm);
}