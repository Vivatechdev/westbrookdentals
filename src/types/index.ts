export type ServiceCategory = 
  | 'General & Preventive'
  | 'Restorative'
  | 'Cosmetic'
  | 'Orthodontics'
  | 'Pediatric'
  | 'Emergency';

export interface DentalService {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  startingPrice: number;
  imageUrl: string;
  isPopular?: boolean;
  isActive: boolean;
  benefits: string[];
}

export interface Dentist {
  id: string;
  name: string;
  title: string; // e.g. "Lead General & Cosmetic Dentist"
  qualifications: string; // e.g. "BDS (Hons), MFDS RCPS (Placeholder)"
  registrationNumber: string; // e.g. "GDC Reg #123456 (Placeholder)"
  bio: string;
  specialties: string[];
  avatarUrl: string;
  workingDays: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[];
  consultationFee: number;
  isActive: boolean;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientDob?: string;
  isExistingPatient: boolean;
  isEmergency: boolean;
  serviceId: string;
  serviceName: string;
  dentistId: string;
  dentistName: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm
  durationMinutes: number;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface ClinicScheduleRule {
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breakStart?: string;
  breakEnd?: string;
  slotDurationMinutes: number;
}

export interface ClinicSettings {
  clinicName: string;
  tagline: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  googleMapsEmbedUrl?: string;
  onlineBookingEnabled: boolean;
  requireAdvanceNoticeHours: number;
  maxAdvanceBookingDays: number;
  cancellationPolicyNotice: string;
  operatingHoursSummary: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'dentist' | 'receptionist';
}
