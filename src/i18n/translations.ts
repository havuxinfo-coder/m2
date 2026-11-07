export type Language = 'en' | 'de' | 'es' | 'fr';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export interface Translations {
  // Top Banner
  topBanner: {
    dbLive: string;
    dbNotice: (count: number) => string;
    settingsLink: string;
    consoleLink: string;
  };

  // Nav
  nav: {
    ourHotels: string;
    philosophy: string;
    dining: string;
    neighbourhoods: string;
    findBooking: string;
    dbConsole: string;
    bookStay: string;
    hotelsAndStays: string;
    concierge: string;
    language: string;
  };

  // Hero
  hero: {
    kickerPrefix: string;
    kickerCities: string[];
    headline: string;
    subheadline: string;
    exploreHotels: string;
    form: {
      destination: string;
      checkIn: string;
      checkOut: string;
      guests: string;
      adults: string;
      children: string;
      submitBtn: string;
      bestRate: string;
      instantSync: string;
      directBooking: string;
    };
  };

  // Hotels Section
  hotels: {
    kicker: string;
    headline: string;
    description: string;
    filterAll: string;
    from: string;
    night: string;
    availableRooms: string;
    soldOut: string;
    viewDetails: string;
    bookNow: string;
    diningHighlight: string;
    reviews: string;
  };

  // Philosophy
  philosophy: {
    kicker: string;
    headline: string;
    subheadline: string;
    pillars: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };

  // Dining
  dining: {
    kicker: string;
    headline: string;
    description: string;
    reserveTable: string;
    openingHours: string;
    signatureDish: string;
    curatedWines: string;
  };

  // Neighbourhoods
  neighbourhoods: {
    kicker: string;
    headline: string;
    description: string;
    items: Array<{
      id: string;
      tag: string;
      title: string;
      description: string;
      homeTo: string;
    }>;
  };

  // Booking Modal
  bookingModal: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    datesAndHotel: string;
    selectRoom: string;
    guestDetails: string;
    confirmation: string;
    destinationLabel: string;
    checkInLabel: string;
    checkOutLabel: string;
    adultsLabel: string;
    childrenLabel: string;
    continueToRooms: string;
    back: string;
    availableBadge: string;
    roomsLeft: (n: number) => string;
    perNight: string;
    includesTaxes: string;
    selectThisRoom: string;
    selected: string;
    guestInformation: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    specialRequests: string;
    specialRequestsPlaceholder: string;
    addOnsTitle: string;
    addOnsSubtitle: string;
    addOnItems: {
      breakfast: { title: string; desc: string; price: string };
      lateCheckout: { title: string; desc: string; price: string };
      airportTransfer: { title: string; desc: string; price: string };
      wellnessKit: { title: string; desc: string; price: string };
    };
    orderSummary: string;
    nightsCount: (n: number) => string;
    totalAmount: string;
    completeBooking: string;
    confirmingBooking: string;
    successTitle: string;
    successMessage: string;
    refNumber: string;
    localDbSyncVerified: string;
    openInManagement: string;
    downloadVoucher: string;
    doneBtn: string;
  };

  // Lookup Modal
  lookupModal: {
    title: string;
    subtitle: string;
    refLabel: string;
    refPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    searchBtn: string;
    searching: string;
    notFound: string;
    foundTitle: string;
    status: string;
    hotel: string;
    room: string;
    stayDates: string;
    totalPaid: string;
    cancelBooking: string;
    cancelling: string;
    cancelSuccess: string;
    printVoucher: string;
    close: string;
  };

  // Hotel Detail Modal
  hotelDetail: {
    overviewTab: string;
    roomsTab: string;
    diningTab: string;
    amenitiesTab: string;
    bookRoomBtn: string;
    directContact: string;
    ratingAndReviews: string;
    roomFeatures: string;
    size: string;
    bed: string;
    view: string;
    maxGuests: string;
    bookThisRoom: string;
  };

  // Management Portal
  management: {
    title: string;
    subtitle: string;
    dbConnected: string;
    totalBookings: string;
    confirmed: string;
    checkedIn: string;
    cancelled: string;
    filterAll: string;
    searchPlaceholder: string;
    tableHeaders: {
      ref: string;
      guest: string;
      hotel: string;
      dates: string;
      total: string;
      status: string;
      actions: string;
    };
    newBookingBtn: string;
    exportCsv: string;
    noBookingsFound: string;
    saveChanges: string;
    close: string;
  };

  // Footer
  footer: {
    newsletterTitle: string;
    newsletterSubtitle: string;
    newsletterPlaceholder: string;
    subscribe: string;
    subscribed: string;
    explore: string;
    collection: string;
    conciergeAndOffices: string;
    legal: string;
    privacy: string;
    terms: string;
    cookies: string;
    rights: string;
  };

  // Common
  common: {
    close: string;
    save: string;
    cancel: string;
    nights: string;
    night: string;
    guests: string;
    guest: string;
    rooms: string;
    room: string;
    from: string;
    loading: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    topBanner: {
      dbLive: 'Local DB Live',
      dbNotice: (count) => `· Real-time reservation engine connected to \`/data/database.json\` (${count} total bookings)`,
      settingsLink: 'Logo & Contact Settings',
      consoleLink: 'Management Console →',
    },
    nav: {
      ourHotels: 'Our Hotels',
      philosophy: 'Brilliantly Considered',
      dining: 'Restaurants & Bars',
      neighbourhoods: 'Neighbourhoods',
      findBooking: 'Find Booking',
      dbConsole: 'DB Console',
      bookStay: 'Book Your Stay',
      hotelsAndStays: 'Hotels & Stays',
      concierge: 'Concierge',
      language: 'Language',
    },
    hero: {
      kickerPrefix: 'The Collection',
      kickerCities: ['London', 'Paris', 'Barcelona', 'Vienna', 'Gstaad'],
      headline: 'Brilliantly Considered European Stays.',
      subheadline: 'Intimate local sanctuaries rooted in creative quarters, with vibrant dining and heartfelt hospitality.',
      exploreHotels: 'Discover Our Available Hotels',
      form: {
        destination: 'Destination & Hotel',
        checkIn: 'Check-in Date',
        checkOut: 'Check-out Date',
        guests: 'Guests',
        adults: 'Adults (18+)',
        children: 'Children (0-17)',
        submitBtn: 'Check Availability & Book',
        bestRate: 'Best Rate Guaranteed',
        instantSync: 'Instant Local DB Sync',
        directBooking: 'Direct Concierge Care',
      },
    },
    hotels: {
      kicker: 'European Properties',
      headline: 'Our Characterful Hotels',
      description: 'Each hotel is an intimate reflection of its neighborhood — celebrating local architecture, independent artisans, and lively social dining.',
      filterAll: 'All European Hotels',
      from: 'From',
      night: 'night',
      availableRooms: 'available',
      soldOut: 'Fully Booked',
      viewDetails: 'View Details',
      bookNow: 'Instant Book',
      diningHighlight: 'Dining Highlight',
      reviews: 'verified reviews',
    },
    philosophy: {
      kicker: 'Our Hospitality Ethos',
      headline: 'Brilliantly Considered',
      subheadline: 'Inspired by the belief that life is made richer through thoughtful details, warm character, and genuine neighborhood connection.',
      pillars: [
        {
          number: '01',
          title: 'Rooted in the Neighbourhood',
          description: 'We do not build tourist bubbles. Our hotels are nestled inside historic creative quarters — Saint-Germain, El Born, Earl’s Court, and Spittelberg — connecting you directly to local bakers, gallery curators, and quiet park benches.',
        },
        {
          number: '02',
          title: 'The Art of Deep Rest',
          description: 'Sleep is sacred. Every room features tailored pocket-sprung mattresses, organic crisp linen, acoustic soundproofing, botanical sleep tinctures, and a bespoke pillow library for effortless slumber.',
        },
        {
          number: '03',
          title: 'Lively Social Hearts',
          description: 'Our cocktail lounges and brasseries are gathering places for both international travelers and neighborhood locals — pouring natural biodynamic wines and artisan cocktails into the evening.',
        },
        {
          number: '04',
          title: 'Considered, Seamless Stays',
          description: 'Everything is designed with purpose: vinyl turntables with local records, zero hidden charges, flexible cancellation, and a unified reservation system synced live with our local database.',
        },
      ],
    },
    dining: {
      kicker: 'Artisanal Gastronomy & Mixology',
      headline: 'Restaurants & Neighborhood Bars',
      description: 'At the heart of every property is a bustling culinary destination where hotel guests and locals clink glasses over seasonal plates and vermouth aperitifs.',
      reserveTable: 'Reserve a Table',
      openingHours: 'Opening Hours',
      signatureDish: 'Signature Offering',
      curatedWines: 'Natural & Biodynamic Wine List',
    },
    neighbourhoods: {
      kicker: 'Curated European Enclaves',
      headline: 'Our Neighbourhoods',
      description: 'We choose locations for character, history, and life. Discover our personal neighborhood maps, walking trails, and beloved artisan suppliers.',
      items: [
        {
          id: 'london',
          tag: '01 · UK · London',
          title: 'Earl’s Court & Kensington',
          description: 'Leafy private communal gardens, Victorian red-brick architecture, and proximity to London’s renowned museum quarter.',
          homeTo: 'Home to Templeton Garden',
        },
        {
          id: 'paris',
          tag: '02 · France · Paris',
          title: 'Saint-Germain-des-Prés',
          description: 'Historic literary cafés, antique publishers on Rue de Grenelle, and quiet morning walks to the Jardin du Luxembourg.',
          homeTo: 'Home to Le Grand Hôtel Cayré',
        },
        {
          id: 'barcelona',
          tag: '03 · Spain · Barcelona',
          title: 'El Born',
          description: 'Sun-dappled cobblestone alleys, artisan ceramic workshops, Ciutadella Park shade, and intimate natural wine bodegas.',
          homeTo: 'Home to Borneta',
        },
        {
          id: 'vienna-rudolf',
          tag: '04 · Austria · Vienna',
          title: 'Innere Stadt & Ringstraße',
          description: 'Imperial neoclassical boulevards, Rudolfsplatz tranquility, grand opera houses, and storied marble palace architecture.',
          homeTo: 'Home to Palais Rudolf',
        },
        {
          id: 'vienna-spittelberg',
          tag: '05 · Austria · Vienna',
          title: 'Spittelberg & MuseumsQuartier',
          description: 'Biedermeier cobblestone laneways, independent artisan ateliers, contemporary galleries, and vibrant coffeehouse culture.',
          homeTo: 'Home to Spittelberg',
        },
        {
          id: 'gstaad',
          tag: '06 · Switzerland · Gstaad',
          title: 'Bernese Oberland & Promenade',
          description: 'Storybook alpine chalets, snowy glacier horizons, mountain trailheads, and cozy evening fireside fondue salons.',
          homeTo: 'Home to The Mansard',
        },
      ],
    },
    bookingModal: {
      title: 'Bespoke Reservation',
      step1: 'Dates & Hotel',
      step2: 'Choose Room',
      step3: 'Guest Details',
      step4: 'Confirmed',
      datesAndHotel: 'Dates & Destination',
      selectRoom: 'Select Your Sanctuary',
      guestDetails: 'Guest Details & Preferences',
      confirmation: 'Reservation Confirmed',
      destinationLabel: 'Select Hotel Destination',
      checkInLabel: 'Check-In Date',
      checkOutLabel: 'Check-Out Date',
      adultsLabel: 'Adults',
      childrenLabel: 'Children',
      continueToRooms: 'Continue to Room Selection',
      back: 'Back',
      availableBadge: 'Available in Local DB',
      roomsLeft: (n) => `${n} room${n === 1 ? '' : 's'} available`,
      perNight: 'per night',
      includesTaxes: 'Includes all city taxes & high-speed Wi-Fi',
      selectThisRoom: 'Select Room',
      selected: 'Selected',
      guestInformation: 'Guest Contact Information',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Lady Clara Sterling',
      email: 'Email Address',
      emailPlaceholder: 'e.g. clara@example.com',
      phone: 'Phone Number',
      phonePlaceholder: 'e.g. +44 7700 900077',
      specialRequests: 'Special Requests / Dietary Needs (Optional)',
      specialRequestsPlaceholder: 'Quiet courtyard view, feather-free bedding, champagne on arrival...',
      addOnsTitle: 'Curated Stays & Enhancements',
      addOnsSubtitle: 'Select thoughtful extras to enhance your stay',
      addOnItems: {
        breakfast: {
          title: 'Artisan Morning Bakery Basket',
          desc: 'Freshly baked viennoiseries, cold-pressed juices, organic eggs & farm butter delivered to your door.',
          price: '€28 / person / day',
        },
        lateCheckout: {
          title: 'Guaranteed 2:00 PM Late Departure',
          desc: 'Take your time with a lazy morning coffee and late checkout without rushing.',
          price: '€45 flat rate',
        },
        airportTransfer: {
          title: 'Private Hybrid Mercedes Chauffeur',
          desc: 'Seamless door-to-door transfer from the airport or international train terminal.',
          price: '€95 each way',
        },
        wellnessKit: {
          title: 'Signature Sleep Botanical Wellness Box',
          desc: 'Linden flower herbal sleep tincture, lavender mist, silk eye mask & acoustic sound bath recording.',
          price: '€35 per kit',
        },
      },
      orderSummary: 'Reservation Summary',
      nightsCount: (n) => `${n} Night${n === 1 ? '' : 's'}`,
      totalAmount: 'Total Amount',
      completeBooking: 'Confirm & Sync Reservation to Local DB',
      confirmingBooking: 'Syncing to /data/database.json...',
      successTitle: 'Your Stay is Confirmed & Synced',
      successMessage: 'Your reservation has been written directly to the local JSON database and is immediately accessible in the Management Console.',
      refNumber: 'Booking Reference',
      localDbSyncVerified: 'Database Record Verified (Status: Confirmed)',
      openInManagement: 'View in Management Console →',
      downloadVoucher: 'Print / Save Confirmation Voucher',
      doneBtn: 'Done & Return to Collection',
    },
    lookupModal: {
      title: 'Find Your Reservation',
      subtitle: 'Retrieve and manage your booking directly from our real-time database.',
      refLabel: 'Booking Reference Number',
      refPlaceholder: 'e.g. MRV-2026-XXXXX',
      emailLabel: 'Guest Email Address',
      emailPlaceholder: 'The email used during booking',
      searchBtn: 'Lookup Booking',
      searching: 'Querying database...',
      notFound: 'No reservation matching this reference and email was found in our database.',
      foundTitle: 'Reservation Found',
      status: 'Booking Status',
      hotel: 'Hotel & City',
      room: 'Room Type',
      stayDates: 'Stay Dates',
      totalPaid: 'Total Price',
      cancelBooking: 'Cancel Reservation',
      cancelling: 'Updating database...',
      cancelSuccess: 'Your reservation has been cancelled in the database.',
      printVoucher: 'Print Confirmation',
      close: 'Close',
    },
    hotelDetail: {
      overviewTab: 'Overview',
      roomsTab: 'Available Rooms',
      diningTab: 'Dining & Bars',
      amenitiesTab: 'Amenities & Services',
      bookRoomBtn: 'Book Room',
      directContact: 'Direct Contact & Reception',
      ratingAndReviews: 'Guest Rating & Verified Reviews',
      roomFeatures: 'Room Features & Inclusions',
      size: 'Size',
      bed: 'Bed Type',
      view: 'View',
      maxGuests: 'Max Guests',
      bookThisRoom: 'Reserve This Room',
    },
    management: {
      title: 'Local Database & Reservation Management',
      subtitle: 'Real-time CRUD operations directly synced with `/data/database.json`.',
      dbConnected: 'Connected to local JSON store',
      totalBookings: 'Total Bookings',
      confirmed: 'Confirmed',
      checkedIn: 'Checked-In',
      cancelled: 'Cancelled',
      filterAll: 'All Bookings',
      searchPlaceholder: 'Search by reference, guest name, email, or hotel...',
      tableHeaders: {
        ref: 'Reference',
        guest: 'Guest Name & Email',
        hotel: 'Hotel & Room',
        dates: 'Check-in / Out',
        total: 'Total',
        status: 'Status',
        actions: 'Actions',
      },
      newBookingBtn: '+ New Reservation',
      exportCsv: 'Export CSV',
      noBookingsFound: 'No reservations found matching your filter criteria.',
      saveChanges: 'Save Changes',
      close: 'Close Console',
    },
    footer: {
      newsletterTitle: 'The Miirovelle Dispatch',
      newsletterSubtitle: 'Curated European cultural guides, seasonal restaurant openings, and private collector rates.',
      newsletterPlaceholder: 'Enter your email address',
      subscribe: 'Join Dispatch',
      subscribed: '✓ Welcome to the Dispatch',
      explore: 'Explore Collection',
      collection: 'Our Boutique Hotels',
      conciergeAndOffices: 'Concierge & Headquarters',
      legal: 'Legal & Privacy',
      privacy: 'Privacy Policy',
      terms: 'Terms of Booking',
      cookies: 'Cookie Preferences',
      rights: 'All rights reserved. Powered by real-time local database engine.',
    },
    common: {
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      nights: 'nights',
      night: 'night',
      guests: 'guests',
      guest: 'guest',
      rooms: 'rooms',
      room: 'room',
      from: 'From',
      loading: 'Loading...',
    },
  },

  // ===================== DEUTSCH (GERMAN) =====================
  de: {
    topBanner: {
      dbLive: 'Lokale DB Aktiv',
      dbNotice: (count) => `· Echtzeit-Buchungssystem verbunden mit \`/data/database.json\` (${count} Buchungen gesamt)`,
      settingsLink: 'Logo- & Kontakteinstellungen',
      consoleLink: 'Verwaltungskonsole →',
    },
    nav: {
      ourHotels: 'Unsere Hotels',
      philosophy: 'Mit Bedacht gestaltet',
      dining: 'Restaurants & Bars',
      neighbourhoods: 'Stadtviertel',
      findBooking: 'Buchung finden',
      dbConsole: 'DB-Konsole',
      bookStay: 'Aufenthalt buchen',
      hotelsAndStays: 'Hotels & Aufenthalte',
      concierge: 'Concierge',
      language: 'Sprache',
    },
    hero: {
      kickerPrefix: 'Die Kollektion',
      kickerCities: ['London', 'Paris', 'Barcelona', 'Wien', 'Gstaad'],
      headline: 'Mit Bedacht gestaltete europäische Hotels.',
      subheadline: 'Intime Rückzugsorte in historischen Kreativvierteln, mit lebendiger Gastronomie und herzlicher Gastfreundschaft.',
      exploreHotels: 'Entdecken Sie unsere Hotels',
      form: {
        destination: 'Reiseziel & Hotel',
        checkIn: 'Anreisedatum',
        checkOut: 'Abreisedatum',
        guests: 'Gäste',
        adults: 'Erwachsene (18+)',
        children: 'Kinder (0-17)',
        submitBtn: 'Verfügbarkeit prüfen & Buchen',
        bestRate: 'Bestpreisgarantie',
        instantSync: 'Sofortige lokale DB-Synchronisation',
        directBooking: 'Persönlicher Concierge-Service',
      },
    },
    hotels: {
      kicker: 'Europäische Häuser',
      headline: 'Unsere charaktervollen Hotels',
      description: 'Jedes Haus spiegelt auf intime Weise sein Viertel wider – eine Hommage an lokale Architektur, Kunsthandwerk und lebendige Kulinarik.',
      filterAll: 'Alle europäischen Hotels',
      from: 'Ab',
      night: 'Nacht',
      availableRooms: 'verfügbar',
      soldOut: 'Ausgebucht',
      viewDetails: 'Details ansehen',
      bookNow: 'Direkt buchen',
      diningHighlight: 'Kulinarisches Highlight',
      reviews: 'verifizierte Bewertungen',
    },
    philosophy: {
      kicker: 'Unsere Philosophie',
      headline: 'Mit Bedacht gestaltet',
      subheadline: 'Inspiriert von der Überzeugung, dass das Leben durch durchdachte Details, warmen Charakter und echte Nachbarschaftsverbundenheit reicher wird.',
      pillars: [
        {
          number: '01',
          title: 'Verwurzelt im Stadtviertel',
          description: 'Wir schaffen keine Touristenblasen. Unsere Häuser liegen in geschichtsträchtigen Künstlervierteln – Saint-Germain, El Born, Earl’s Court und Spittelberg – und verbinden Sie direkt mit lokalen Bäckern, Galeristen und idyllischen Parkplätzen.',
        },
        {
          number: '02',
          title: 'Die Kunst tiefer Ruhe',
          description: 'Schlaf ist kostbar. Jedes Zimmer verfügt über handgefertigte Taschenfederkernmatratzen, feine Bio-Leinen, Akustikdämmung, pflanzliche Schlaftinkturen und ein Kissenmenü für erholsamen Schlaf.',
        },
        {
          number: '03',
          title: 'Lebendige Treffpunkte',
          description: 'Unsere Cocktail-Lounges und Brasserien sind Treffpunkte für internationale Reisende und Einheimische gleichermaßen – mit biodynamischen Naturweinen und handgemachten Cocktails bis in die Nacht.',
        },
        {
          number: '04',
          title: 'Mühelose, durchdachte Aufenthalte',
          description: 'Alles dient einem Zweck: Schallplattenspieler mit lokalen Alben, keine versteckten Gebühren, flexible Stornierung und eine Buchungsverwaltung in Echtzeit synchronisiert mit der lokalen Datenbank.',
        },
      ],
    },
    dining: {
      kicker: 'Handwerkliche Gastronomie & Mixologie',
      headline: 'Restaurants & Nachbarschaftsbars',
      description: 'Im Herzen jedes Hotels liegt ein lebendiger kulinarischer Ort, an dem Hotelgäste und Nachbarn bei saisonalen Gerichten und Wermut-Aperitifs anstoßen.',
      reserveTable: 'Tisch reservieren',
      openingHours: 'Öffnungszeiten',
      signatureDish: 'Spezialität des Hauses',
      curatedWines: 'Natur- & biodynamische Weinkarte',
    },
    neighbourhoods: {
      kicker: 'Kuratierte europäische Enklaven',
      headline: 'Unsere Stadtviertel',
      description: 'Wir wählen Standorte voller Charakter, Geschichte und Leben. Entdecken Sie unsere persönlichen Viertelkarten, Spazierwege und handwerklichen Partner.',
      items: [
        {
          id: 'london',
          tag: '01 · GB · London',
          title: 'Earl’s Court & Kensington',
          description: 'Begrünte Privatgärten, viktorianische Backsteinarchitektur und die unmittelbare Nähe zum weltbekannten Museumsviertel.',
          homeTo: 'Heimat von Templeton Garden',
        },
        {
          id: 'paris',
          tag: '02 · Frankreich · Paris',
          title: 'Saint-Germain-des-Prés',
          description: 'Historische Literatencafés, Antiquariate in der Rue de Grenelle und morgendliche Spaziergänge zum Jardin du Luxembourg.',
          homeTo: 'Heimat von Le Grand Hôtel Cayré',
        },
        {
          id: 'barcelona',
          tag: '03 · Spanien · Barcelona',
          title: 'El Born',
          description: 'Sonnendurchflutete Kopfsteinpflastergassen, Keramikateliers, Schatten im Parc de la Ciutadella und intime Naturwein-Bodegas.',
          homeTo: 'Heimat von Borneta',
        },
        {
          id: 'vienna-rudolf',
          tag: '04 · Österreich · Wien',
          title: 'Innere Stadt & Ringstraße',
          description: 'Kaiserliche Boulevards, die Beschaulichkeit des Rudolfsplatzes, Prunkopern und historische Marmorpalais-Architektur.',
          homeTo: 'Heimat von Palais Rudolf',
        },
        {
          id: 'vienna-spittelberg',
          tag: '05 · Österreich · Wien',
          title: 'Spittelberg & MuseumsQuartier',
          description: 'Biedermeier-Gassen, unabhängige Kunsthandwerksateliers, zeitgenössische Galerien und lebendige Kaffeehauskultur.',
          homeTo: 'Heimat von Spittelberg',
        },
        {
          id: 'gstaad',
          tag: '06 · Schweiz · Gstaad',
          title: 'Berner Oberland & Promenade',
          description: 'Malerische Alpenchalets, verschneite Gletscherhorizonte, Bergwanderwege und gemütliche Fondue-Abende am Kamin.',
          homeTo: 'Heimat von The Mansard',
        },
      ],
    },
    bookingModal: {
      title: 'Maßgeschneiderte Reservierung',
      step1: 'Reisedaten & Hotel',
      step2: 'Zimmerauswahl',
      step3: 'Gästedaten',
      step4: 'Bestätigung',
      datesAndHotel: 'Reisedaten & Reiseziel',
      selectRoom: 'Wählen Sie Ihren Rückzugsort',
      guestDetails: 'Gästedaten & Wünsche',
      confirmation: 'Buchung bestätigt',
      destinationLabel: 'Hotel & Reiseziel wählen',
      checkInLabel: 'Anreisedatum',
      checkOutLabel: 'Abreisedatum',
      adultsLabel: 'Erwachsene',
      childrenLabel: 'Kinder',
      continueToRooms: 'Weiter zur Zimmerauswahl',
      back: 'Zurück',
      availableBadge: 'Verfügbar in lokaler DB',
      roomsLeft: (n) => `Noch ${n} Zimmer verfügbar`,
      perNight: 'pro Nacht',
      includesTaxes: 'Inklusive City-Taxen & Highspeed-WLAN',
      selectThisRoom: 'Zimmer wählen',
      selected: 'Ausgewählt',
      guestInformation: 'Kontaktinformationen des Gastes',
      fullName: 'Vollständiger Name',
      fullNamePlaceholder: 'z.B. Dr. Maximilian Weber',
      email: 'E-Mail-Adresse',
      emailPlaceholder: 'z.B. maximilian@example.com',
      phone: 'Telefonnummer',
      phonePlaceholder: 'z.B. +49 171 1234567',
      specialRequests: 'Besondere Wünsche / Ernährungshinweise (optional)',
      specialRequestsPlaceholder: 'Ruhiger Innenhofblick, allergikerfreundliche Kissen, Champagner bei Ankunft...',
      addOnsTitle: 'Kuratierte Extras für Ihren Aufenthalt',
      addOnsSubtitle: 'Verfeinern Sie Ihren Aufenthalt mit handverlesenen Annehmlichkeiten',
      addOnItems: {
        breakfast: {
          title: 'Handwerklicher Frühstückskorb',
          desc: 'Frisch gebackene Croissants, kaltgepresste Säfte, Bio-Eier und Bauernbutter an Ihre Zimmertür geliefert.',
          price: '28 € / Person / Tag',
        },
        lateCheckout: {
          title: 'Garantierter Late Check-out bis 14:00 Uhr',
          desc: 'Genießen Sie einen entspannten Morgenkaffee ohne Hektik bei der Abreise.',
          price: '45 € Pauschale',
        },
        airportTransfer: {
          title: 'Privater Mercedes-Hybrid Chauffeurdienst',
          desc: 'Komfortabler Transfer direkt vom Flughafen oder Fernbahnhof zu Ihrem Hotel.',
          price: '95 € pro Fahrt',
        },
        wellnessKit: {
          title: 'Signatur-Schlaf- & Wellness-Set',
          desc: 'Lindenblüten-Schlaftinktur, Bio-Lavendelspray, Seiden-Schlafmaske und Klangbad-Aufnahme.',
          price: '35 € pro Set',
        },
      },
      orderSummary: 'Buchungsübersicht',
      nightsCount: (n) => `${n} Nacht${n === 1 ? '' : 'e'}`,
      totalAmount: 'Gesamtbetrag',
      completeBooking: 'Buchung bestätigen & in lokaler DB speichern',
      confirmingBooking: 'Wird in /data/database.json synchronisiert...',
      successTitle: 'Ihr Aufenthalt ist bestätigt & gespeichert',
      successMessage: 'Ihre Reservierung wurde direkt in die lokale JSON-Datenbank geschrieben und ist ab sofort in der Verwaltungskonsole sichtbar.',
      refNumber: 'Buchungsnummer',
      localDbSyncVerified: 'Datenbank-Eintrag verifiziert (Status: Bestätigt)',
      openInManagement: 'In Verwaltungskonsole öffnen →',
      downloadVoucher: 'Buchungsbeleg drucken / speichern',
      doneBtn: 'Fertig & Zurück zur Kollektion',
    },
    lookupModal: {
      title: 'Buchung finden',
      subtitle: 'Rufen Sie Ihre Buchung direkt aus unserer lokalen Echtzeit-Datenbank ab.',
      refLabel: 'Buchungsnummer (Referenz)',
      refPlaceholder: 'z.B. MRV-2026-XXXXX',
      emailLabel: 'E-Mail-Adresse des Gastes',
      emailPlaceholder: 'Bei der Buchung verwendete E-Mail',
      searchBtn: 'Buchung suchen',
      searching: 'Datenbank wird abgefragt...',
      notFound: 'Keine Buchung mit dieser Buchungsnummer und E-Mail in der Datenbank gefunden.',
      foundTitle: 'Buchung gefunden',
      status: 'Status',
      hotel: 'Hotel & Stadt',
      room: 'Zimmerkategorie',
      stayDates: 'Aufenthaltszeitraum',
      totalPaid: 'Gesamtpreis',
      cancelBooking: 'Buchung stornieren',
      cancelling: 'Datenbank wird aktualisiert...',
      cancelSuccess: 'Ihre Buchung wurde in der Datenbank erfolgreich storniert.',
      printVoucher: 'Beleg drucken',
      close: 'Schließen',
    },
    hotelDetail: {
      overviewTab: 'Übersicht',
      roomsTab: 'Verfügbare Zimmer',
      diningTab: 'Gastronomie & Bars',
      amenitiesTab: 'Ausstattung & Service',
      bookRoomBtn: 'Zimmer buchen',
      directContact: 'Direktkontakt & Rezeption',
      ratingAndReviews: 'Gästebewertung & verifizierte Rezensionen',
      roomFeatures: 'Ausstattung & Besonderheiten',
      size: 'Größe',
      bed: 'Bettentyp',
      view: 'Aussicht',
      maxGuests: 'Max. Gäste',
      bookThisRoom: 'Dieses Zimmer reservieren',
    },
    management: {
      title: 'Lokale Datenbank & Reservierungsverwaltung',
      subtitle: 'Echtzeit-CRUD-Operationen direkt synchronisiert mit `/data/database.json`.',
      dbConnected: 'Verbunden mit lokalem JSON-Speicher',
      totalBookings: 'Gesamte Buchungen',
      confirmed: 'Bestätigt',
      checkedIn: 'Eingecheckt',
      cancelled: 'Storniert',
      filterAll: 'Alle Buchungen',
      searchPlaceholder: 'Suche nach Referenz, Name, E-Mail oder Hotel...',
      tableHeaders: {
        ref: 'Referenz',
        guest: 'Gast & E-Mail',
        hotel: 'Hotel & Zimmer',
        dates: 'Anreise / Abreise',
        total: 'Gesamt',
        status: 'Status',
        actions: 'Aktionen',
      },
      newBookingBtn: '+ Neue Buchung',
      exportCsv: 'CSV exportieren',
      noBookingsFound: 'Keine Buchungen entsprechen den Suchkriterien.',
      saveChanges: 'Änderungen speichern',
      close: 'Konsole schließen',
    },
    footer: {
      newsletterTitle: 'Die Miirovelle Depesche',
      newsletterSubtitle: 'Kuratierte europäische Kulturführer, saisonale Restaurant-Neueröffnungen und exklusive Privattarife.',
      newsletterPlaceholder: 'Ihre E-Mail-Adresse eingeben',
      subscribe: 'Abonnieren',
      subscribed: '✓ Willkommen bei der Depesche',
      explore: 'Kollektion entdecken',
      collection: 'Unsere Boutique-Hotels',
      conciergeAndOffices: 'Concierge & Hauptsitz',
      legal: 'Rechtliches & Datenschutz',
      privacy: 'Datenschutzerklärung',
      terms: 'Buchungsbedingungen',
      cookies: 'Cookie-Einstellungen',
      rights: 'Alle Rechte vorbehalten. Angetrieben von lokaler Echtzeit-Datenbank.',
    },
    common: {
      close: 'Schließen',
      save: 'Speichern',
      cancel: 'Abbrechen',
      nights: 'Nächte',
      night: 'Nacht',
      guests: 'Gäste',
      guest: 'Gast',
      rooms: 'Zimmer',
      room: 'Zimmer',
      from: 'Ab',
      loading: 'Lädt...',
    },
  },

  // ===================== ESPAÑOL (SPANISH) =====================
  es: {
    topBanner: {
      dbLive: 'BD Local Activa',
      dbNotice: (count) => `· Motor de reservas en tiempo real conectado a \`/data/database.json\` (${count} reservas en total)`,
      settingsLink: 'Ajustes de Logo y Contacto',
      consoleLink: 'Consola de Gestión →',
    },
    nav: {
      ourHotels: 'Nuestros Hoteles',
      philosophy: 'Brillantemente Pensado',
      dining: 'Restaurantes y Bares',
      neighbourhoods: 'Barrios',
      findBooking: 'Buscar Reserva',
      dbConsole: 'Consola BD',
      bookStay: 'Reserva tu Estancia',
      hotelsAndStays: 'Hoteles y Estancias',
      concierge: 'Conserjería',
      language: 'Idioma',
    },
    hero: {
      kickerPrefix: 'La Colección',
      kickerCities: ['Londres', 'París', 'Barcelona', 'Viena', 'Gstaad'],
      headline: 'Hoteles boutique europeos brillantemente pensados.',
      subheadline: 'Santuarios íntimos en barrios creativos con historia, gastronomía vibrante y hospitalidad cálida.',
      exploreHotels: 'Descubre nuestros hoteles disponibles',
      form: {
        destination: 'Destino y Hotel',
        checkIn: 'Fecha de Entrada',
        checkOut: 'Fecha de Salida',
        guests: 'Huéspedes',
        adults: 'Adultos (+18)',
        children: 'Niños (0-17)',
        submitBtn: 'Consultar Disponibilidad y Reservar',
        bestRate: 'Mejor Tarifa Garantizada',
        instantSync: 'Sincronización instantánea con BD local',
        directBooking: 'Atención personalizada de conserjería',
      },
    },
    hotels: {
      kicker: 'Propiedades Europeas',
      headline: 'Hoteles con Carácter Propio',
      description: 'Cada hotel es un reflejo íntimo de su barrio: arquitectura histórica, creadores locales y animadas sobremesas gastronómicas.',
      filterAll: 'Todos los hoteles europeos',
      from: 'Desde',
      night: 'noche',
      availableRooms: 'disponibles',
      soldOut: 'Completo',
      viewDetails: 'Ver detalles',
      bookNow: 'Reserva directa',
      diningHighlight: 'Espacio Gastronómico',
      reviews: 'opiniones verificadas',
    },
    philosophy: {
      kicker: 'Nuestra Filosofía',
      headline: 'Brillantemente Pensado',
      subheadline: 'Inspirados en la convicción de que la vida es más plena a través de los pequeños detalles, el carácter genuino y la conexión con el barrio.',
      pillars: [
        {
          number: '01',
          title: 'Arraigados en el Barrio',
          description: 'No creamos burbujas turísticas. Nuestros hoteles habitan barrios con historia —Saint-Germain, El Born, Earl’s Court y Spittelberg— conectándote con panaderos artesanos, galerías independientes y plazas tranquilas.',
        },
        {
          number: '02',
          title: 'El Arte del Descanso Profundo',
          description: 'El sueño es sagrado. Cada habitación cuenta con colchones artesanos de muelles ensacados, lino orgánico, aislamiento acústico, elixires botánicos y una carta de almohadas personalizada.',
        },
        {
          number: '03',
          title: 'Puntos de Encuentro Vivos',
          description: 'Nuestros bares de cócteles y brasseries son lugares de reunión para viajeros y vecinos locales, sirviendo vinos biodinámicos y cócteles artesanales al caer la tarde.',
        },
        {
          number: '04',
          title: 'Estancias Fluidas y Conscientes',
          description: 'Todo tiene un propósito: tocadiscos con vinilos locales, cero cargos ocultos, cancelación flexible y un sistema de reservas sincronizado en tiempo real con nuestra base de datos local.',
        },
      ],
    },
    dining: {
      kicker: 'Gastronomía Artesanal y Coctelería',
      headline: 'Restaurantes y Bares de Barrio',
      description: 'En el corazón de cada propiedad late un destino culinario donde huéspedes y residentes brindan con copas de vino natural y aperitivos de vermut.',
      reserveTable: 'Reservar Mesa',
      openingHours: 'Horarios de Apertura',
      signatureDish: 'Plato Insignia',
      curatedWines: 'Carta de vinos naturales y biodinámicos',
    },
    neighbourhoods: {
      kicker: 'Enclaves Europeos Exclusivos',
      headline: 'Nuestros Barrios',
      description: 'Elegimos enclaves por su alma, historia y vitalidad. Descubre nuestras guías de barrio, rutas a pie y talleres artesanos.',
      items: [
        {
          id: 'london',
          tag: '01 · Reino Unido · Londres',
          title: 'Earl’s Court & Kensington',
          description: 'Jardines privados victorianos, elegantes fachadas de ladrillo rojo y cercanía a la milla dorada de los museos de Londres.',
          homeTo: 'Hogar de Templeton Garden',
        },
        {
          id: 'paris',
          tag: '02 · Francia · París',
          title: 'Saint-Germain-des-Prés',
          description: 'Cafés literarios históricos, editoriales de arte en Rue de Grenelle y paseos matinales hacia los Jardines de Luxemburgo.',
          homeTo: 'Hogar de Le Grand Hôtel Cayré',
        },
        {
          id: 'barcelona',
          tag: '03 · España · Barcelona',
          title: 'El Born',
          description: 'Callejuelas empedradas bañadas por el sol, talleres de cerámica artesana, la sombra de la Ciutadella y bodegas de vino natural.',
          homeTo: 'Hogar de Borneta',
        },
        {
          id: 'vienna-rudolf',
          tag: '04 · Austria · Viena',
          title: 'Innere Stadt & Ringstraße',
          description: 'Bulevares neoclásicos imperiales, la serenidad de Rudolfsplatz, óperas monumentales y majestuosos palacios de mármol.',
          homeTo: 'Hogar de Palais Rudolf',
        },
        {
          id: 'vienna-spittelberg',
          tag: '05 · Austria · Viena',
          title: 'Spittelberg & MuseumsQuartier',
          description: 'Pasajes de estilo Biedermeier, atelieres independientes de artesanos, galerías contemporáneas y la tradicional cultura del café.',
          homeTo: 'Hogar de Spittelberg',
        },
        {
          id: 'gstaad',
          tag: '06 · Suiza · Gstaad',
          title: 'Oberland Bernés & Promenade',
          description: 'Chalets alpinos de ensueño, glaciares nevados en el horizonte, senderos de montaña y veladas de fondue junto a la chimenea.',
          homeTo: 'Hogar de The Mansard',
        },
      ],
    },
    bookingModal: {
      title: 'Reserva a Medida',
      step1: 'Fechas y Hotel',
      step2: 'Elegir Habitación',
      step3: 'Datos del Huésped',
      step4: 'Confirmación',
      datesAndHotel: 'Fechas y Destino',
      selectRoom: 'Selecciona tu Refugio',
      guestDetails: 'Datos y Preferencias del Huésped',
      confirmation: 'Reserva Confirmada',
      destinationLabel: 'Seleccionar Hotel de Destino',
      checkInLabel: 'Fecha de Entrada',
      checkOutLabel: 'Fecha de Salida',
      adultsLabel: 'Adultos',
      childrenLabel: 'Niños',
      continueToRooms: 'Continuar a Selección de Habitación',
      back: 'Atrás',
      availableBadge: 'Disponible en BD local',
      roomsLeft: (n) => `${n} habitación${n === 1 ? '' : 'es'} disponible${n === 1 ? '' : 's'}`,
      perNight: 'por noche',
      includesTaxes: 'Incluye impuestos locales y Wi-Fi de alta velocidad',
      selectThisRoom: 'Elegir habitación',
      selected: 'Seleccionada',
      guestInformation: 'Información de Contacto',
      fullName: 'Nombre y Apellidos',
      fullNamePlaceholder: 'ej. Carmen Morales Vidal',
      email: 'Correo Electrónico',
      emailPlaceholder: 'ej. carmen@example.com',
      phone: 'Teléfono Móvil',
      phonePlaceholder: 'ej. +34 612 345 678',
      specialRequests: 'Peticiones Especiales / Alérgenos (Opcional)',
      specialRequestsPlaceholder: 'Vistas al patio interior, almohadas de pluma, botella de cava a la llegada...',
      addOnsTitle: 'Experiencias y Detalles Adicionales',
      addOnsSubtitle: 'Añade extras cuidadosamente seleccionados para una estancia memorable',
      addOnItems: {
        breakfast: {
          title: 'Cesta de Desayuno de Panadería Artesanal',
          desc: 'Bollería recién horneada, zumos prensados en frío, huevos ecológicos y mantequilla de granja en tu puerta.',
          price: '28 € / persona / día',
        },
        lateCheckout: {
          title: 'Salida Tardía Garantizada a las 14:00',
          desc: 'Disfruta de una mañana pausada con café y salida relajada sin prisas.',
          price: '45 € tarifa plana',
        },
        airportTransfer: {
          title: 'Chófer Privado en Mercedes Híbrido',
          desc: 'Traslado directo y confortable desde el aeropuerto o estación de tren internacional.',
          price: '95 € por trayecto',
        },
        wellnessKit: {
          title: 'Set Botánico Exclusivo de Sueño y Bienestar',
          desc: 'Elixir de tilo para el descanso, bruma de lavanda, antifaz de seda y sesión sonora guiada.',
          price: '35 € por kit',
        },
      },
      orderSummary: 'Resumen de la Reserva',
      nightsCount: (n) => `${n} Noche${n === 1 ? '' : 's'}`,
      totalAmount: 'Importe Total',
      completeBooking: 'Confirmar y Guardar Reserva en BD Local',
      confirmingBooking: 'Sincronizando con /data/database.json...',
      successTitle: 'Tu estancia está confirmada y sincronizada',
      successMessage: 'Tu reserva se ha registrado directamente en la base de datos JSON local y ya está disponible en la Consola de Gestión.',
      refNumber: 'Referencia de Reserva',
      localDbSyncVerified: 'Registro en Base de Datos verificado (Estado: Confirmada)',
      openInManagement: 'Ver en la Consola de Gestión →',
      downloadVoucher: 'Imprimir / Descargar Comprobante',
      doneBtn: 'Listo y Volver a la Colección',
    },
    lookupModal: {
      title: 'Consultar Reserva',
      subtitle: 'Accede y gestiona tu reserva directamente desde nuestra base de datos local.',
      refLabel: 'Número de Referencia de Reserva',
      refPlaceholder: 'ej. MRV-2026-XXXXX',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'El correo electrónico utilizado al reservar',
      searchBtn: 'Buscar Reserva',
      searching: 'Consultando base de datos...',
      notFound: 'No se ha encontrado ninguna reserva con esta referencia y correo electrónico.',
      foundTitle: 'Reserva Localizada',
      status: 'Estado',
      hotel: 'Hotel y Ciudad',
      room: 'Tipo de Habitación',
      stayDates: 'Fechas de Estancia',
      totalPaid: 'Precio Total',
      cancelBooking: 'Cancelar Reserva',
      cancelling: 'Actualizando base de datos...',
      cancelSuccess: 'Tu reserva ha sido cancelada correctamente en la base de datos.',
      printVoucher: 'Imprimir Comprobante',
      close: 'Cerrar',
    },
    hotelDetail: {
      overviewTab: 'Descripción',
      roomsTab: 'Habitaciones Disponibles',
      diningTab: 'Gastronomía y Bares',
      amenitiesTab: 'Servicios e Instalaciones',
      bookRoomBtn: 'Reservar Habitación',
      directContact: 'Contacto Directo y Recepción',
      ratingAndReviews: 'Puntuación y Reseñas Verificadas',
      roomFeatures: 'Equipamiento y Detalles',
      size: 'Tamaño',
      bed: 'Tipo de Cama',
      view: 'Vistas',
      maxGuests: 'Capacidad Máxima',
      bookThisRoom: 'Reservar esta Habitación',
    },
    management: {
      title: 'Base de Datos Local y Gestión de Reservas',
      subtitle: 'Operaciones CRUD en tiempo real sincronizadas con `/data/database.json`.',
      dbConnected: 'Conectado al almacén JSON local',
      totalBookings: 'Total Reservas',
      confirmed: 'Confirmadas',
      checkedIn: 'Registradas',
      cancelled: 'Canceladas',
      filterAll: 'Todas las reservas',
      searchPlaceholder: 'Buscar por referencia, nombre de huésped, email u hotel...',
      tableHeaders: {
        ref: 'Referencia',
        guest: 'Huésped y Email',
        hotel: 'Hotel y Habitación',
        dates: 'Entrada / Salida',
        total: 'Total',
        status: 'Estado',
        actions: 'Acciones',
      },
      newBookingBtn: '+ Nueva Reserva',
      exportCsv: 'Exportar CSV',
      noBookingsFound: 'No se encontraron reservas con los filtros aplicados.',
      saveChanges: 'Guardar Cambios',
      close: 'Cerrar Consola',
    },
    footer: {
      newsletterTitle: 'El Despacho Miirovelle',
      newsletterSubtitle: 'Guías culturales europeas exclusivas, inauguraciones gastronómicas y tarifas privadas de socio.',
      newsletterPlaceholder: 'Introduce tu correo electrónico',
      subscribe: 'Suscribirme',
      subscribed: '✓ Bienvenido al Despacho',
      explore: 'Explorar Colección',
      collection: 'Nuestros Hoteles Boutique',
      conciergeAndOffices: 'Conserjería y Sede Central',
      legal: 'Aviso Legal y Privacidad',
      privacy: 'Política de Privacidad',
      terms: 'Condiciones de Reserva',
      cookies: 'Preferencias de Cookies',
      rights: 'Todos los derechos reservados. Impulsado por base de datos local en tiempo real.',
    },
    common: {
      close: 'Cerrar',
      save: 'Guardar',
      cancel: 'Cancelar',
      nights: 'noches',
      night: 'noche',
      guests: 'huéspedes',
      guest: 'huésped',
      rooms: 'habitaciones',
      room: 'habitación',
      from: 'Desde',
      loading: 'Cargando...',
    },
  },

  // ===================== FRANÇAIS (FRENCH) =====================
  fr: {
    topBanner: {
      dbLive: 'BD Locale En Ligne',
      dbNotice: (count) => `· Moteur de réservations en temps réel synchronisé avec \`/data/database.json\` (${count} réservations au total)`,
      settingsLink: 'Logo & Coordonnées',
      consoleLink: 'Console de Gestion →',
    },
    nav: {
      ourHotels: 'Nos Hôtels',
      philosophy: 'Brillamment Pensé',
      dining: 'Restaurants & Bars',
      neighbourhoods: 'Quartiers',
      findBooking: 'Trouver une réservation',
      dbConsole: 'Console BD',
      bookStay: 'Réserver un séjour',
      hotelsAndStays: 'Hôtels & Séjours',
      concierge: 'Conciergerie',
      language: 'Langue',
    },
    hero: {
      kickerPrefix: 'La Collection',
      kickerCities: ['Londres', 'Paris', 'Barcelone', 'Vienne', 'Gstaad'],
      headline: 'Des séjours européens brillamment pensés.',
      subheadline: 'Des sanctuaires intimes nichés dans des quartiers créatifs, alliant gastronomie vibrante et hospitalité chaleureuse.',
      exploreHotels: 'Découvrir nos hôtels disponibles',
      form: {
        destination: 'Destination & Hôtel',
        checkIn: 'Date d’arrivée',
        checkOut: 'Date de départ',
        guests: 'Voyageurs',
        adults: 'Adultes (18+)',
        children: 'Enfants (0-17)',
        submitBtn: 'Vérifier la disponibilité & Réserver',
        bestRate: 'Meilleur tarif garanti',
        instantSync: 'Synchronisation instantanée en BD locale',
        directBooking: 'Service de conciergerie direct',
      },
    },
    hotels: {
      kicker: 'Maisons Européennes',
      headline: 'Nos Hôtels de Caractère',
      description: 'Chaque adresse est une célébration intime de son quartier : architecture remarquable, artisans locaux et tables conviviales.',
      filterAll: 'Tous les hôtels européens',
      from: 'À partir de',
      night: 'nuit',
      availableRooms: 'disponibles',
      soldOut: 'Complet',
      viewDetails: 'Voir les détails',
      bookNow: 'Réserver directement',
      diningHighlight: 'Espace Gastronomique',
      reviews: 'avis vérifiés',
    },
    philosophy: {
      kicker: 'Notre Philosophie',
      headline: 'Brillamment Pensé',
      subheadline: 'Guidés par la conviction qu’un séjour s’enrichit de détails minutieux, d’une âme authentique et d’un ancrage local profond.',
      pillars: [
        {
          number: '01',
          title: 'Ancré dans le Quartier',
          description: 'Nous ne créons pas de bulles touristiques. Nos hôtels s’inscrivent dans des quartiers historiques et créatifs — Saint-Germain, El Born, Earl’s Court et Spittelberg — pour vous relier aux boulangers, galeristes et parcs confidentiels.',
        },
        {
          number: '02',
          title: 'L’Art du Sommeil Profond',
          description: 'Le sommeil est précieux. Chaque chambre bénéficie de matelas artisanaux à ressorts ensachés, de draps en lin biologique, d’une isolation phonique, d’élixirs botaniques et d’un menu d’oreillers sur mesure.',
        },
        {
          number: '03',
          title: 'Des Cœurs Sociaux Vibrants',
          description: 'Nos bars à cocktails et brasseries rassemblent voyageurs et riverains autour de vins biodynamiques et de cocktails signatures jusqu’au bout de la soirée.',
        },
        {
          number: '04',
          title: 'Des Séjours Fluides et Réfléchis',
          description: 'Chaque élément a son rôle : platines vinyles et disques locaux, aucun frais caché, annulation flexible et un système de réservation synchronisé en direct avec notre base de données locale.',
        },
      ],
    },
    dining: {
      kicker: 'Gastronomie Artisanale & Mixologie',
      headline: 'Restaurants & Bars de Quartier',
      description: 'Au cœur de chaque hôtel réside une table animée où résidents et habitués trinquent autour de créations de saison et d’apéritifs au vermouth.',
      reserveTable: 'Réserver une table',
      openingHours: 'Heures d’ouverture',
      signatureDish: 'Création signature',
      curatedWines: 'Carte de vins naturels & biodynamiques',
    },
    neighbourhoods: {
      kicker: 'Enclaves Européennes d’Exception',
      headline: 'Nos Quartiers',
      description: 'Nous sélectionnons des adresses chargées d’histoire et d’énergie. Découvrez nos cartes de quartier confidentielles et nos adresses d’artisans.',
      items: [
        {
          id: 'london',
          tag: '01 · Royaume-Uni · Londres',
          title: 'Earl’s Court & Kensington',
          description: 'Jardins communaux arborés, architecture victorienne en brique rouge et proximité immédiate avec les grands musées.',
          homeTo: 'Adresse de Templeton Garden',
        },
        {
          id: 'paris',
          tag: '02 · France · Paris',
          title: 'Saint-Germain-des-Prés',
          description: 'Cafés littéraires mythiques, éditeurs d’art de la rue de Grenelle et promenades matinales dans les allées du Jardin du Luxembourg.',
          homeTo: 'Adresse du Grand Hôtel Cayré',
        },
        {
          id: 'barcelona',
          tag: '03 · Espagne · Barcelone',
          title: 'El Born',
          description: 'Ruelles pavées ensoleillées, ateliers de céramique d’art, fraîcheur du parc de la Ciutadella et bodegas de vin naturel intimes.',
          homeTo: 'Adresse de Borneta',
        },
        {
          id: 'vienna-rudolf',
          tag: '04 · Autriche · Vienne',
          title: 'Innere Stadt & Ringstraße',
          description: 'Grands boulevards impériaux, quiétude de la Rudolfsplatz, prestigieux opéras et architecture palatiale en marbre.',
          homeTo: 'Adresse du Palais Rudolf',
        },
        {
          id: 'vienna-spittelberg',
          tag: '05 · Autriche · Vienne',
          title: 'Spittelberg & MuseumsQuartier',
          description: 'Allées pavées de style Biedermeier, ateliers d’artisans indépendants, galeries contemporaines et culture vivante des cafés viennois.',
          homeTo: 'Adresse de Spittelberg',
        },
        {
          id: 'gstaad',
          tag: '06 · Suisse · Gstaad',
          title: 'Oberland Bernois & Promenade',
          description: 'Chalets alpins de carte postale, glaciers enneigés, sentiers d’altitude et douces soirées fondue au coin du feu.',
          homeTo: 'Adresse de The Mansard',
        },
      ],
    },
    bookingModal: {
      title: 'Réservation Sur Mesure',
      step1: 'Dates & Hôtel',
      step2: 'Choix de Chambre',
      step3: 'Coordonnées',
      step4: 'Confirmation',
      datesAndHotel: 'Dates & Destination',
      selectRoom: 'Choisissez votre Refuge',
      guestDetails: 'Coordonnées & Préférences',
      confirmation: 'Réservation Confirmée',
      destinationLabel: 'Sélectionner l’hôtel',
      checkInLabel: 'Date d’arrivée',
      checkOutLabel: 'Date de départ',
      adultsLabel: 'Adultes',
      childrenLabel: 'Enfants',
      continueToRooms: 'Poursuivre vers les chambres',
      back: 'Retour',
      availableBadge: 'Disponible en BD locale',
      roomsLeft: (n) => `${n} chambre${n === 1 ? '' : 's'} disponible${n === 1 ? '' : 's'}`,
      perNight: 'par nuit',
      includesTaxes: 'Taxes de séjour & Wi-Fi haut débit inclus',
      selectThisRoom: 'Choisir cette chambre',
      selected: 'Sélectionnée',
      guestInformation: 'Informations sur le Voyageur',
      fullName: 'Nom et Prénom',
      fullNamePlaceholder: 'ex. Victoire de Montmirail',
      email: 'Adresse Email',
      emailPlaceholder: 'ex. victoire@example.com',
      phone: 'Numéro de Téléphone',
      phonePlaceholder: 'ex. +33 6 12 34 56 78',
      specialRequests: 'Demandes Spéciales / Régimes (Optionnel)',
      specialRequestsPlaceholder: 'Vue calme sur cour, oreillers sans plumes, coupe de champagne à l’arrivée...',
      addOnsTitle: 'Expériences & Attentions Signatures',
      addOnsSubtitle: 'Sublimez votre séjour avec nos prestations choisies',
      addOnItems: {
        breakfast: {
          title: 'Panier Petit-Déjeuner de Boulangerie Artisanale',
          desc: 'Viennoiseries croustillantes, jus pressés à froid, œufs bio et beurre de ferme livrés à votre porte.',
          price: '28 € / personne / jour',
        },
        lateCheckout: {
          title: 'Départ Tardif Garanti à 14h00',
          desc: 'Prenez votre temps avec un café matinal et un départ serein sans précipitation.',
          price: '45 € forfait',
        },
        airportTransfer: {
          title: 'Chauffeur Privé en Berline Mercedes Hybride',
          desc: 'Transfert direct et élégant depuis l’aéroport ou la gare internationale.',
          price: '95 € par trajet',
        },
        wellnessKit: {
          title: 'Coffret Botanique Sommeil & Sérénité',
          desc: 'Élixir de tilleul relaxant, brume d’oreiller à la lavande, masque de soie et séance sonore immersive.',
          price: '35 € le coffret',
        },
      },
      orderSummary: 'Récapitulatif de la Réservation',
      nightsCount: (n) => `${n} Nuit${n === 1 ? '' : 's'}`,
      totalAmount: 'Montant Total',
      completeBooking: 'Confirmer & Enregistrer dans la BD Locale',
      confirmingBooking: 'Synchronisation avec /data/database.json...',
      successTitle: 'Votre séjour est confirmé & synchronisé',
      successMessage: 'Votre réservation a été inscrite directement dans la base de données JSON locale et figure immédiatement dans la Console de Gestion.',
      refNumber: 'Référence de Réservation',
      localDbSyncVerified: 'Enregistrement BD vérifié (Statut : Confirmé)',
      openInManagement: 'Ouvrir dans la Console de Gestion →',
      downloadVoucher: 'Imprimer / Télécharger le Bon de Réservation',
      doneBtn: 'Terminé & Retour à la Collection',
    },
    lookupModal: {
      title: 'Consulter ma Réservation',
      subtitle: 'Retrouvez et gérez votre réservation directement depuis notre base de données locale.',
      refLabel: 'Numéro de Référence de Réservation',
      refPlaceholder: 'ex. MRV-2026-XXXXX',
      emailLabel: 'Adresse Email du Voyageur',
      emailPlaceholder: 'L’adresse utilisée lors de la réservation',
      searchBtn: 'Rechercher la Réservation',
      searching: 'Interrogation de la base de données...',
      notFound: 'Aucune réservation correspondant à cette référence et à cet email n’a été trouvée.',
      foundTitle: 'Réservation Retrouvée',
      status: 'Statut de Réservation',
      hotel: 'Hôtel & Ville',
      room: 'Catégorie de Chambre',
      stayDates: 'Dates de Séjour',
      totalPaid: 'Prix Total',
      cancelBooking: 'Annuler la Réservation',
      cancelling: 'Mise à jour de la base de données...',
      cancelSuccess: 'Votre réservation a été annulée avec succès dans la base de données.',
      printVoucher: 'Imprimer le Bon',
      close: 'Fermer',
    },
    hotelDetail: {
      overviewTab: 'Présentation',
      roomsTab: 'Chambres Disponibles',
      diningTab: 'Tables & Bars',
      amenitiesTab: 'Services & Équipements',
      bookRoomBtn: 'Réserver cette chambre',
      directContact: 'Contact Direct & Réception',
      ratingAndReviews: 'Note Globale & Avis Vérifiés',
      roomFeatures: 'Équipements & Prestations',
      size: 'Superficie',
      bed: 'Literie',
      view: 'Vue',
      maxGuests: 'Capacité',
      bookThisRoom: 'Réserver cette Chambre',
    },
    management: {
      title: 'Base de Données Locale & Gestion des Réservations',
      subtitle: 'Opérations CRUD en temps réel synchronisées avec `/data/database.json`.',
      dbConnected: 'Connecté au fichier JSON local',
      totalBookings: 'Total Réservations',
      confirmed: 'Confirmées',
      checkedIn: 'Enregistrées',
      cancelled: 'Annulées',
      filterAll: 'Toutes les réservations',
      searchPlaceholder: 'Rechercher par référence, nom, email ou hôtel...',
      tableHeaders: {
        ref: 'Référence',
        guest: 'Voyageur & Email',
        hotel: 'Hôtel & Chambre',
        dates: 'Arrivée / Départ',
        total: 'Total',
        status: 'Statut',
        actions: 'Actions',
      },
      newBookingBtn: '+ Nouvelle Réservation',
      exportCsv: 'Exporter CSV',
      noBookingsFound: 'Aucune réservation ne correspond à vos critères.',
      saveChanges: 'Enregistrer les modifications',
      close: 'Fermer la Console',
    },
    footer: {
      newsletterTitle: 'La Dépêche Miirovelle',
      newsletterSubtitle: 'Guides culturels exclusifs, ouvertures de tables confidentielles et tarifs privés abonnés.',
      newsletterPlaceholder: 'Saisissez votre adresse email',
      subscribe: 'S’inscrire',
      subscribed: '✓ Bienvenue à La Dépêche',
      explore: 'Explorer la Collection',
      collection: 'Nos Hôtels Boutique',
      conciergeAndOffices: 'Conciergerie & Siège Social',
      legal: 'Mentions Légales & Confidentialité',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions Générales de Réservation',
      cookies: 'Gestion des Cookies',
      rights: 'Tous droits réservés. Propulsé par moteur de base de données locale en temps réel.',
    },
    common: {
      close: 'Fermer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      nights: 'nuits',
      night: 'nuit',
      guests: 'voyageurs',
      guest: 'voyageur',
      rooms: 'chambres',
      room: 'chambre',
      from: 'Dès',
      loading: 'Chargement...',
    },
  },
};
