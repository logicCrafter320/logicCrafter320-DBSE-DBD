-- ========================================================
-- ESTATEFIND - FULL PRODUCTION SCHEMA & 50+ DATASET
-- ========================================================

DROP DATABASE IF EXISTS real_estate;
CREATE DATABASE real_estate;
USE real_estate;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS property_images;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    role ENUM('buyer', 'seller') NOT NULL DEFAULT 'buyer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROPERTIES TABLE
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    property_type ENUM('Flat', 'Apartment', 'Plot', 'Land', 'Villa') NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    city VARCHAR(100) NOT NULL,
    whatsapp_number VARCHAR(20) NULL,
    video_url TEXT NULL,
    latitude DECIMAL(10, 8) DEFAULT 17.3850,
    longitude DECIMAL(11, 8) DEFAULT 78.4867,
    seller_id INT NULL,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. PROPERTY IMAGES TABLE
CREATE TABLE property_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- 4. FAVORITES TABLE
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- ========================================================
-- INSERT SELLER & BUYER ACCOUNTS
-- ========================================================

INSERT INTO users (id, name, email, password, phone, role) VALUES
(1, 'Ganesh Guntu', 'buyer@gmail.com', '$2a$10$7q5f5mJm6vD4yJgQ0qG8u.Wd0m3jMvS8XyQzK8lR9aB2c3d4e5f6g', '+91 9876543210', 'buyer'),
(2, 'Santhosh P', 'seller@gmail.com', '$2a$10$7q5f5mJm6vD4yJgQ0qG8u.Wd0m3jMvS8XyQzK8lR9aB2c3d4e5f6g', '+91 9123456789', 'seller'),
(3, 'Ramesh Infra Developers', 'ramesh@aprealestate.com', '$2a$10$7q5f5mJm6vD4yJgQ0qG8u.Wd0m3jMvS8XyQzK8lR9aB2c3d4e5f6g', '+91 9440123456', 'seller'),
(4, 'Srinivas Urban Plots', 'srinivas@plotsindia.com', '$2a$10$7q5f5mJm6vD4yJgQ0qG8u.Wd0m3jMvS8XyQzK8lR9aB2c3d4e5f6g', '+91 9848012345', 'seller'),
(5, 'Apex Luxury Living', 'contact@apexluxury.com', '$2a$10$7q5f5mJm6vD4yJgQ0qG8u.Wd0m3jMvS8XyQzK8lR9aB2c3d4e5f6g', '+91 9988776655', 'seller');

-- ========================================================
-- INSERT 50+ PROPERTIES ACROSS MULTIPLE CITIES & TYPES
-- ========================================================

INSERT INTO properties (id, title, description, property_type, price, city, whatsapp_number, video_url, latitude, longitude, seller_id, views) VALUES
-- HYDERABAD (12 Properties)
(1, '3BHK Luxury Flat in Gachibowli IT Corridor', 'Spacious 2200 sqft high-rise flat near Financial District with swimming pool, gym, 24/7 security, and EV charging station.', 'Flat', 14500000.00, 'Hyderabad', '+91 9876543210', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 17.4401, 78.3489, 2, 142),
(2, '4BHK Gated Villa in Jubilee Hills', 'Independent luxury villa on 500 sq yards with private swimming pool, home automation, terrace garden, and servant quarters.', 'Villa', 58000000.00, 'Hyderabad', '+91 9123456789', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 17.4319, 78.4071, 2, 280),
(3, '2BHK Apartment in HITEC City', 'Fully furnished 2BHK flat within 5 mins walk to Mindspace IT Park. High rental yields for investors.', 'Apartment', 8800000.00, 'Hyderabad', '+91 9440123456', NULL, 17.4435, 78.3772, 3, 95),
(4, 'HMDA Approved Villa Plot in Mokila', '300 sq. yards east-facing villa plot in a pristine green layout with 40ft blacktop roads and underground drainage.', 'Plot', 8500000.00, 'Hyderabad', '+91 9848012345', NULL, 17.3820, 78.1750, 4, 64),
(5, '5 Acre Commercial Farm Land in Shankarpally', 'Fertile red soil agricultural & farm land touching 60ft main road. Clear title, single owner.', 'Land', 22500000.00, 'Hyderabad', '+91 9988776655', NULL, 17.3480, 78.1250, 5, 110),
(6, '3BHK Premium Apartment in Banjara Hills', 'Boutique apartment with Italian marble flooring, 3 balconies, and double basement car parking.', 'Apartment', 21000000.00, 'Hyderabad', '+91 9123456789', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 17.4156, 78.4487, 2, 175),
(7, '2BHK Flat in Kondapur near Botanical Garden', 'Modern G+5 apartment flat with modular kitchen, generator backup, and intercom facility.', 'Flat', 7200000.00, 'Hyderabad', '+91 9440123456', NULL, 17.4622, 78.3668, 3, 88),
(8, '4BHK Triplex Villa in Tellapur', 'Gated community villa with clubhouse, tennis court, solar water heating, and 3000 sqft built-up area.', 'Villa', 28500000.00, 'Hyderabad', '+91 9848012345', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 17.4720, 78.2910, 4, 150),
(9, 'Corner Plot in Kokapet Neopolis Extension', '400 sq. yards commercial/residential plot in fast appreciating Kokapet zone.', 'Plot', 36000000.00, 'Hyderabad', '+91 9988776655', NULL, 17.3990, 78.3280, 5, 205),
(10, '3BHK High-Rise Flat in Miyapur', 'East facing 3BHK flat near Miyapur Metro Station. Gated society with children play area.', 'Flat', 9200000.00, 'Hyderabad', '+91 9876543210', NULL, 17.4968, 78.3614, 2, 72),
(11, '2BHK Budget Flat in Manikonda', 'Cozy 2BHK flat near Lanco Hills. Low maintenance, 24h water supply, clear title.', 'Flat', 5800000.00, 'Hyderabad', '+91 9123456789', NULL, 17.3985, 78.3840, 2, 54),
(12, 'Commercial Land in Madhapur', '1000 sq. yards prime land parcel suitable for corporate office building or IT hub.', 'Land', 85000000.00, 'Hyderabad', '+91 9440123456', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 17.4483, 78.3915, 3, 310),

