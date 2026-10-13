import { DentalService, Dentist, Appointment, ClinicScheduleRule, ClinicSettings } from '../types';

export const INITIAL_SERVICES: DentalService[] = [
  {
    id: 'srv-1',
    name: 'Comprehensive Dental Examination',
    category: 'General & Preventive',
    shortDescription: 'Thorough evaluation of teeth, gums, jaw joints, and oral soft tissues, including low-dose digital radiographs if indicated.',
    fullDescription: 'Our comprehensive checkup provides a complete assessment of your oral health. We inspect for signs of tooth decay, gum disease, bite alignment, and oral cancer screening. Digital diagnostics allow us to detect subtle changes early and discuss preventative strategies before issues develop.',
    durationMinutes: 45,
    startingPrice: 65,
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isActive: true,
    benefits: [
      'Digital low-dose X-rays when clinically indicated',
      'Soft tissue & oral cancer screening',
      'Periodontal (gum health) baseline check',
      'Personalised preventative care plan'
    ]
  },
  {
    id: 'srv-2',
    name: 'Dental Hygiene & Airflow Polishing',
    category: 'General & Preventive',
    shortDescription: 'Gentle plaque and tartar removal with ultrasonic scaling, stain elimination, and personalised home care guidance.',
    fullDescription: 'Routine professional hygiene treatment removes stubborn plaque and calculus deposits that regular brushing cannot reach. We utilize gentle ultrasonic scalers and optional Airflow polishing to gently lift surface stains caused by tea, coffee, and everyday foods.',
    durationMinutes: 30,
    startingPrice: 75,
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isActive: true,
    benefits: [
      'Removes stubborn calculus & tartar',
      'Reduces gum inflammation and bleeding',
      'Gentle stain removal for a fresher smile',
      'Tailored brushing and flossing advice'
    ]
  },
  {
    id: 'srv-3',
    name: 'Tooth-Colored Composite Fillings',
    category: 'Restorative',
    shortDescription: 'Biocompatible, natural-looking composite resin restorations designed to blend seamlessly with your natural tooth shade.',
    fullDescription: 'When minor to moderate tooth decay occurs, tooth-colored composite restorations preserve as much natural tooth structure as possible. The composite material bonds directly to the tooth surface, restoring strength, function, and natural aesthetics.',
    durationMinutes: 45,
    startingPrice: 110,
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    benefits: [
      'Custom shade matching to natural enamel',
      'Minimally invasive tooth preparation',
      'Direct bonding restores structural integrity',
      'Mercury-free composite material'
    ]
  },
  {
    id: 'srv-4',
    name: 'Root Canal Treatment (Endodontics)',
    category: 'Restorative',
    shortDescription: 'Therapeutic treatment to relieve tooth pain, resolve deep infection within the dental pulp, and preserve the natural tooth.',
    fullDescription: 'Deep decay or trauma can affect the inner nerve of the tooth. Root canal therapy gently cleanses and disinfects the internal root canal system using rotary instrumentation and biocompatible sealants, allowing you to keep your natural tooth.',
    durationMinutes: 60,
    startingPrice: 280,
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    benefits: [
      'Aims to alleviate severe dental toothache',
      'Preserves your natural tooth structure',
      'Modern rotary instrumentation for precision',
      'Local anaesthetic ensures comfortable treatment'
    ]
  },
  {
    id: 'srv-5',
    name: 'Professional Teeth Whitening',
    category: 'Cosmetic',
    shortDescription: 'Safe, dentist-supervised in-surgery whitening and custom take-home kits formulated to gently brighten enamel shades.',
    fullDescription: 'Supervised tooth whitening safely lifts intrinsic and extrinsic stains under clinical guidance. Following an initial shade assessment and sensitivity screening, we provide custom-fitted whitening trays and medical-grade whitening gel.',
    durationMinutes: 60,
    startingPrice: 240,
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isActive: true,
    benefits: [
      'Prescribed and monitored by licensed dentists',
      'Custom laboratory-fabricated whitening trays',
      'Desensitizing formulation for sensitive teeth',
      'Gradual, natural-looking results'
    ]
  },
  {
    id: 'srv-6',
    name: 'Porcelain Veneers & Smile Design',
    category: 'Cosmetic',
    shortDescription: 'Ultra-thin, handcrafted ceramic laminates designed to harmonize tooth proportions, spacing, and minor discoloration.',
    fullDescription: 'Custom ceramic veneers offer a durable solution for chipped, worn, or unevenly spaced teeth. We plan every smile digitally, allowing you to preview proposed contours before final cementation.',
    durationMinutes: 60,
    startingPrice: 420,
    imageUrl: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    benefits: [
      'Stain-resistant high-grade ceramic',
      'Diagnostic wax-up preview prior to fitting',
      'Conservative tooth preparation technique',
      'Long-lasting aesthetic harmony'
    ]
  },
  {
    id: 'srv-7',
    name: 'Clear Aligners Consultation',
    category: 'Orthodontics',
    shortDescription: 'Digital 3D orthodontic assessment to discuss discrete, removable clear aligners for mild to moderate dental crowding.',
    fullDescription: 'Clear aligners provide a discreet alternative to conventional fixed braces. During this initial consultation, we conduct an intraoral 3D scan to evaluate your bite and determine whether aligner therapy is suitable for your goals.',
    durationMinutes: 45,
    startingPrice: 90,
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isActive: true,
    benefits: [
      'Digital 3D intraoral simulation',
      'Removable aligners for easy hygiene',
      'No metal brackets or wire adjustments',
      'Structured step-by-step review appointments'
    ]
  },
  {
    id: 'srv-8',
    name: 'Pediatric Dental Checkup',
    category: 'Pediatric',
    shortDescription: 'Warm, reassuring first dental visits and preventive fluoridation designed specifically for infants, children, and teens.',
    fullDescription: 'We focus on building positive dental memories from an early age. We guide parents on weaning, fluoride protection, dietary habits, and fissure sealants to help protect developing permanent teeth against cavities.',
    durationMinutes: 30,
    startingPrice: 45,
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    benefits: [
      'Gentle, child-friendly atmosphere',
      'Dietary & cavity prevention education',
      'Fissure sealants for molar protection',
      'Fun, reassuring introduction to the dental chair'
    ]
  },
  {
    id: 'srv-9',
    name: 'Emergency Dental Assessment',
    category: 'Emergency',
    shortDescription: 'Same-day urgent assessment for severe dental toothache, broken crowns, dental trauma, or sudden swelling.',
    fullDescription: 'Dental pain and accidental trauma require swift attention. We reserve dedicated daily emergency appointments to diagnose urgent problems, provide immediate pain relief, and stabilize damaged teeth.',
    durationMinutes: 30,
    startingPrice: 85,
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isActive: true,
    benefits: [
      'Priority assessment during clinic hours',
      'Diagnostic digital X-ray included',
      'Prompt pain stabilization & temporary dressings',
      'Clear, written treatment plan for follow-up'
    ]
  }
];

