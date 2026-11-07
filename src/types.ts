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

export interface DiningInfo {
  name: string;
  type: string;
  description: string;
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
  dining: DiningInfo;
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

export interface DbStats {
  connected: boolean;
  filePath: string;
  hotelsCount: number;
  roomsCount: number;
  reservationsCount: number;
  confirmedCount: number;
  checkedInCount: number;
  cancelledCount: number;
  lastUpdated: string;
}

export interface AvailabilityResult {
  available: boolean;
  availableRooms: number;
  totalInventory: number;
}