-- BANGALORE (10 Properties)
(13, '3BHK Tech-Park Apartment in Whitefield', '1800 sqft flat near Hope Farm Junction and ITPL. Fully equipped gym, pool, and indoor games.', 'Apartment', 12800000.00, 'Bangalore', '+91 9848012345', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 12.9698, 77.7500, 4, 115),
(14, 'A-Katha Residential Plot in Electronic City Phase 2', '1200 sqft (30x40) plot in BDA approved gated layout with electricity and water connection.', 'Plot', 6800000.00, 'Bangalore', '+91 9988776655', NULL, 12.8399, 77.6770, 5, 82),
(15, '4BHK Duplex Villa in Sarjapur Road', 'Independent villa with private swimming pool, wooden flooring, and landscaped garden.', 'Villa', 32000000.00, 'Bangalore', '+91 9876543210', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 12.9116, 77.6950, 2, 190),
(16, '2BHK Flat in Bellandur near ORR', 'Ready to move flat near EcoSpace and Cessna Business Park. Great rental yield.', 'Flat', 8200000.00, 'Bangalore', '+91 9123456789', NULL, 12.9260, 77.6762, 2, 98),
(17, '3BHK Golf-Course View Flat in Yelahanka', 'High-rise apartment overlooking lush greenery near Bangalore Airport Road.', 'Apartment', 11000000.00, 'Bangalore', '+91 9440123456', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 13.1007, 77.5963, 3, 67),
(18, 'Gated Villa Plot in Devanahalli', '2400 sqft plot near BIA airport corridor with high appreciation potential.', 'Plot', 8800000.00, 'Bangalore', '+91 9848012345', NULL, 13.2480, 77.7120, 4, 140),
(19, '2BHK Budget Apartment in Kengeri', 'BBMP approved 2BHK flat near Mysore Road Metro station. Car parking included.', 'Apartment', 4800000.00, 'Bangalore', '+91 9988776655', NULL, 12.9080, 77.4850, 5, 43),
(20, '5BHK Independent Luxury Villa in Indiranagar', 'Ultra premium residence on 4000 sqft plot with elevator, smart home security, and bar counter.', 'Villa', 75000000.00, 'Bangalore', '+91 9876543210', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 12.9784, 77.6408, 2, 420),
(21, '3BHK Flat in Hebbal near Manyata Tech Park', 'Spacious 1650 sqft flat with lake view, tennis court, and clubhouse.', 'Flat', 13800000.00, 'Bangalore', '+91 9123456789', NULL, 13.0358, 77.5970, 2, 112),
(22, 'Agricultural Land in Kanakapura Road', '2 Acres coconut orchard land touching main road with borewell and fencing.', 'Land', 16000000.00, 'Bangalore', '+91 9440123456', NULL, 12.5400, 77.4200, 3, 85),

