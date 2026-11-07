import { Hotel, Reservation, BrandSettings, DbStats, AvailabilityResult } from '../types';

export const api = {
  async getHotels(): Promise<Hotel[]> {
    const res = await fetch('/api/hotels');
    if (!res.ok) throw new Error('Failed to fetch hotels from local database');
    return res.json();
  },

  async getHotel(id: string): Promise<Hotel> {
    const res = await fetch(`/api/hotels/${id}`);
    if (!res.ok) throw new Error('Hotel not found in local database');
    return res.json();
  },

  async checkAvailability(hotelId: string, roomId: string, checkIn: string, checkOut: string): Promise<AvailabilityResult> {
    const params = new URLSearchParams({ hotelId, roomId, checkIn, checkOut });
    const res = await fetch(`/api/availability?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to check room availability');
    return res.json();
  },

  async getReservations(filter?: { hotelId?: string; status?: string; search?: string }): Promise<Reservation[]> {
    const params = new URLSearchParams();
    if (filter?.hotelId) params.append('hotelId', filter.hotelId);
    if (filter?.status) params.append('status', filter.status);
    if (filter?.search) params.append('search', filter.search);
    const res = await fetch(`/api/reservations?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch reservations from local database');
    return res.json();
  },

  async getReservationByReference(reference: string, email?: string): Promise<Reservation> {
    const params = new URLSearchParams({ reference });
    if (email) params.append('email', email);
    const res = await fetch(`/api/reservations/lookup?${params.toString()}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Reservation not found');
    }
    return res.json();
  },

  async createReservation(payload: {
    hotelId: string;
    roomId: string;
    guestName: string;
    guestEmail: string;
    guestPhone?: string;
    checkIn: string;
    checkOut: string;
    nights?: number;
    adults: number;
    children?: number;
    roomsCount?: number;
    addOns?: string[];
    specialRequests?: string;
  }): Promise<{ success: boolean; reservation: Reservation; message: string }> {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create reservation in local database');
    }
    return res.json();
  },

  async updateReservationStatus(id: string, status: Reservation['status']): Promise<Reservation> {
    const res = await fetch(`/api/reservations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update reservation status');
    const data = await res.json();
    return data.reservation;
  },

  async updateReservation(id: string, updates: Partial<Reservation>): Promise<Reservation> {
    const res = await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update reservation details');
    const data = await res.json();
    return data.reservation;
  },

  async deleteReservation(id: string): Promise<boolean> {
    const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete reservation');
    return true;
  },

  async getSettings(): Promise<BrandSettings> {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  async updateSettings(settings: Partial<BrandSettings>): Promise<BrandSettings> {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update branding and contact settings');
    const data = await res.json();
    return data.settings;
  },

  async getDbStats(): Promise<DbStats> {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to fetch database statistics');
    return res.json();
  },

  async resetDatabase(): Promise<void> {
    const res = await fetch('/api/database/reset', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset database');
  },

  async importDatabase(jsonData: any): Promise<void> {
    const res = await fetch('/api/database/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    });
    if (!res.ok) throw new Error('Failed to import database file');
  }
};
