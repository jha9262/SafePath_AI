-- SafePath AI Database Schema

-- Create database
CREATE DATABASE safepath_ai;

-- Use the database
\c safepath_ai;

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_report_time TIMESTAMP
);

-- Danger zones table
CREATE TABLE danger_zones (
    id BIGSERIAL PRIMARY KEY,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    category VARCHAR(50) NOT NULL,
    reported_by BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    severity_score INTEGER DEFAULT 1
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_danger_zones_location ON danger_zones(latitude, longitude);
CREATE INDEX idx_danger_zones_category ON danger_zones(category);
CREATE INDEX idx_danger_zones_reported_by ON danger_zones(reported_by);

-- Sample data (optional)
INSERT INTO users (name, email, phone, password, role) VALUES 
('Admin User', 'admin@safepath.ai', '+1234567890', '$2a$10$example_hashed_password', 'ADMIN'),
('Test User', 'user@safepath.ai', '+1234567891', '$2a$10$example_hashed_password', 'USER');

INSERT INTO danger_zones (latitude, longitude, category, reported_by, severity_score) VALUES 
(40.7128, -74.0060, 'POTHOLE', 2, 3),
(40.7589, -73.9851, 'POORLY_LIT_ROAD', 2, 2),
(40.7505, -73.9934, 'ACCIDENT_SPOT', 2, 4);