-- VISAKHAPATNAM (8 Properties)
(23, 'Sea-Facing 2BHK Beach Road Apartment', 'Breathtaking ocean view flat near RK Beach with modular kitchen and private balcony.', 'Apartment', 11500000.00, 'Visakhapatnam', '+91 9848012345', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 17.7132, 83.3150, 4, 195),
(24, 'Residential Plot in Madhurawada IT SEZ', '300 sq. yards VUDA approved plot in fast growing IT corridor Madhurawada.', 'Plot', 7200000.00, 'Visakhapatnam', '+91 9988776655', NULL, 17.8180, 83.3510, 5, 88),
(25, '3BHK Flat in Seethammadhara', 'Prime residential flat in heart of Vizag city near top schools and hospitals.', 'Flat', 9500000.00, 'Visakhapatnam', '+91 9876543210', NULL, 17.7380, 83.3100, 2, 63),
(26, '4BHK Beach Villa in Bheemili Road', 'Luxury villa with ocean view, rooftop infinity pool, and private garden.', 'Villa', 26000000.00, 'Visakhapatnam', '+91 9123456789', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 17.8900, 83.4500, 2, 230),
(27, '2BHK Apartment in MVP Colony', 'Deluxe flat in Sector 4 MVP Colony. Elevator, car parking, 24/7 municipal water.', 'Apartment', 6800000.00, 'Visakhapatnam', '+91 9440123456', NULL, 17.7420, 83.3320, 3, 77),
(28, 'Commercial Land in Gajuwaka Main Road', '500 sq. yards commercial plot suitable for showroom, hotel or godown.', 'Land', 28000000.00, 'Visakhapatnam', '+91 9848012345', NULL, 17.6900, 83.2100, 4, 105),
(29, '3BHK Luxury Flat in Yendada', 'Hill view apartment near Rushikonda Beach Road with gym and indoor games.', 'Flat', 10200000.00, 'Visakhapatnam', '+91 9988776655', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 17.7850, 83.3600, 5, 91),
(30, 'Villa Plot in Pendurthi Layout', '200 sq. yards residential plot near Pendurthi railway station corridor.', 'Plot', 3800000.00, 'Visakhapatnam', '+91 9876543210', NULL, 17.7950, 83.2050, 2, 49),

-- VIJAYAWADA (8 Properties)
(31, 'Luxury 3BHK Flat near Benz Circle', '1950 sqft flat with underground parking, modular kitchen, and 24/7 security.', 'Flat', 8500000.00, 'Vijayawada', '+91 9123456789', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 16.5062, 80.6480, 2, 134),
(32, 'CRDA Approved Plot in Poranki Highway', '200 sq. yards plot near Vijayawada-Machilipatnam Highway layout.', 'Plot', 4500000.00, 'Vijayawada', '+91 9440123456', NULL, 16.4820, 80.7010, 3, 62),
(33, '2BHK Apartment in Tadepalli near AIIMS', 'Modern flat near AIIMS Mangalagiri-Tadepalli bypass road.', 'Apartment', 5400000.00, 'Vijayawada', '+91 9848012345', NULL, 16.4800, 80.6000, 4, 80),
(34, '4BHK Duplex Villa in Gunadala', 'Hillside view luxury duplex villa with spacious garage and private terrace.', 'Villa', 18500000.00, 'Vijayawada', '+91 9988776655', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 16.5250, 80.6650, 5, 145),
(35, '3BHK Flat in Mogalrajapuram', 'East facing flat near Labbipet shopping malls and top educational institutions.', 'Flat', 7800000.00, 'Vijayawada', '+91 9876543210', NULL, 16.5000, 80.6350, 2, 71),
(36, 'Commercial Land in Gannavaram Airport Zone', '1 Acre prime land right next to Vijayawada International Airport main gate.', 'Land', 35000000.00, 'Vijayawada', '+91 9123456789', NULL, 16.5300, 80.7900, 2, 198),
(37, '2BHK Budget Flat in Kanuru', 'Low maintenance flat in calm residential colony with generator backup.', 'Flat', 4200000.00, 'Vijayawada', '+91 9440123456', NULL, 16.4880, 80.6800, 3, 53),
(38, 'CRDA Plot in Kankipadu Layout', '180 sq. yards plot with clear titles, ready for immediate house construction.', 'Plot', 3200000.00, 'Vijayawada', '+91 9848012345', NULL, 16.4500, 80.7500, 4, 40),

