import fs from 'node:fs';
import path from 'node:path';

export interface Room {
  id: string;
  name: string;
  sizeM2: number;
  bedType: string;
  view: string;
  maxGuests: number;
  pricePerNight: number;
  currency: 'EUR' | 'GBP' | 'CHF';
  totalInventory: number;
  image: string;
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  neighborhood: string;
  address: string;
  tagline: string;
  description: string;
  image: string;
  amenities: string[];
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  dining: {
    name: string;
    type: string;
    description: string;
  };
  rooms: Room[];
}

export interface Reservation {
  id: string;
  bookingReference: string;
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  adults: number;
  children: number;
  roomsCount: number;
  pricePerNight: number;
  totalPrice: number;
  currency: 'EUR' | 'GBP' | 'CHF';
  status: 'Confirmed' | 'Checked-In' | 'Completed' | 'Cancelled';
  addOns: string[];
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandSettings {
  brandName: string;
  tagline: string;
  logoType: 'text_with_monogram' | 'custom_image' | 'monogram_only';
  logoImageUrl: string;
  monogramText: string;
  conciergePhone: string;
  reservationEmail: string;
  corporateAddress: string;
  whatsappNumber: string;
  instagram: string;
  linkedin: string;
  receptionHours: string;
  customFooterNote: string;
}

export interface DatabaseSchema {
  version: number;
  lastUpdated: string;
  settings: BrandSettings;
  hotels: Hotel[];
  reservations: Reservation[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

const INITIAL_SETTINGS: BrandSettings = {
  brandName: 'Miirovelle',
  tagline: 'Brilliantly Considered European Boutique Stays',
  logoType: 'text_with_monogram',
  logoImageUrl: '',
  monogramText: 'M',
  conciergePhone: '+1 307 998 1342',
  reservationEmail: 'reservations@miirovelle.com',
  corporateAddress: '4 Boulevard Raspail, 75007 Paris, France',
  whatsappNumber: '+1 307 998 1342',
  instagram: '@miirovellehotels',
  linkedin: 'linkedin.com/company/miirovelle',
  receptionHours: '24/7 Guest Relations & Multilingual Concierge',
  customFooterNote: 'A bespoke collection of neighborhood European hotels, brilliantly considered for curious travelers.'
};

const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'le-grand-hotel-cayre',
    name: 'Le Grand Hôtel Cayré',
    city: 'Paris',
    country: 'France',
    neighborhood: 'Saint-Germain-des-Prés',
    address: '4 Boulevard Raspail, 75007 Paris',
    tagline: 'Literary soul, Parisian balconies & Belle Époque elegance',
    description: 'Nestled on the iconic Boulevard Raspail, Le Grand Hôtel Cayré pays homage to the creative luminaries of Saint-Germain-des-Prés. Features the celebrated Annette cocktail bar, warm Parisian brass tones, and quiet leafy courtyard salons.',
    image: '/src/assets/images/hero_miirovelle_paris_1793926422274.jpg',
    amenities: [
      'Annette Cocktail Lounge & Brasserie',
      'Saint-Germain Neighborhood Concierge',
      'Bespoke Sleep Program & Pillow Menu',
      'In-Room French Vinyl Players & Library',
      'Artisan Morning Bakery Basket',
      'Technogym Wellness Studio'
    ],
    phone: '+33 1 89 20 44 00',
    email: 'cayre@miirovelle.com',
    rating: 4.9,
    reviewsCount: 342,
    dining: {
      name: 'Annette Bar & Brasserie',
      type: 'French Bistro & Speakeasy Bar',
      description: 'Handcrafted vermouth cocktails, bistro classics, and velvet lounge banquettes frequented by Parisian locals.'
    },
    rooms: [
      {
        id: 'cayre-classic',
        name: 'Classic Queen',
        sizeM2: 21,
        bedType: 'Queen Bed',
        view: 'Quiet Interior Courtyard',
        maxGuests: 2,
        pricePerNight: 380,
        currency: 'EUR',
        totalInventory: 10,
        image: '/src/assets/images/hero_miirovelle_paris_1793926422274.jpg',
        features: ['Courtyard quiet', 'Rain shower', 'Marshall speaker', 'Diptyque amenities']
      },
      {
        id: 'cayre-superior-boulevard',
        name: 'Superior Boulevard Room',
        sizeM2: 27,
        bedType: 'King Bed',
        view: 'Boulevard Raspail & Parisian Rooftops',
        maxGuests: 2,
        pricePerNight: 490,
        currency: 'EUR',
        totalInventory: 8,
        image: '/src/assets/images/hero_miirovelle_paris_1793926422274.jpg',
        features: ['Wrought-iron French balcony', 'Boulevard views', 'Velvet daybed', 'Espresso bar']
      },
      {
        id: 'cayre-deluxe-terrace',
        name: 'Deluxe Private Terrace',
        sizeM2: 35,
        bedType: 'King Bed',
        view: 'Panoramic Paris Skyline & Courtyard',
        maxGuests: 3,
        pricePerNight: 680,
        currency: 'EUR',
        totalInventory: 4,
        image: '/src/assets/images/hero_miirovelle_paris_1793926422274.jpg',
        features: ['Furnished private stone terrace', 'Bathtub & double vanity', 'Breakfast al fresco', 'Butler service']
      },
      {
        id: 'cayre-signature-suite',
        name: 'Saint-Germain Signature Suite',
        sizeM2: 54,
        bedType: 'Super King Bed',
        view: 'Boulevard Raspail Corner Panoramas',
        maxGuests: 4,
        pricePerNight: 1150,
        currency: 'EUR',
        totalInventory: 2,
        image: '/src/assets/images/hero_miirovelle_paris_1793926422274.jpg',
        features: ['Separate salon lounge', 'Soaking marble tub', 'VIP airport transfer', 'Curated art book library']
      }
    ]
  },
  {
    id: 'borneta',
    name: 'Borneta',
    city: 'Barcelona',
    country: 'Spain',
    neighborhood: 'El Born',
    address: 'Passeig de Picasso 26, 08003 Barcelona',
    tagline: 'Mediterranean warmth, Catalan craftsmanship & sunlit courtyards',
    description: 'Set in the artistic heart of El Born opposite Ciutadella Park, Borneta embraces sun-warmed terracotta, arched loggias, Volta restaurant, and a rooftop terrace with views across to Santa Maria del Mar.',
    image: '/src/assets/images/hotel_borneta_barcelona_1793926422956.jpg',
    amenities: [
      'Volta Restaurant & Courtyard Bar',
      'Rooftop Plunge Pool & Solarium',
      'Custom Catalan Ceramic Workshops',
      'Complimentary Vintage Urban Bicycles',
      'Daily Mediterranean Tapas Hour',
      'Linen Lounge & Botanical Atrium'
    ],
    phone: '+34 93 220 88 50',
    email: 'borneta@miirovelle.com',
    rating: 4.9,
    reviewsCount: 289,
    dining: {
      name: 'Volta Restaurant',
      type: 'Catalan Open-Fire Grill',
      description: 'Charred seasonal Mediterranean produce, natural Spanish wines, and dining under atmospheric arches.'
    },
    rooms: [
      {
        id: 'borneta-cosy',
        name: 'Cosy Queen Courtyard',
        sizeM2: 22,
        bedType: 'Queen Bed',
        view: 'Internal Botanical Atrium',
        maxGuests: 2,
        pricePerNight: 270,
        currency: 'EUR',
        totalInventory: 12,
        image: '/src/assets/images/hotel_borneta_barcelona_1793926422956.jpg',
        features: ['Quiet atrium view', 'Lime-wash walls', 'Organic cotton sheets', 'Walk-in shower']
      },
      {
        id: 'borneta-terracotta',
        name: 'Terracotta Superior Room',
        sizeM2: 29,
        bedType: 'King Bed',
        view: 'Passeig de Picasso & Park',
        maxGuests: 2,
        pricePerNight: 360,
        currency: 'EUR',
        totalInventory: 8,
        image: '/src/assets/images/hotel_borneta_barcelona_1793926422956.jpg',
        features: ['Catalan vaulted ceiling', 'French Juliet balcony', 'Terracotta tiles', 'Artisan minibar']
      },
      {
        id: 'borneta-picasso-suite',
        name: 'Passeig de Picasso Junior Suite',
        sizeM2: 46,
        bedType: 'King Bed',
        view: 'Ciutadella Park & Historic Born Spire',
        maxGuests: 3,
        pricePerNight: 580,
        currency: 'EUR',
        totalInventory: 3,
        image: '/src/assets/images/hotel_borneta_barcelona_1793926422956.jpg',
        features: ['Private terrace lounge', 'Freestanding ceramic bathtub', 'Complimentary cava', 'Dedicated host']
      }
    ]
  },
  {
    id: 'templeton-garden',
    name: 'Templeton Garden',
    city: 'London',
    country: 'United Kingdom',
    neighborhood: 'Kensington / Earl’s Court',
    address: '15 Templeton Place, London SW5 9NB',
    tagline: 'A private botanical sanctuary within a historic Victorian townhouse',
    description: 'Encircled by an exclusive one-acre landscaped private garden, Templeton Garden offers an English botanical retreat featuring an airy glasshouse Orangery restaurant, tranquil reading library, and garden cocktail terrace.',
    image: '/src/assets/images/hotel_templeton_london_1793926423211.jpg',
    amenities: [
      'Private 1-Acre Landscaped English Garden',
      'The Orangery All-Day Glasshouse Dining',
      'Bespoke Botanical Gin Bar & Tasting Room',
      'Morning Garden Vinyasa & Pilates',
      'Curated Library & Fireplace Parlour',
      'Complimentary Pashley Town Bicycles'
    ],
    phone: '+44 20 7946 0912',
    email: 'templeton@miirovelle.com',
    rating: 4.8,
    reviewsCount: 215,
    dining: {
      name: 'The Orangery',
      type: 'Botanical British Glasshouse',
      description: 'Morning pastries, seasonal British roasts, afternoon tea, and botanical garden-infused aperitifs.'
    },
    rooms: [
      {
        id: 'templeton-classic',
        name: 'Garden Queen Room',
        sizeM2: 23,
        bedType: 'Queen Bed',
        view: 'Victorian Townhouse Garden',
        maxGuests: 2,
        pricePerNight: 310,
        currency: 'GBP',
        totalInventory: 10,
        image: '/src/assets/images/hotel_templeton_london_1793926423211.jpg',
        features: ['Garden vista', 'English heritage fabrics', 'Bramley botanical toiletries', 'Goose down bedding']
      },
      {
        id: 'templeton-townhouse-king',
        name: 'Townhouse King Deluxe',
        sizeM2: 32,
        bedType: 'King Bed',
        view: 'Templeton Place Tree-Lined Crescent',
        maxGuests: 2,
        pricePerNight: 420,
        currency: 'GBP',
        totalInventory: 6,
        image: '/src/assets/images/hotel_templeton_london_1793926423211.jpg',
        features: ['Victorian sash bay windows', 'Separate reading armchair', 'Cast iron radiator charm', 'Fresh flower delivery']
      },
      {
        id: 'templeton-conservatory-suite',
        name: 'Conservatory Garden Suite',
        sizeM2: 52,
        bedType: 'Super King Bed',
        view: 'Private Garden Direct Veranda',
        maxGuests: 3,
        pricePerNight: 790,
        currency: 'GBP',
        totalInventory: 2,
        image: '/src/assets/images/hotel_templeton_london_1793926423211.jpg',
        features: ['Direct garden access', 'Roll-top clawfoot bath', 'Fireplace lounge', 'Private garden breakfast']
      }
    ]
  },
  {
    id: 'the-mansard-gstaad',
    name: 'The Mansard',
    city: 'Gstaad',
    country: 'Switzerland',
    neighborhood: 'Bernese Oberland / Promenade',
    address: 'Untergstaadstrasse 28, 3780 Gstaad',
    tagline: 'Swiss alpine sanctuary, timber warmth & panoramic mountain vistas',
    description: 'Set in the storybook alpine village of Gstaad, The Mansard reimagines Swiss chalet living with exposed timber balconies, Finnish rooftop sauna overlooking the peaks, and fireside fondue & natural wine salon.',
    image: '/src/assets/images/hotel_mansard_gstaad_1793988153499.jpg',
    amenities: [
      'Panoramic Rooftop Alpine Sauna',
      'Fireside Fondue & Natural Wine Lounge',
      'Ski Valet & Private Mountain Concierge',
      'Bespoke Swiss Sleep Ritual & Down Linens',
      'Complimentary E-Bikes & Winter Snowshoes',
      'Heated Boot & Alpine Gear Parlour'
    ],
    phone: '+41 33 748 40 40',
    email: 'mansard.gstaad@miirovelle.com',
    rating: 4.9,
    reviewsCount: 184,
    dining: {
      name: 'The Mansard Alpine Lounge',
      type: 'Swiss Mountain Brasserie & Hearth Bar',
      description: 'Artisan Alpine raclette, truffled fondue, and herbal spirits warmed by crackling timber hearths.'
    },
    rooms: [
      {
        id: 'gstaad-deluxe-timber',
        name: 'Deluxe Timber Room',
        sizeM2: 28,
        bedType: 'King Bed',
        view: 'Mountain Valley & Gstaad Village',
        maxGuests: 2,
        pricePerNight: 480,
        currency: 'CHF',
        totalInventory: 8,
        image: '/src/assets/images/hotel_mansard_gstaad_1793988153499.jpg',
        features: ['Swiss pine timber panels', 'Rain shower', 'Alpine balcony', 'Nespresso station']
      },
      {
        id: 'gstaad-balcony-suite',
        name: 'Alpine Balcony Suite',
        sizeM2: 44,
        bedType: 'Super King Bed',
        view: 'Bernese Alps Panoramic Ridge',
        maxGuests: 3,
        pricePerNight: 720,
        currency: 'CHF',
        totalInventory: 4,
        image: '/src/assets/images/hotel_mansard_gstaad_1793988153499.jpg',
        features: ['Private wooden terrace', 'Fireplace sitting nook', 'Free-standing soaking tub', 'Ski pass concierge']
      },
      {
        id: 'gstaad-chalet-penthouse',
        name: 'The Mansard Chalet Penthouse',
        sizeM2: 68,
        bedType: 'Super King Bed',
        view: '360° Alpine Glacier Horizon',
        maxGuests: 4,
        pricePerNight: 1280,
        currency: 'CHF',
        totalInventory: 2,
        image: '/src/assets/images/hotel_mansard_gstaad_1793988153499.jpg',
        features: ['Open stone fireplace', 'Direct elevator access', 'Private sauna access', 'Chauffeur limousine transfer']
      }
    ]
  },
  {
    id: 'palais-rudolf',
    name: 'Palais Rudolf',
    city: 'Vienna',
    country: 'Austria',
    neighborhood: 'Innere Stadt / Ringstraße',
    address: 'Rudolfsplatz 6, 1010 Vienna',
    tagline: 'Imperial neoclassical grandeur, soaring stucco salons & Ringstraße legacy',
    description: 'A restored 19th-century Viennese palace near the Danube Canal and Stephansplatz, Palais Rudolf balances monumental neoclassical columns, chandelier-lit salons, and contemporary bespoke luxury.',
    image: '/src/assets/images/hotel_palais_rudolf_1793988153526.jpg',
    amenities: [
      'Imperial Salon & Champagne Library',
      'Private Marble Spa & Roman Bath',
      'Concierge Royal Opera Box Access',
      'Bespoke Viennese Coffee Roastery',
      'Private Chauffeur Mercedes Maybach',
      'Historic High-Ceiling Stucco Suites'
    ],
    phone: '+43 1 533 1890',
    email: 'palais.rudolf@miirovelle.com',
    rating: 4.9,
    reviewsCount: 226,
    dining: {
      name: 'Rudolf Imperial Salon',
      type: 'Modern Viennese Grand Café & Bar',
      description: 'Classic Wiener Schnitzel elevated with modern flair, Sachertorte crafsmanship, and Austrian grand reserve wines.'
    },
    rooms: [
      {
        id: 'palais-deluxe-court',
        name: 'Imperial Court Deluxe',
        sizeM2: 30,
        bedType: 'King Bed',
        view: 'Neoclassical Inner Courtyard',
        maxGuests: 2,
        pricePerNight: 410,
        currency: 'EUR',
        totalInventory: 8,
        image: '/src/assets/images/hotel_palais_rudolf_1793988153526.jpg',
        features: ['4-meter ceilings', 'Chevron oak floor', 'Deep marble bath', 'Bespoke bar']
      },
      {
        id: 'palais-heritage-suite',
        name: 'Grand Heritage Suite',
        sizeM2: 50,
        bedType: 'Super King Bed',
        view: 'Rudolfsplatz Historic Square',
        maxGuests: 3,
        pricePerNight: 690,
        currency: 'EUR',
        totalInventory: 4,
        image: '/src/assets/images/hotel_palais_rudolf_1793988153526.jpg',
        features: ['Crystal chandeliers', 'Separate dressing salon', 'French balcony', 'Butler service']
      },
      {
        id: 'palais-presidential',
        name: 'The Rudolf Palace Suite',
        sizeM2: 78,
        bedType: 'Super King Bed',
        view: 'Vienna Imperial Ringstraße Panoramas',
        maxGuests: 4,
        pricePerNight: 1350,
        currency: 'EUR',
        totalInventory: 2,
        image: '/src/assets/images/hotel_palais_rudolf_1793988153526.jpg',
        features: ['Private historic salon', 'Double marble bathrooms', 'Opera VIP tickets included', 'Personal chauffeur']
      }
    ]
  },
  {
    id: 'spittelberg',
    name: 'Spittelberg',
    city: 'Vienna',
    country: 'Austria',
    neighborhood: 'Spittelberg / MuseumsQuartier',
    address: 'Breite Gasse 12, 1070 Vienna',
    tagline: 'Viennese bohemian soul, chevron oak ateliers & artisan courtyards',
    description: 'Nestled in the cobblestoned artisan enclave of Spittelberg next to the MuseumsQuartier, Spittelberg combines chevron oak parquet, tailored mid-century furniture, natural wine bar, and tranquil leafy courtyards.',
    image: '/src/assets/images/hotel_mansard_vienna_1793926424465.jpg',
    amenities: [
      'Salon Café & Natural Wine Bar',
      'MuseumsQuartier VIP Cultural Passes',
      'Audiophile Vinyl Listening Parlour',
      'Finnish Pine Rooftop Sauna',
      'Complimentary Artisan City Bikes',
      'Quiet Cobblestone Courtyard'
    ],
    phone: '+43 1 512 8840',
    email: 'spittelberg@miirovelle.com',
    rating: 4.8,
    reviewsCount: 210,
    dining: {
      name: 'Spittelberg Salon & Wine Bar',
      type: 'Modern Viennese Café & Natural Wine',
      description: 'Artisan melange coffee, hand-laminated tortes, and biodynamic Austrian wines from Wachau and Burgenland.'
    },
    rooms: [
      {
        id: 'spittelberg-atelier',
        name: 'Atelier Queen Room',
        sizeM2: 24,
        bedType: 'Queen Bed',
        view: 'Cobblestoned Spittelberg Lane',
        maxGuests: 2,
        pricePerNight: 290,
        currency: 'EUR',
        totalInventory: 9,
        image: '/src/assets/images/hotel_mansard_vienna_1793926424465.jpg',
        features: ['Chevron oak parquet', 'Plaster ceiling molding', 'Globe pendant lighting', 'Custom walnut desk']
      },
      {
        id: 'spittelberg-salon-king',
        name: 'Spittelberg Salon King',
        sizeM2: 33,
        bedType: 'King Bed',
        view: 'MuseumsQuartier Architectural Horizon',
        maxGuests: 2,
        pricePerNight: 390,
        currency: 'EUR',
        totalInventory: 7,
        image: '/src/assets/images/hotel_mansard_vienna_1793926424465.jpg',
        features: ['Velvet chaise lounge', 'Marble en-suite with double shower', 'Curated art pieces', 'Espresso station']
      },
      {
        id: 'spittelberg-penthouse',
        name: 'Bohemian Rooftop Penthouse',
        sizeM2: 58,
        bedType: 'Super King Bed',
        view: '360° Panoramic Vienna Skyline',
        maxGuests: 3,
        pricePerNight: 890,
        currency: 'EUR',
        totalInventory: 2,
        image: '/src/assets/images/hotel_mansard_vienna_1793926424465.jpg',
        features: ['Private rooftop deck', 'Fireplace salon', 'Personal sauna access', 'Chauffeur airport transfer']
      }
    ]
  }
];

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res_173001',
    bookingReference: 'MRV-88219',
    hotelId: 'le-grand-hotel-cayre',
    hotelName: 'Le Grand Hôtel Cayré',
    hotelCity: 'Paris',
    roomId: 'cayre-superior-boulevard',
    roomName: 'Superior Boulevard Room',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    guestPhone: '+33 6 12 34 56 78',
    checkIn: '2026-11-10',
    checkOut: '2026-11-14',
    nights: 4,
    adults: 2,
    children: 0,
    roomsCount: 1,
    pricePerNight: 490,
    totalPrice: 1960,
    currency: 'EUR',
    status: 'Confirmed',
    addOns: ['Artisan French Breakfast Daily', 'Champagne & Macarons on Arrival'],
    specialRequests: 'High floor preferred, arriving around 3 PM.',
    createdAt: '2026-11-01T10:14:00.000Z',
    updatedAt: '2026-11-01T10:14:00.000Z'
  },
  {
    id: 'res_173002',
    bookingReference: 'MRV-49120',
    hotelId: 'borneta',
    hotelName: 'Borneta',
    hotelCity: 'Barcelona',
    roomId: 'borneta-terracotta',
    roomName: 'Terracotta Superior Room',
    guestName: 'Mateo Morales',
    guestEmail: 'mateo.m@designstudio.es',
    guestPhone: '+34 654 987 321',
    checkIn: '2026-11-08',
    checkOut: '2026-11-12',
    nights: 4,
    adults: 2,
    children: 0,
    roomsCount: 1,
    pricePerNight: 360,
    totalPrice: 1440,
    currency: 'EUR',
    status: 'Checked-In',
    addOns: ['Catalan Vineyard Wine Tasting Pass'],
    specialRequests: 'Celebrating wedding anniversary.',
    createdAt: '2026-10-28T14:32:00.000Z',
    updatedAt: '2026-11-05T15:00:00.000Z'
  },
  {
    id: 'res_173003',
    bookingReference: 'MRV-61845',
    hotelId: 'templeton-garden',
    hotelName: 'Templeton Garden',
    hotelCity: 'London',
    roomId: 'templeton-conservatory-suite',
    roomName: 'Conservatory Garden Suite',
    guestName: 'Lady Catherine Spencer',
    guestEmail: 'catherine.spencer@heritage.co.uk',
    guestPhone: '+44 7700 900142',
    checkIn: '2026-11-15',
    checkOut: '2026-11-18',
    nights: 3,
    adults: 2,
    children: 1,
    roomsCount: 1,
    pricePerNight: 790,
    totalPrice: 2370,
    currency: 'GBP',
    status: 'Confirmed',
    addOns: ['Private English Garden Breakfast Service', 'Chauffeur Heathrow Airport Transfer'],
    specialRequests: 'Extra hypoallergenic pillows and late check-out at 1 PM.',
    createdAt: '2026-11-03T09:20:00.000Z',
    updatedAt: '2026-11-03T09:20:00.000Z'
  }
];

class LocalDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadDatabase(): DatabaseSchema {
    this.ensureDirectory();
    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        const existingHotels = Array.isArray(parsed.hotels) ? parsed.hotels : [];
        // Ensure all 6 hotels from INITIAL_HOTELS are present
        const mergedHotels = INITIAL_HOTELS.map((initial) => {
          const found = existingHotels.find((h: Hotel) => h.id === initial.id);
          return found || initial;
        });

        const merged: DatabaseSchema = {
          version: parsed.version || 1,
          lastUpdated: new Date().toISOString(),
          settings: { ...INITIAL_SETTINGS, ...(parsed.settings || {}) },
          hotels: mergedHotels,
          reservations: Array.isArray(parsed.reservations) ? parsed.reservations : INITIAL_RESERVATIONS,
        };
        this.saveToDisk(merged);
        return merged;
      } catch (err) {
        console.error('[LocalDatabase] Error reading database file, initializing defaults:', err);
      }
    }

    const initial: DatabaseSchema = {
      version: 1,
      lastUpdated: new Date().toISOString(),
      settings: INITIAL_SETTINGS,
      hotels: INITIAL_HOTELS,
      reservations: INITIAL_RESERVATIONS,
    };
    this.saveToDisk(initial);
    return initial;
  }

  private saveToDisk(dataToSave?: DatabaseSchema) {
    this.ensureDirectory();
    const data = dataToSave || this.data;
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Settings
  public getSettings(): BrandSettings {
    return this.data.settings;
  }

  public updateSettings(newSettings: Partial<BrandSettings>): BrandSettings {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.saveToDisk();
    return this.data.settings;
  }

  // Hotels
  public getHotels(): Hotel[] {
    return this.data.hotels;
  }

  public getHotelById(id: string): Hotel | undefined {
    return this.data.hotels.find((h) => h.id === id);
  }

  // Reservations
  public getReservations(filter?: { hotelId?: string; status?: string; search?: string }): Reservation[] {
    let list = [...this.data.reservations];
    if (filter?.hotelId && filter.hotelId !== 'all') {
      list = list.filter((r) => r.hotelId === filter.hotelId);
    }
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((r) => r.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (r) =>
          r.bookingReference.toLowerCase().includes(q) ||
          r.guestName.toLowerCase().includes(q) ||
          r.guestEmail.toLowerCase().includes(q) ||
          r.hotelName.toLowerCase().includes(q) ||
          r.roomName.toLowerCase().includes(q)
      );
    }
    // Sort newest first
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getReservationByReference(reference: string, email?: string): Reservation | undefined {
    const ref = reference.trim().toUpperCase();
    return this.data.reservations.find((r) => {
      const matchesRef = r.bookingReference.toUpperCase() === ref;
      if (!matchesRef) return false;
      if (email) {
        return r.guestEmail.trim().toLowerCase() === email.trim().toLowerCase();
      }
      return true;
    });
  }

  public checkAvailability(hotelId: string, roomId: string, checkIn: string, checkOut: string): {
    available: boolean;
    availableRooms: number;
    totalInventory: number;
  } {
    const hotel = this.getHotelById(hotelId);
    if (!hotel) return { available: false, availableRooms: 0, totalInventory: 0 };
    const room = hotel.rooms.find((rm) => rm.id === roomId);
    if (!room) return { available: false, availableRooms: 0, totalInventory: 0 };

    const reqStart = new Date(checkIn).getTime();
    const reqEnd = new Date(checkOut).getTime();

    // Find overlapping active reservations for this room type
    const activeReservations = this.data.reservations.filter((res) => {
      if (res.hotelId !== hotelId || res.roomId !== roomId) return false;
      if (res.status === 'Cancelled') return false;

      const resStart = new Date(res.checkIn).getTime();
      const resEnd = new Date(res.checkOut).getTime();

      // Check overlap: start < reqEnd && end > reqStart
      return resStart < reqEnd && resEnd > reqStart;
    });

    const bookedCount = activeReservations.reduce((acc, curr) => acc + (curr.roomsCount || 1), 0);
    const availableRooms = Math.max(0, room.totalInventory - bookedCount);

    return {
      available: availableRooms > 0,
      availableRooms,
      totalInventory: room.totalInventory
    };
  }

  public createReservation(reservationData: Omit<Reservation, 'id' | 'bookingReference' | 'createdAt' | 'updatedAt' | 'status'> & { status?: Reservation['status'] }): Reservation {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingReference = `MRV-${randomSuffix}`;
    const id = `res_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const newReservation: Reservation = {
      ...reservationData,
      id,
      bookingReference,
      status: reservationData.status || 'Confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.reservations.push(newReservation);
    this.saveToDisk();
    return newReservation;
  }

  public updateReservationStatus(id: string, status: Reservation['status']): Reservation | null {
    const res = this.data.reservations.find((r) => r.id === id);
    if (!res) return null;
    res.status = status;
    res.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return res;
  }

  public updateReservation(id: string, updates: Partial<Reservation>): Reservation | null {
    const index = this.data.reservations.findIndex((r) => r.id === id);
    if (index === -1) return null;
    this.data.reservations[index] = {
      ...this.data.reservations[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveToDisk();
    return this.data.reservations[index];
  }

  public deleteReservation(id: string): boolean {
    const index = this.data.reservations.findIndex((r) => r.id === id);
    if (index === -1) return false;
    this.data.reservations.splice(index, 1);
    this.saveToDisk();
    return true;
  }

  public resetToDefaults(): DatabaseSchema {
    this.data = {
      version: 1,
      lastUpdated: new Date().toISOString(),
      settings: INITIAL_SETTINGS,
      hotels: INITIAL_HOTELS,
      reservations: INITIAL_RESERVATIONS,
    };
    this.saveToDisk();
    return this.data;
  }

  public exportData(): DatabaseSchema {
    return this.data;
  }

  public importData(imported: Partial<DatabaseSchema>): DatabaseSchema {
    if (imported.settings) this.data.settings = { ...this.data.settings, ...imported.settings };
    if (Array.isArray(imported.hotels) && imported.hotels.length > 0) this.data.hotels = imported.hotels;
    if (Array.isArray(imported.reservations)) this.data.reservations = imported.reservations;
    this.saveToDisk();
    return this.data;
  }

  public getStats() {
    return {
      connected: true,
      filePath: DB_FILE,
      hotelsCount: this.data.hotels.length,
      roomsCount: this.data.hotels.reduce((acc, h) => acc + h.rooms.length, 0),
      reservationsCount: this.data.reservations.length,
      confirmedCount: this.data.reservations.filter((r) => r.status === 'Confirmed').length,
      checkedInCount: this.data.reservations.filter((r) => r.status === 'Checked-In').length,
      cancelledCount: this.data.reservations.filter((r) => r.status === 'Cancelled').length,
      lastUpdated: this.data.lastUpdated
    };
  }
}

export const localDb = new LocalDatabase();
