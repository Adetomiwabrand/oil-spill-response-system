export interface WPTitle {
  rendered: string;
}

// ── ASSETS ──────────────────────────────────────────────
export interface WPAssetACF {
  model_number: string;
  flow_rate: string;                    // empty string when not set
  deployment_time: string;
  // ACF field has a trailing-colon typo in the REST response ("operational_status:")
  // Both keys are typed here; wpToRow() reads the typo key with a fallback.
  'operational_status:': string;
  operational_status: string;           // fallback if typo is ever corrected in WP
  category?: 'booms' | 'skimmers' | 'logistics';
  technical_data_sheet?: string | false; // URL string or false when not uploaded
  spec_pdf?: string | false;             // URL string or false when not uploaded
  weight: string;                        // stored as numeric string e.g. "2800"
  emergency_class?: string[];            // multi-select array e.g. ["tier_1", "tier_2"]
}

export interface WPAsset {
  id: number;
  slug: string;
  title: WPTitle;
  content: WPTitle;                     // .rendered holds the plain-text description
  acf: WPAssetACF;
}

// ── BASES ────────────────────────────────────────────────
export interface WPBaseACF {
  region: string;
  coordinates: string;
  operational_status: 'active' | 'standby' | 'offline';
  capacity_personnel: number;
  equipment_summary: string;
  contact_number: string;
  map_url?: string;
}

export interface WPBase {
  id: number;
  slug: string;
  title: WPTitle;
  acf: WPBaseACF;
}

// ── REGULATORY DOCS ──────────────────────────────────────
export interface WPRegulatoryDocACF {
  doc_code: string;
  issuing_body: 'NOSDRA' | 'IMO' | 'NUPRC' | 'NIMASA' | 'DPR / NUPRC' | 'GNPC / EPA Ghana' | 'EPA Ghana' | 'ANPG / MINAMB' | 'DFFE / SAMSA' | 'SAMSA' | 'NEMA Kenya / KMA';
  jurisdiction: 'Nigeria' | 'Ghana' | 'Cameroon' | 'Equatorial Guinea' | 'Gabon' | 'Angola' | 'Kenya' | 'Tanzania' | 'Mozambique' | 'South Africa' | 'International (IMO)';
  effective_date: string;
  doc_type: 'regulation' | 'guideline' | 'standard';
  summary: string;
  clause_reference: string;
  full_document?: { url: string; filename: string } | false;
}

export interface WPRegulatoryDoc {
  id: number;
  slug: string;
  title: WPTitle;
  acf: WPRegulatoryDocACF;
}

// ── TRAINING COURSES ─────────────────────────────────────
export interface WPTrainingCourseACF {
  imo_level: 'level_1' | 'level_2' | 'level_3';
  duration: string;
  next_date: string;
  location: string;
  max_participants: number;
  prerequisites: string;
  certification_body: string;
  booking_contact: string;
}

export interface WPTrainingCourse {
  id: number;
  slug: string;
  title: WPTitle;
  acf: WPTrainingCourseACF;
}

// ── EVENTS (Item 1 — CPT pending creation in WP) ────────
export interface WPEventACF {
  event_date: string;                   // Human-readable e.g. "October 14, 2026" or YYYYMMDD
  event_location: string;
  event_description: string;
  event_flyer: { url: string; alt: string; ID: number } | string | false;
  event_link: string;
}


export interface WPEvent {
  id: number;
  slug: string;
  title: WPTitle;
  acf: WPEventACF;
}

// ── BLOG POSTS (Item 3 — standard WP Posts) ─────────────
export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: WPTitle;
  excerpt: WPTitle;
  content: WPTitle;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
  };
}