-- CHENNAI (7 Properties)
(39, '3BHK Sea-Breeze Flat on OMR IT Expressway', '1750 sqft apartment near Siruseri IT park with clubhouse and ocean views.', 'Flat', 10800000.00, 'Chennai', '+91 9988776655', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 12.8797, 80.2222, 5, 118),
(40, 'Private Beachfront 4BHK Villa on ECR Road', 'Luxury villa with private swimming pool and direct access to East Coast Road beach.', 'Villa', 35000000.00, 'Chennai', '+91 9876543210', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 12.8210, 80.2410, 2, 260),
(41, '2BHK Apartment in Velachery near Phoenix Mall', 'Gated flat within walking distance to Velachery railway station and Phoenix Marketcity.', 'Apartment', 7500000.00, 'Chennai', '+91 9123456789', NULL, 12.9780, 80.2200, 2, 92),
(42, 'DTCP Approved Plot in Tambaram Sanatorium', '1500 sqft residential plot near GST highway and Tambaram railway hub.', 'Plot', 5800000.00, 'Chennai', '+91 9440123456', NULL, 12.9250, 80.1150, 3, 61),
(43, '3BHK Luxury Flat in Anna Nagar', 'High-end flat in prime Anna Nagar neighborhood with Italian tiles and 2 car parks.', 'Flat', 22000000.00, 'Chennai', '+91 9848012345', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 13.0850, 80.2100, 4, 180),
(44, '2BHK Budget Flat in Porur near DLF Tech Park', 'Ideal for IT professionals. Low maintenance charges, 24h water, lift facility.', 'Flat', 5200000.00, 'Chennai', '+91 9988776655', NULL, 13.0380, 80.1560, 5, 84),
(45, 'Industrial Land in Sriperumbudur', '3 Acres industrial plot near Hyundai plant with 80ft container road access.', 'Land', 45000000.00, 'Chennai', '+91 9876543210', NULL, 12.9660, 79.9400, 2, 130),

-- GUNTUR & OTHER REGIONS (6 Properties)
(46, 'Gated Community Plot near Highway Guntur', 'CRDA approved 240 sq. yards villa plot near Pattabhipuram.', 'Plot', 4200000.00, 'Guntur', '+91 9123456789', NULL, 16.3067, 80.4365, 2, 48),
(47, 'Deluxe 2BHK Apartment near Amaravati Road', 'Well-ventilated flat with elevator, private balcony, and covered parking.', 'Apartment', 5200000.00, 'Guntur', '+91 9440123456', NULL, 16.3150, 80.4120, 3, 56),
(48, '3BHK Villa near Tirupati Alipiri Footsteps', 'Spacious pilgrim hill-view villa near Kapila Theertham Tirupati.', 'Villa', 16500000.00, 'Tirupati', '+91 9848012345', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 13.6288, 79.4192, 4, 162),
(49, 'Temple View Plot in Tirupati Bypass Road', '200 sq. yards plot with clear titles near Renigunta Highway.', 'Plot', 3800000.00, 'Tirupati', '+91 9988776655', NULL, 13.6300, 79.4500, 5, 73),
(50, '3BHK Luxury Flat in Marine Drive Kochi', 'Arabian Sea view apartment with private boat jetty access and infinity pool.', 'Flat', 17500000.00, 'Kochi', '+91 9876543210', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 9.9816, 76.2750, 2, 190),
(51, '4BHK Eco Villa in Race Course Coimbatore', 'Lush green luxury villa in Coimbatore city center with solar panel installation.', 'Villa', 24000000.00, 'Coimbatore', '+91 9123456789', NULL, 11.0018, 76.9629, 2, 125);

-- ========================================================
-- ATTACH REAL ESTATE COVER IMAGES FOR ALL 51 PROPERTIES
-- ========================================================

INSERT INTO property_images (property_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(2, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
(3, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(4, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(5, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(6, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'),
(7, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(8, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
(9, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(10, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(11, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(12, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(13, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(14, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(15, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
(16, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(17, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(18, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(19, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(20, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
(21, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(22, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(23, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(24, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(25, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(26, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
(27, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(28, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(29, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(30, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(31, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(32, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(33, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(34, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
(35, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(36, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(37, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(38, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(39, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(40, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
(41, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(42, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(43, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'),
(44, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(45, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(46, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(47, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'),
(48, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
(49, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'),
(50, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'),
(51, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800');