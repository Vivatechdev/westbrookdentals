import { 
  DentalService, 
  Dentist, 
  Appointment, 
  ClinicScheduleRule, 
  ClinicSettings, 
  AppointmentStatus 
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_DENTISTS, 
  INITIAL_SCHEDULE_RULES, 
  INITIAL_SETTINGS, 
  INITIAL_APPOINTMENTS 
} from './initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEYS = {
  SERVICES: 'westbridge_services',
  DENTISTS: 'westbridge_dentists',
  SCHEDULE: 'westbridge_schedule',
  SETTINGS: 'westbridge_settings',
  APPOINTMENTS: 'westbridge_appointments',
};

// Helper to safely get from localStorage with fallback
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving ${key} to localStorage:`, err);
  }
}

// Ensure initial state exists
export function initializeStorageDefaults(): void {
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    setLocalItem(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.DENTISTS)) {
    setLocalItem(STORAGE_KEYS.DENTISTS, INITIAL_DENTISTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SCHEDULE)) {
    setLocalItem(STORAGE_KEYS.SCHEDULE, INITIAL_SCHEDULE_RULES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    setLocalItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  } else {
    // If settings in storage still contain old placeholder address, update to new address
    const currentSettings = getLocalItem<ClinicSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    if (currentSettings.addressLine1.includes('142 West Bridge') || currentSettings.clinicName.includes('West Bridge')) {
      setLocalItem(STORAGE_KEYS.SETTINGS, {
        ...currentSettings,
        clinicName: INITIAL_SETTINGS.clinicName,
        phone: INITIAL_SETTINGS.phone,
        emergencyPhone: INITIAL_SETTINGS.emergencyPhone,
        email: INITIAL_SETTINGS.email,
        addressLine1: INITIAL_SETTINGS.addressLine1,
        addressLine2: INITIAL_SETTINGS.addressLine2,
        city: INITIAL_SETTINGS.city,
        postalCode: INITIAL_SETTINGS.postalCode,
        country: INITIAL_SETTINGS.country,
        googleMapsEmbedUrl: '',
      });
    }
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    setLocalItem(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  }
}

export const dataService = {
  // Services
  async getServices(): Promise<DentalService[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('services').select('*').order('name');
        if (!error && data && data.length > 0) {
          return data as DentalService[];
        }
      } catch (e) {
        console.warn('Supabase services fetch error, falling back to local storage', e);
      }
    }
    return getLocalItem<DentalService[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },

  async getServiceById(id: string): Promise<DentalService | undefined> {
    const services = await this.getServices();
    return services.find(s => s.id === id);
  },

  async saveService(service: DentalService): Promise<DentalService> {
    const services = await this.getServices();
    const index = services.findIndex(s => s.id === service.id);
    let updated: DentalService[];
    if (index >= 0) {
      updated = [...services];
      updated[index] = service;
    } else {
      updated = [...services, service];
    }
    setLocalItem(STORAGE_KEYS.SERVICES, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('services').upsert(service);
      } catch (e) {
        console.warn('Supabase saveService error:', e);
      }
    }

    return service;
  },

  async deleteService(id: string): Promise<void> {
    const services = await this.getServices();
    const updated = services.filter(s => s.id !== id);
    setLocalItem(STORAGE_KEYS.SERVICES, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('services').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase deleteService error:', e);
      }
    }
  },

  // Dentists
  async getDentists(): Promise<Dentist[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('dentists').select('*').order('name');
        if (!error && data && data.length > 0) {
          return data as Dentist[];
        }
      } catch (e) {
        console.warn('Supabase dentists fetch error, falling back to local storage', e);
      }
    }
    return getLocalItem<Dentist[]>(STORAGE_KEYS.DENTISTS, INITIAL_DENTISTS);
  },

  async getDentistById(id: string): Promise<Dentist | undefined> {
    const dentists = await this.getDentists();
    return dentists.find(d => d.id === id);
  },

  async saveDentist(dentist: Dentist): Promise<Dentist> {
    const dentists = await this.getDentists();
    const index = dentists.findIndex(d => d.id === dentist.id);
    let updated: Dentist[];
    if (index >= 0) {
      updated = [...dentists];
      updated[index] = dentist;
    } else {
      updated = [...dentists, dentist];
    }
    setLocalItem(STORAGE_KEYS.DENTISTS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('dentists').upsert(dentist);
      } catch (e) {
        console.warn('Supabase saveDentist error:', e);
      }
    }

    return dentist;
  },

  async deleteDentist(id: string): Promise<void> {
    const dentists = await this.getDentists();
    const updated = dentists.filter(d => d.id !== id);
    setLocalItem(STORAGE_KEYS.DENTISTS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('dentists').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase deleteDentist error:', e);
      }
    }
  },

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('appointments').select('*').order('appointmentDate', { ascending: false });
        if (!error && data && data.length > 0) {
          return data as Appointment[];
        }
      } catch (e) {
        console.warn('Supabase appointments fetch error, falling back to local storage', e);
      }
    }
    return getLocalItem<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  },

  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    const appointments = await this.getAppointments();
    return appointments.find(a => a.id === id || a.referenceNumber === id);
  },

  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Promise<Appointment> {
    const id = `apt-${Date.now()}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `WBD-${new Date().getFullYear()}-${randomSuffix}`;
    const newAppointment: Appointment = {
      ...appointmentData,
      id,
      referenceNumber,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    const appointments = await this.getAppointments();
    const updated = [newAppointment, ...appointments];
    setLocalItem(STORAGE_KEYS.APPOINTMENTS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('appointments').insert(newAppointment);
      } catch (e) {
        console.warn('Supabase createAppointment error:', e);
      }
    }

    return newAppointment;
  },

  async updateAppointmentStatus(id: string, status: AppointmentStatus, notes?: string): Promise<Appointment | null> {
    const appointments = await this.getAppointments();
    const index = appointments.findIndex(a => a.id === id || a.referenceNumber === id);
    if (index === -1) return null;

    const current = appointments[index];
    const updatedAppointment: Appointment = {
      ...current,
      status,
      notes: notes !== undefined ? notes : current.notes,
      updatedAt: new Date().toISOString()
    };

    const updated = [...appointments];
    updated[index] = updatedAppointment;
    setLocalItem(STORAGE_KEYS.APPOINTMENTS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('appointments').update({
          status,
          notes: updatedAppointment.notes,
          updatedAt: updatedAppointment.updatedAt
        }).eq('id', current.id);
      } catch (e) {
        console.warn('Supabase updateAppointment error:', e);
      }
    }

    return updatedAppointment;
  },

  // Clinic Schedule & Availability
  async getScheduleRules(): Promise<ClinicScheduleRule[]> {
    return getLocalItem<ClinicScheduleRule[]>(STORAGE_KEYS.SCHEDULE, INITIAL_SCHEDULE_RULES);
  },

  async saveScheduleRules(rules: ClinicScheduleRule[]): Promise<void> {
    setLocalItem(STORAGE_KEYS.SCHEDULE, rules);
  },

  async getAvailableTimeSlots(dateString: string, dentistId?: string): Promise<string[]> {
    // Generate intelligent slots based on day of week and existing bookings
    const date = new Date(dateString);
    const days: ('Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const dayName = days[date.getDay()];

    const rules = await this.getScheduleRules();
    const dayRule = rules.find(r => r.dayOfWeek === dayName);

    if (!dayRule || !dayRule.isOpen) {
      return []; // Clinic closed on this day
    }

    // If a dentist is selected, check if they work on this day
    if (dentistId) {
      const dentist = await this.getDentistById(dentistId);
      if (dentist && !dentist.workingDays.includes(dayName as any)) {
        return [];
      }
    }

    // Build standard slot list from openTime to closeTime
    const slots: string[] = [];
    const [openH, openM] = dayRule.openTime.split(':').map(Number);
    const [closeH, closeM] = dayRule.closeTime.split(':').map(Number);
    const step = dayRule.slotDurationMinutes || 30;

    let currentMinutes = openH * 60 + openM;
    const endMinutes = closeH * 60 + closeM;

    let breakStartMin = -1;
    let breakEndMin = -1;
    if (dayRule.breakStart && dayRule.breakEnd) {
      const [bsh, bsm] = dayRule.breakStart.split(':').map(Number);
      const [beh, bem] = dayRule.breakEnd.split(':').map(Number);
      breakStartMin = bsh * 60 + bsm;
      breakEndMin = beh * 60 + bem;
    }

    while (currentMinutes + step <= endMinutes) {
      // Check if slot falls in lunch/break
      const isDuringBreak = breakStartMin !== -1 && currentMinutes >= breakStartMin && currentMinutes < breakEndMin;
      if (!isDuringBreak) {
        const h = Math.floor(currentMinutes / 60);
        const m = currentMinutes % 60;
        const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
      currentMinutes += step;
    }

    // Filter out already booked slots for this date and dentist
    const appointments = await this.getAppointments();
    const bookedTimes = new Set(
      appointments
        .filter(a => a.appointmentDate === dateString && a.status !== 'cancelled')
        .filter(a => !dentistId || a.dentistId === dentistId)
        .map(a => a.appointmentTime)
    );

    return slots.filter(slot => !bookedTimes.has(slot));
  },

  // Clinic Settings
  async getSettings(): Promise<ClinicSettings> {
    return getLocalItem<ClinicSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async saveSettings(settings: ClinicSettings): Promise<ClinicSettings> {
    setLocalItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  }
};
