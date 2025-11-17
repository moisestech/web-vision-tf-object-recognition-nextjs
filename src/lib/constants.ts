export const BASKET_MAX_LITERS = 120;
export const DETECT_CLASSES = ['bottle', 'cup', 'fork', 'knife', 'spoon'];

export interface MunicipalityTheme {
  primary: string; // Main action color (muted)
  primaryHover: string; // Hover state
  accent: string; // Highlight color
  cardBg: string; // Card background (tinted dark)
  border: string; // Border color (muted)
  textAccent: string; // Accent text color
}

export interface Municipality {
  id: string;
  name: string;
  region: string;
  description?: string;
  theme: MunicipalityTheme;
}

export const MUNICIPALITIES: Municipality[] = [
  {
    id: 'demo-miami',
    name: 'Miami',
    region: 'South Florida',
    description: 'Miami-Dade County coastal areas',
    theme: {
      primary: 'rgb(20, 184, 166)', // muted teal-500
      primaryHover: 'rgb(15, 118, 110)', // teal-600
      accent: 'rgb(13, 148, 136)', // ocean teal
      cardBg: 'rgb(19, 38, 42)', // dark teal-tinted slate
      border: 'rgb(45, 78, 85)', // muted teal border
      textAccent: 'rgb(94, 234, 212)', // teal-300
    },
  },
  {
    id: 'demo-hallandale',
    name: 'Hallandale Beach',
    region: 'South Florida',
    description: 'Broward County beachfront',
    theme: {
      primary: 'rgb(217, 187, 160)', // muted beige
      primaryHover: 'rgb(194, 160, 130)', // darker beige
      accent: 'rgb(245, 237, 220)', // warm cream
      cardBg: 'rgb(42, 38, 35)', // beige-tinted dark
      border: 'rgb(85, 75, 65)', // muted beige border
      textAccent: 'rgb(250, 240, 230)', // cream text
    },
  },
  {
    id: 'demo-key-biscayne',
    name: 'Key Biscayne',
    region: 'South Florida',
    description: 'Island municipality',
    theme: {
      primary: 'rgb(110, 231, 183)', // muted mint-400
      primaryHover: 'rgb(52, 211, 153)', // mint-500
      accent: 'rgb(16, 185, 129)', // tropical green
      cardBg: 'rgb(20, 38, 32)', // green-tinted dark
      border: 'rgb(45, 85, 70)', // muted green border
      textAccent: 'rgb(153, 246, 228)', // mint-300
    },
  },
  {
    id: 'demo-fort-lauderdale',
    name: 'Fort Lauderdale',
    region: 'South Florida',
    description: 'Venice of America',
    theme: {
      primary: 'rgb(103, 232, 249)', // muted aqua-400
      primaryHover: 'rgb(34, 211, 238)', // aqua-500
      accent: 'rgb(6, 182, 212)', // venetian blue/aqua
      cardBg: 'rgb(20, 35, 42)', // aqua-tinted dark
      border: 'rgb(45, 80, 95)', // muted aqua border
      textAccent: 'rgb(165, 243, 252)', // aqua-300
    },
  },
  {
    id: 'demo-miami-beach',
    name: 'Miami Beach',
    region: 'South Florida',
    description: 'Art Deco Historic District',
    theme: {
      primary: 'rgb(251, 146, 160)', // muted pink-400
      primaryHover: 'rgb(244, 114, 182)', // pink-500
      accent: 'rgb(244, 63, 94)', // art deco coral
      cardBg: 'rgb(42, 30, 35)', // pink-tinted dark
      border: 'rgb(85, 60, 75)', // muted pink border
      textAccent: 'rgb(252, 165, 165)', // pink-300
    },
  },
  {
    id: 'demo-coral-gables',
    name: 'Coral Gables',
    region: 'South Florida',
    description: 'The City Beautiful',
    theme: {
      primary: 'rgb(251, 146, 60)', // muted terracotta-400
      primaryHover: 'rgb(249, 115, 22)', // terracotta-500
      accent: 'rgb(234, 88, 12)', // mediterranean coral
      cardBg: 'rgb(42, 32, 25)', // terracotta-tinted dark
      border: 'rgb(85, 65, 50)', // muted terracotta border
      textAccent: 'rgb(253, 186, 116)', // terracotta-300
    },
  },
];

export function getMunicipality(id: string): Municipality | undefined {
  return MUNICIPALITIES.find((m) => m.id === id);
}

export function getDefaultMunicipality(): Municipality {
  return MUNICIPALITIES[0];
}
