export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavCategory = {
  label: string;
  highlighted: boolean;
  items: NavChild[];
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  categories?: NavCategory[];
  isMegaMenu?: boolean;
};

export const EMERGENCY_PHONE = '+2349062873290';
export const MEMBER_PORTAL_HREF = '/portal/login';
export const navItems: NavItem[] = [
  {
    label: 'Who We Are',
    href: '/who-we-are',
  },
  {
    label: 'Continental Presence',
    href: '/presence',
    children: [
      {
        label: 'Port Harcourt Centre',
        href: '/hubs/port-harcourt',
        description: 'Strategic Operations & Level-3 Readiness Hub',
      },
      {
        label: 'Regional Regulatory Navigator',
        href: '/presence/regulatory-navigator',
        description: 'Multi-jurisdictional compliance search tool',
      },
      {
        label: 'Response Footprint & Bases',
        href: '/presence/bases',
        description: 'Interactive map of 5 active and 3 proposed bases',
      },
      {
        label: 'Mobilization Protocol',
        href: '/presence/mobilization-protocol',
        description: 'Crisis-to-Containment 4-step deployment flowchart',
      },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    isMegaMenu: true,
    categories: [
      {
        label: 'Category A: Incident Response',
        highlighted: true,
        items: [
          { label: 'Tier-2 & Tier-3 Response', href: '/services/incident-response' },
          { label: 'Shoreline & Wildlife Recovery', href: '/services/shoreline-recovery' },
        ],
      },
      {
        label: 'Category B: Readiness & Preparedness',
        highlighted: false,
        items: [
          { label: 'Training & Certification (IMO)', href: '/services/imo-training' },
          { label: 'Equipment Maintenance (Vikoma)', href: '/services/equipment-maintenance' },
          { label: 'Consultancy & Contingency Planning', href: '/services/consultancy' },
        ],
      },
    ],
  },
  { label: 'Assets', href: '/assets' },
  { label: 'Knowledge Hub', href: '/knowledge' },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Regional Liaison', href: '/contact' },
      { label: 'Career Portal', href: '/careers' },
    ],
  },
];