export const INITIAL_DENTISTS: Dentist[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    title: 'Lead Dental Surgeon & Clinical Director',
    qualifications: 'BDS (Hons), MFDS RCPS (Placeholder)',
    registrationNumber: 'Reg #GDC-84920 (Placeholder)',
    bio: 'Dr. Sarah Jenkins has dedicated over 14 years to compassionate family and restorative dentistry. Her clinical focus emphasizes preventative dental health, gentle treatment for anxious patients, and minimally invasive aesthetic bonding.',
    specialties: ['Comprehensive Care', 'Cosmetic Bonding', 'Nervous Patients', 'Preventative Dentistry'],
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    consultationFee: 65,
    isActive: true
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    title: 'Restorative & Endodontic Clinician',
    qualifications: 'BDS, MSc Restorative Dentistry (Placeholder)',
    registrationNumber: 'Reg #GDC-92144 (Placeholder)',
    bio: 'Dr. Marcus Vance focuses on complex crown restorations, dental trauma rehabilitation, and root canal therapy. He works closely with modern digital scanners and surgical magnification to ensure high precision and patient comfort.',
    specialties: ['Endodontics (Root Canals)', 'Crowns & Bridges', 'Digital Scanning', 'Dental Trauma'],
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    workingDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    consultationFee: 75,
    isActive: true
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova',
    title: 'Orthodontics & Aesthetic Dentist',
    qualifications: 'BDS, Dip Clear Aligner Therapy (Placeholder)',
    registrationNumber: 'Reg #GDC-104882 (Placeholder)',
    bio: 'Dr. Elena Rostova has a passion for functional occlusion, tooth alignment, and smile rejuvenation. She guides teenagers and adults through transparent clear aligner treatments with gentle, transparent communication at every visit.',
    specialties: ['Clear Aligners', 'Teeth Whitening', 'Porcelain Veneers', 'Smile Harmonization'],
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-fb75e25a2899?auto=format&fit=crop&w=600&q=80',
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    consultationFee: 70,
    isActive: true
  },
  {
    id: 'doc-4',
    name: 'Dr. David Chen',
    title: 'Pediatric & Family Dentist',
    qualifications: 'BDS, PG Cert Paediatric Oral Health (Placeholder)',
    registrationNumber: 'Reg #GDC-118305 (Placeholder)',
    bio: 'Known for his patient demeanor, Dr. David Chen is beloved by our younger patients and their families. He is passionate about making dental checkups an educational, worry-free milestone for children.',
    specialties: ['Pediatric Dentistry', 'Fissure Sealants', 'Preventive Fluoride', 'Early Intervention'],
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    workingDays: ['Monday', 'Tuesday', 'Friday', 'Saturday'],
    consultationFee: 55,
    isActive: true
  }
];

