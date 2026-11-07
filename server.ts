import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { localDb } from './src/server/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// API Routes

// Health & DB Connection Status
app.get('/api/health', (req, res) => {
  const stats = localDb.getStats();
  res.json({
    status: 'ok',
    database: 'Local File Storage (JSON DB)',
    synced: true,
    timestamp: new Date().toISOString(),
    stats
  });
});

// Database statistics & sync monitor
app.get('/api/stats', (req, res) => {
  res.json(localDb.getStats());
});

// Settings (Branding & Contact Info)
app.get('/api/settings', (req, res) => {
  res.json(localDb.getSettings());
});

app.post('/api/settings', (req, res) => {
  const updated = localDb.updateSettings(req.body);
  res.json({ success: true, settings: updated });
});

// Hotels
app.get('/api/hotels', (req, res) => {
  res.json(localDb.getHotels());
});

app.get('/api/hotels/:id', (req, res) => {
  const hotel = localDb.getHotelById(req.params.id);
  if (!hotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }
  res.json(hotel);
});

// Real-Time Room Availability Check
app.get('/api/availability', (req, res) => {
  const { hotelId, roomId, checkIn, checkOut } = req.query as {
    hotelId?: string;
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
  };

  if (!hotelId || !roomId || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'Missing required query parameters: hotelId, roomId, checkIn, checkOut' });
  }

  const availability = localDb.checkAvailability(hotelId, roomId, checkIn, checkOut);
  res.json(availability);
});

// Reservations
app.get('/api/reservations', (req, res) => {
  const { hotelId, status, search } = req.query as { hotelId?: string; status?: string; search?: string };
  const reservations = localDb.getReservations({ hotelId, status, search });
  res.json(reservations);
});

// Look up single reservation by booking reference (for Guest Portal)
app.get('/api/reservations/lookup', (req, res) => {
  const { reference, email } = req.query as { reference?: string; email?: string };
  if (!reference) {
    return res.status(400).json({ error: 'Missing booking reference' });
  }
  const reservation = localDb.getReservationByReference(reference, email);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found or details do not match' });
  }
  res.json(reservation);
});

// Create new reservation
app.post('/api/reservations', (req, res) => {
  const {
    hotelId,
    roomId,
    guestName,
    guestEmail,
    guestPhone,
    checkIn,
    checkOut,
    nights,
    adults,
    children,
    roomsCount,
    addOns,
    specialRequests
  } = req.body;

  if (!hotelId || !roomId || !guestName || !guestEmail || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'Missing required reservation fields' });
  }

  // Check live availability in local database
  const availability = localDb.checkAvailability(hotelId, roomId, checkIn, checkOut);
  if (!availability.available || availability.availableRooms < (roomsCount || 1)) {
    return res.status(409).json({
      error: 'The requested room type is no longer available for these dates.',
      availableRooms: availability.availableRooms
    });
  }

  const hotel = localDb.getHotelById(hotelId);
  const room = hotel?.rooms.find((r) => r.id === roomId);

  if (!hotel || !room) {
    return res.status(404).json({ error: 'Selected hotel or room does not exist' });
  }

  const calculatedNights = Math.max(
    1,
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
  );
  const count = roomsCount || 1;
  const roomTotal = room.pricePerNight * calculatedNights * count;
  
  // Calculate add-on cost
  let addOnsCost = 0;
  if (Array.isArray(addOns)) {
    if (addOns.includes('Artisan French Breakfast Daily') || addOns.includes('Organic Mediterranean Breakfast')) {
      addOnsCost += 35 * calculatedNights * (adults || 1);
    }
    if (addOns.includes('Champagne & Macarons on Arrival')) {
      addOnsCost += 110;
    }
    if (addOns.includes('Chauffeur Airport Transfer')) {
      addOnsCost += 140;
    }
    if (addOns.includes('Private English Garden Breakfast Service')) {
      addOnsCost += 40 * calculatedNights;
    }
  }

  const totalPrice = roomTotal + addOnsCost;

  const created = localDb.createReservation({
    hotelId,
    hotelName: hotel.name,
    hotelCity: hotel.city,
    roomId,
    roomName: room.name,
    guestName,
    guestEmail,
    guestPhone: guestPhone || '',
    checkIn,
    checkOut,
    nights: calculatedNights,
    adults: adults || 1,
    children: children || 0,
    roomsCount: count,
    pricePerNight: room.pricePerNight,
    totalPrice,
    currency: room.currency,
    addOns: addOns || [],
    specialRequests: specialRequests || ''
  });

  res.status(201).json({
    success: true,
    reservation: created,
    message: 'Reservation confirmed and synced to local database'
  });
});

// Update reservation status (Checked-In, Completed, Cancelled)
app.patch('/api/reservations/:id/status', (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  const updated = localDb.updateReservationStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  res.json({ success: true, reservation: updated });
});

// Update reservation general details
app.patch('/api/reservations/:id', (req, res) => {
  const updated = localDb.updateReservation(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  res.json({ success: true, reservation: updated });
});

// Cancel / Delete reservation
app.delete('/api/reservations/:id', (req, res) => {
  const deleted = localDb.deleteReservation(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  res.json({ success: true, message: 'Reservation removed from local database' });
});

// Database Export / Import / Reseed
app.get('/api/database/export', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="miirovelle-database.json"');
  res.send(JSON.stringify(localDb.exportData(), null, 2));
});

app.post('/api/database/import', (req, res) => {
  try {
    const updated = localDb.importData(req.body);
    res.json({ success: true, message: 'Local database imported successfully', data: updated });
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to import data: ' + err.message });
  }
});

app.post('/api/database/reset', (req, res) => {
  const reset = localDb.resetToDefaults();
  res.json({ success: true, message: 'Local database reset to defaults', data: reset });
});

// Download Complete Project as ZIP Archive
app.get('/api/project/download-zip', (req, res) => {
  const zipPath = path.resolve(__dirname, 'public', 'miirovelle-hotels-project.zip');
  res.download(zipPath, 'miirovelle-hotels-project.zip', (err) => {
    if (err) {
      console.error('Error downloading project zip:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to download project zip archive' });
      }
    }
  });
});

// Vite Middleware for development & static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Miirovelle Server] Running full-stack app on http://0.0.0.0:${PORT}`);
  });
}

startServer();
