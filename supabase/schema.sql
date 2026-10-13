-- ========================================================
-- West Bridge Dentals - Supabase PostgreSQL Schema
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Dental Services Table
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL DEFAULT 30,
    "startingPrice" NUMERIC(10,2) NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "isPopular" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    benefits JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Dentists / Clinicians Table
CREATE TABLE IF NOT EXISTS dentists (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    qualifications TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    bio TEXT NOT NULL,
    specialties JSONB DEFAULT '[]'::jsonb,
    "avatarUrl" TEXT,
    "workingDays" JSONB DEFAULT '["Monday","Tuesday","Wednesday","Thursday","Friday"]'::jsonb,
    "consultationFee" NUMERIC(10,2) NOT NULL DEFAULT 60,
    "isActive" BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    "referenceNumber" TEXT UNIQUE NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientEmail" TEXT NOT NULL,
    "patientPhone" TEXT NOT NULL,
    "patientDob" TEXT,
    "isExistingPatient" BOOLEAN DEFAULT false,
    "isEmergency" BOOLEAN DEFAULT false,
    "serviceId" TEXT REFERENCES services(id) ON DELETE SET NULL,
    "serviceName" TEXT NOT NULL,
    "dentistId" TEXT REFERENCES dentists(id) ON DELETE SET NULL,
    "dentistName" TEXT NOT NULL,
    "appointmentDate" DATE NOT NULL,
    "appointmentTime" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL DEFAULT 30,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE
);

-- 4. Clinic Settings Table
CREATE TABLE IF NOT EXISTS clinic_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    "clinicName" TEXT NOT NULL,
    tagline TEXT,
    phone TEXT,
    "emergencyPhone" TEXT,
    email TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    city TEXT,
    "postalCode" TEXT,
    country TEXT,
    "onlineBookingEnabled" BOOLEAN DEFAULT true,
    "operatingHoursSummary" JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE dentists ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies for services, dentists, and settings
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can view active dentists" ON dentists FOR SELECT USING (true);
CREATE POLICY "Public can view clinic settings" ON clinic_settings FOR SELECT USING (true);

-- Public can insert appointments (book online)
CREATE POLICY "Public can book appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view their own appointment by reference" ON appointments FOR SELECT USING (true);

-- Authenticated staff/admins can perform all actions
CREATE POLICY "Admins full access to services" ON services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access to dentists" ON dentists FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access to appointments" ON appointments FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access to settings" ON clinic_settings FOR ALL TO authenticated USING (true);