export const INITIAL_SCHEDULE_RULES: ClinicScheduleRule[] = [
  { dayOfWeek: 'Monday', isOpen: true, openTime: '08:30', closeTime: '17:30', breakStart: '13:00', breakEnd: '14:00', slotDurationMinutes: 30 },
  { dayOfWeek: 'Tuesday', isOpen: true, openTime: '08:30', closeTime: '18:00', breakStart: '13:00', breakEnd: '14:00', slotDurationMinutes: 30 },
  { dayOfWeek: 'Wednesday', isOpen: true, openTime: '08:30', closeTime: '18:00', breakStart: '13:00', breakEnd: '14:00', slotDurationMinutes: 30 },
  { dayOfWeek: 'Thursday', isOpen: true, openTime: '08:30', closeTime: '19:00', breakStart: '13:00', breakEnd: '14:00', slotDurationMinutes: 30 },
  { dayOfWeek: 'Friday', isOpen: true, openTime: '08:30', closeTime: '17:00', breakStart: '13:00', breakEnd: '14:00', slotDurationMinutes: 30 },
  { dayOfWeek: 'Saturday', isOpen: true, openTime: '09:00', closeTime: '14:00', breakStart: undefined, breakEnd: undefined, slotDurationMinutes: 30 },
  { dayOfWeek: 'Sunday', isOpen: false, openTime: '10:00', closeTime: '14:00', slotDurationMinutes: 30 }
];

