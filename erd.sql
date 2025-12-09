-- ===========================================================
-- 1. Base Users Table
-- (All users: Renter, Landlord, Admin)
-- ===========================================================

CREATE TABLE base_users (
    user_id          BIGSERIAL PRIMARY KEY,
    username         VARCHAR(50) NOT NULL UNIQUE,
    full_name        VARCHAR(100) NOT NULL,
    email            VARCHAR(150) NOT NULL UNIQUE,
    password_hash    VARCHAR(255) NOT NULL,
    contact_number   VARCHAR(20),
    present_address  TEXT,
    nid              VARCHAR(20),
    Rrole            VARCHAR(20) NOT NULL CHECK (role IN ('renter', 'landlord', 'admin')),
    created_at       TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- 2. Renters Profile
-- ===========================================================

CREATE TABLE renters (
    renter_id BIGINT PRIMARY KEY REFERENCES base_users(user_id) ON DELETE CASCADE,
    payment_medium VARCHAR(50)
);

-- ===========================================================
-- 3. Landlords Profile
-- ===========================================================

CREATE TABLE landlords (
    landlord_id BIGINT PRIMARY KEY REFERENCES base_users(user_id) ON DELETE CASCADE,
    payment_method VARCHAR(50)
);

-- ===========================================================
-- 4. Admins Profile
-- ===========================================================

CREATE TABLE admins (
    admin_id BIGINT PRIMARY KEY REFERENCES base_users(user_id) ON DELETE CASCADE,
    admin_level VARCHAR(20) DEFAULT 'standard'
);

-- ===========================================================
-- 5. Flats (Posted by Landlords)
-- ===========================================================

CREATE TABLE flats (
    flat_id        BIGSERIAL PRIMARY KEY,
    landlord_id    BIGINT NOT NULL REFERENCES landlords(landlord_id) ON DELETE CASCADE,
    title          VARCHAR(150) NOT NULL,
    description    TEXT,
    location       VARCHAR(150) NOT NULL,
    rent_amount    NUMERIC(10,2) NOT NULL,
    rooms          INT,
    status         VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available','reserved','taken')),
    created_at     TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- 6. Flat Images (Supabase Storage + DB metadata)
-- ===========================================================

CREATE TABLE flat_images (
    image_id   BIGSERIAL PRIMARY KEY,
    flat_id    BIGINT REFERENCES flats(flat_id) ON DELETE CASCADE,
    image_url  TEXT NOT NULL
);

-- ===========================================================
-- 7. Likes (Renters liking flats)
-- ===========================================================

CREATE TABLE flat_likes (
    like_id       BIGSERIAL PRIMARY KEY,
    flat_id       BIGINT REFERENCES flats(flat_id) ON DELETE CASCADE,
    renter_id     BIGINT REFERENCES renters(renter_id) ON DELETE CASCADE,
    liked_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(flat_id, renter_id)
);

-- ===========================================================
-- 8. Negotiations between Renter and Landlord
-- ===========================================================

CREATE TABLE negotiations (
    negotiation_id  BIGSERIAL PRIMARY KEY,
    flat_id         BIGINT REFERENCES flats(flat_id) ON DELETE CASCADE,
    renter_id       BIGINT REFERENCES renters(renter_id) ON DELETE CASCADE,
    landlord_id     BIGINT REFERENCES landlords(landlord_id) ON DELETE CASCADE,
    proposed_rent   NUMERIC(10,2),
    message         TEXT,
    status          VARCHAR(20) DEFAULT 'pending' 
                     CHECK (status IN ('pending','approved','rejected')),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- 9. Appointment System
-- ===========================================================

CREATE TABLE appointments (
    appointment_id BIGSERIAL PRIMARY KEY,
    negotiation_id BIGINT REFERENCES negotiations(negotiation_id) ON DELETE CASCADE,
    appointment_time TIMESTAMP NOT NULL,
    meeting_location VARCHAR(200),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- 10. Reports (User → Admin)
-- ===========================================================

CREATE TABLE reports (
    report_id     BIGSERIAL PRIMARY KEY,
    submitted_by  BIGINT REFERENCES base_users(user_id) ON DELETE SET NULL,
    target_user   BIGINT REFERENCES base_users(user_id) ON DELETE SET NULL,
    message       TEXT NOT NULL,
    created_at    TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- Indexes for faster search
-- ===========================================================

CREATE INDEX idx_users_role ON base_users(role);
CREATE INDEX idx_flats_location ON flats(location);
CREATE INDEX idx_negotiation_status ON negotiations(status);
