-- ===========================================================
-- 1. Base Users Table
-- (All users: Renter, Landlord)
-- ===========================================================

CREATE TABLE base_users (
    user_id          BIGSERIAL PRIMARY KEY,
    username         VARCHAR(50) UNIQUE, --username will be customised by js through register
    full_name        VARCHAR(100) NOT NULL,
    email            VARCHAR(150) NOT NULL UNIQUE,
    password_hash    VARCHAR(255) NOT NULL,
    contact_number   VARCHAR(20),
    present_address  TEXT,
    nid              VARCHAR(20),
    account_type     VARCHAR(20) NOT NULL CHECK (account_type IN ('renter', 'landlord')),
    created_at       TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- 2. Renters Profile
-- ===========================================================

CREATE TABLE renters (
    renter_id BIGINT PRIMARY KEY REFERENCES base_users(user_id) ON DELETE CASCADE
);

-- ===========================================================
-- 3. Landlords Profile
-- ===========================================================

CREATE TABLE landlords (
    landlord_id   BIGINT PRIMARY KEY REFERENCES base_users(user_id) ON DELETE CASCADE,
    bank_account  VARCHAR(20) UNIQUE
);

-- ===========================================================
-- 4. Admins Profile
-- ===========================================================

CREATE TABLE admins (
    admin_id         BIGSERIAL PRIMARY KEY,
    username         VARCHAR(50) NOT NULL UNIQUE,
    password_hash    VARCHAR(255) NOT NULL
);

-- ===========================================================
-- 5. Flats (Posted by Landlords)
-- ===========================================================

CREATE TABLE flats (
    flat_id        BIGSERIAL PRIMARY KEY,
    landlord_id    BIGINT NOT NULL REFERENCES landlords(landlord_id) ON DELETE CASCADE,
    building       VARCHAR(150) NOT NULL,
    details        TEXT,
    location_      VARCHAR(150) NOT NULL,
    division       VARCHAR(150) NOT NULL,
    floor_level    VARCHAR(20) NOT NULL,
    catagory       VARCHAR(20) DEFAULT 'family' CHECK (catagory IN ('family','bachelor','office')),
    rentpermonth   NUMERIC(10,2) NOT NULL,
    room_count     INT,
    gas_bill       NUMERIC(10,2) NOT NULL,
    water_bill     VARCHAR(20) DEFAULT 'excluded' CHECK (water_bill IN ('included','excluded')),
    current_bill   VARCHAR(20) DEFAULT 'excluded' CHECK (current_bill IN ('included','excluded')),
    flat_status    VARCHAR(20) DEFAULT 'available' CHECK (flat_status IN ('available','occupied')),
    flat_verify    VARCHAR(20) DEFAULT 'verified' CHECK (flat_verify IN ('verified','pending','corrupted')),
    created_at     TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- 6. Flat Images (Supabase Storage + DB metadata)
-- ===========================================================

CREATE TABLE flat_images (
    image_id   BIGSERIAL PRIMARY KEY,
    flat_id    BIGINT REFERENCES flats(flat_id) ON DELETE CASCADE,
    image_url  TEXT NOT NULL,
    doc_url    TEXT NOT NULL --> legal papers 
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
    comment         TEXT,
    nego_status     VARCHAR(20) DEFAULT 'pending' 
                     CHECK (nego_status IN ('pending','approved','rejected')),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- 9. Appointment System
-- ===========================================================

CREATE TABLE appointments (
    appointment_id    BIGSERIAL PRIMARY KEY,
    negotiation_id    BIGINT REFERENCES negotiations(negotiation_id) ON DELETE CASCADE,
    appointment_date  DATE NOT NULL,
    appointment_time  TIMESTAMP NOT NULL,
    meeting_location  VARCHAR(200),
    created_at        TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- 10. Reports (User → Admin)
-- ===========================================================

CREATE TABLE reports (
    report_id       BIGSERIAL PRIMARY KEY,
    submitted_by    BIGINT REFERENCES base_users(user_id) ON DELETE SET NULL,
    target_user     BIGINT REFERENCES base_users(user_id) ON DELETE SET NULL,
    report_comment  TEXT NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ===========================================================
-- Indexes for faster search
-- ===========================================================

CREATE INDEX idx_users_role ON base_users(account_type);
CREATE INDEX idx_flats_location ON flats(division);
CREATE INDEX idx_flats_rental ON flats(rentpermonth);
CREATE INDEX idx_flats_room ON flats(room_count);
CREATE INDEX idx_flats_catagory ON flats(catagory);
CREATE INDEX idx_negotiation_status ON negotiations(nego_status);