export const INITIAL_SETTINGS: ClinicSettings = {
  clinicName: 'Ever Brooks Dentals',
  tagline: 'Your Smile, Our Priority.',
  phone: '+1 (229) 232-0933',
  emergencyPhone: '+1 (229) 232-0933',
  email: 'hello@everbrook.sbs',
  addressLine1: '580 California St',
  addressLine2: '',
  city: 'San Francisco',
  postalCode: 'CA 94104',
  country: 'United States',
  googleMapsEmbedUrl: '',
  onlineBookingEnabled: true,
  requireAdvanceNoticeHours: 4,
  maxAdvanceBookingDays: 60,
  cancellationPolicyNotice: 'We kindly request at least 24 hours notice for any appointment changes or cancellations so that we can offer the clinical slot to patients requiring care.',
  operatingHoursSummary: {
    weekdays: 'Mon - Fri: 8:30 AM – 6:00 PM (Thu until 7:00 PM)',
    saturday: 'Saturday: 9:00 AM – 2:00 PM',
    sunday: 'Sunday: Closed (Emergency on-call triage)'
  }
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    referenceNumber: 'WBD-2026-1049',
    patientName: 'Emma Richardson',
    patientEmail: 'emma.richardson@example.com (Demo)',
    patientPhone: '+1 (555) 203-9182',
    isExistingPatient: true,
    isEmergency: false,
    serviceId: 'srv-1',
    serviceName: 'Comprehensive Dental Examination',
    dentistId: 'doc-1',
    dentistName: 'Dr. Sarah Jenkins',
    appointmentDate: '2026-10-15',
    appointmentTime: '09:30',
    durationMinutes: 45,
    notes: 'Routine 6-month recall examination. Mild sensitivity reported on upper right molar.',
    status: 'confirmed',
    createdAt: '2026-10-10T09:12:00Z'
  },
  {
    id: 'apt-102',
    referenceNumber: 'WBD-2026-1050',
    patientName: 'James Montgomery',
    patientEmail: 'j.montgomery@example.com (Demo)',
    patientPhone: '+1 (555) 304-8172',
    isExistingPatient: false,
    isEmergency: false,
    serviceId: 'srv-2',
    serviceName: 'Dental Hygiene & Airflow Polishing',
    dentistId: 'doc-1',
    dentistName: 'Dr. Sarah Jenkins',
    appointmentDate: '2026-10-15',
    appointmentTime: '11:00',
    durationMinutes: 30,
    notes: 'New patient hygiene visit. Interested in gentle stain removal.',
    status: 'confirmed',
    createdAt: '2026-10-10T14:40:00Z'
  },
  {
    id: 'apt-103',
    referenceNumber: 'WBD-2026-1051',
    patientName: 'Hannah Davies',
    patientEmail: 'hannah.d@example.com (Demo)',
    patientPhone: '+1 (555) 441-9920',
    isExistingPatient: true,
    isEmergency: false,
    serviceId: 'srv-7',
    serviceName: 'Clear Aligners Consultation',
    dentistId: 'doc-3',
    dentistName: 'Dr. Elena Rostova',
    appointmentDate: '2026-10-16',
    appointmentTime: '14:30',
    durationMinutes: 45,
    notes: 'Interested in straightening lower incisors prior to summer event.',
    status: 'pending',
    createdAt: '2026-10-11T08:15:00Z'
  },
  {
    id: 'apt-104',
    referenceNumber: 'WBD-2026-1052',
    patientName: 'Liam Patterson',
    patientEmail: 'liam.p@example.com (Demo)',
    patientPhone: '+1 (555) 592-1134',
    isExistingPatient: false,
    isEmergency: true,
    serviceId: 'srv-9',
    serviceName: 'Emergency Dental Assessment',
    dentistId: 'doc-2',
    dentistName: 'Dr. Marcus Vance',
    appointmentDate: '2026-10-12',
    appointmentTime: '10:00',
    durationMinutes: 30,
    notes: 'Chipped front tooth while playing squash yesterday evening. In mild discomfort.',
    status: 'confirmed',
    createdAt: '2026-10-11T07:50:00Z'
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: 't-1',
    patientInitials: 'M. T.',
    patientRole: 'Patient since 2023 (Demo Placeholder)',
    rating: 5,
    service: 'Hygiene & Preventative Check',
    review: 'I had been anxious about visiting the dentist for nearly four years. Dr. Sarah and her team took the time to explain every step without rushing me. The clinic environment is exceptionally clean and calming.',
    date: 'September 2026'
  },
  {
    id: 't-2',
    patientInitials: 'R. K.',
    patientRole: 'Patient since 2024 (Demo Placeholder)',
    rating: 5,
    service: 'Clear Aligners Consultation',
    review: 'The 3D scan at Ever Brooks was fascinating to see, and the clinicians answered all my questions regarding treatment duration and retainer care.',
    date: 'August 2026'
  },
  {
    id: 't-3',
    patientInitials: 'A. B.',
    patientRole: 'Patient since 2025 (Demo Placeholder)',
    rating: 5,
    service: 'Emergency Dental Assessment',
    review: 'Managed to book a prompt assessment on a Thursday morning when my molar crown felt loose. Reassuring, pragmatic advice and sorted quickly with minimal disruption to my workday.',
    date: 'July 2026'
  }
];

export const CLINIC_FAQS = [
  {
    question: 'How do I book an appointment at Ever Brooks Dentals?',
    answer: 'You can book conveniently 24/7 through our online booking tool. Simply select your required dental service, choose an open date and time slot, and provide your contact details. You will receive an immediate confirmation.'
  },
  {
    question: 'What happens during my first visit as a new patient?',
    answer: 'Your first appointment is a comprehensive oral health assessment. We review your medical and dental history, take low-dose digital radiographs if indicated, examine your teeth, gums, and oral soft tissues, and discuss any personal concerns or smile goals before discussing next steps.'
  },
  {
    question: 'Do you accept dental insurance?',
    answer: 'Insurance is accepted. We provide itemized receipts and standard claim documentation that you can submit directly to your private dental insurer for reimbursement.'
  },
  {
    question: 'What should I do in a dental emergency?',
    answer: 'If you experience severe pain, facial swelling, or dental trauma during practice hours, please call our emergency triage number immediately or choose "Emergency Dental Assessment" in our online booking portal. For severe swelling affecting your breathing or swallowing, please contact emergency medical services (999/911/A&E).'
  },
  {
    question: 'How do you help nervous or anxious dental patients?',
    answer: 'Dental anxiety is very common, and we never judge. We offer a calm, unhurried atmosphere, explain sensations before they happen, use gentle numbing gels before local anaesthetic, and agree on a stop signal with your hand whenever you need a brief pause.'
  }
];
