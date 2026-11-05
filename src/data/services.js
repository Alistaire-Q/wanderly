/* ============================================
   Wanderly — Service data

   Single source of truth for every destination:
   the List of Services screen, the Service Detail
   screen and both rows on the Home screen.

   `listed: false` keeps a destination off the List
   of Services screen — it still has a full Detail
   page and is shown on Home.
   ============================================ */

export const serviceFilters = [
  'Hiking',
  'Hotel',
  'Beach',
  'Villa',
  'Nature',
  'Culture',
]

export const services = [
  {
    id: 'ijen-crater',
    name: 'Ijen Crater',
    category: 'Travel',
    location: 'Banyuwangi, East Java',
    rating: '4.5',
    reviews: '8k+',
    price: 'Rp. 450.000',
    image: '/images/ijen.jpg',
    hero: '/images/ijen-hero.jpg',
    description:
      'Ijen crater is an active volcano renowned for the beauty of the turquoise-green Ijen Crater Lake and its blue flame phenomenon',
    longDescription:
      'Ijen crater is an active volcano in Banyuwangi, East Java, famous for its turquoise-green acidic crater lake and the electric blue flame phenomenon. Whether you come for the sunrise, the panoramic views, or the volcanic scenery, Ijen offers an unforgettable adventure.',
    tags: ['Volcano', 'Hiking'],
    gallery: ['/images/ijen-lake.jpg', '/images/ijen-miner.jpg', '/images/ijen.jpg'],
    features: [
      {
        icon: 'flame',
        label: 'Rare Blue Fire',
        sublabel: 'Unique natural phenomenon',
      },
      {
        icon: 'eye',
        label: 'Stunning Views',
        sublabel: 'Crater with vivid turquoise color',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Lawrence Russel',
      initials: 'LR',
      rating: '5.0',
      text: 'Hiking down to the crater at 2 am was worth every step. The blue flames are surreal and the turquoise lake looks like it belongs on another planet.',
    },
  },
  {
    id: 'raja-ampat',
    name: 'Raja Ampat Island',
    category: 'Travel',
    location: 'Raja Ampat, West Papua',
    rating: '4.3',
    reviews: '5k+',
    price: 'Rp. 1.250.000',
    image: '/images/raja-ampat.jpg',
    description:
      'Raja Ampat is an archipelago of over 1,500 small islands, cays and shoals surrounding the four main islands of Misool, Salawati, Batanta and Waigeo',
    longDescription:
      'Raja Ampat is an archipelago of more than 1,500 small islands, cays and shoals in the heart of the Coral Triangle. It holds the richest marine biodiversity on earth, with karst islands, hidden lagoons and viewpoints that stay with you long after you leave.',
    tags: ['Beach', 'Nature'],
    gallery: ['/images/raja-ampat.jpg', '/images/bunaken.jpg', '/images/derawan.jpg'],
    features: [
      {
        icon: 'waves',
        label: 'Rich Marine Life',
        sublabel: 'Home to 75% of coral species',
      },
      {
        icon: 'eye',
        label: 'Stunning Views',
        sublabel: 'Karst islands and lagoons',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Amelia Foster',
      initials: 'AF',
      rating: '4.8',
      text: 'The clearest water I have ever seen. We snorkelled every day and still felt like we had barely scratched the surface of the archipelago.',
    },
  },
  {
    id: 'komodo',
    name: 'Komodo Island',
    category: 'Travel',
    location: 'Komodo Island, East Nusa Tenggara',
    rating: '4.3',
    reviews: '3k+',
    price: 'Rp. 850.000',
    image: '/images/komodo.jpg',
    description:
      'Komodo Island is the native habitat of the Komodo dragon, the world’s largest living lizard, surrounded by pink beaches and clear water',
    longDescription:
      'Komodo Island is the native habitat of the Komodo dragon, the world’s largest living lizard. A ranger-led trek crosses savanna hills where the dragons roam freely, and the park also covers Padar Island, Pink Beach and some of the best dive sites in Indonesia.',
    tags: ['Hiking', 'Beach'],
    gallery: ['/images/komodo.jpg', '/images/pink-beach.jpg', '/images/nusa-penida.jpg'],
    features: [
      {
        icon: 'mountain',
        label: 'Rare Wildlife',
        sublabel: 'Home of the Komodo dragon',
      },
      {
        icon: 'eye',
        label: 'Stunning Views',
        sublabel: 'Pink beaches and savanna hills',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Daniel Putra',
      initials: 'DP',
      rating: '4.7',
      text: 'Seeing the dragons in the wild was unforgettable. The stop at Pink Beach afterwards made the whole trip perfect.',
    },
  },
  {
    id: 'borobudur',
    name: 'Borobudur Temple',
    category: 'Travel',
    location: 'Magelang, Central Java',
    rating: '4.2',
    reviews: '12k+',
    price: 'Rp. 150.000',
    image: '/images/borobudur.jpg',
    description:
      'Borobudur is the world’s largest Buddhist temple, built in the 9th century and decorated with 2,672 relief panels and 504 Buddha statues',
    longDescription:
      'Borobudur is the world’s largest Buddhist temple and a UNESCO World Heritage Site, built in the 9th century and decorated with 2,672 relief panels and 504 Buddha statues. Sunrise from the stupas, with Mount Merapi rising through the mist, is the classic experience.',
    tags: ['Culture'],
    gallery: ['/images/borobudur.jpg', '/images/bromo.jpg', '/images/tanah-lot.jpg'],
    features: [
      {
        icon: 'temple',
        label: 'Ancient Heritage',
        sublabel: '9th century Buddhist temple',
      },
      {
        icon: 'eye',
        label: 'Stunning Views',
        sublabel: 'Sunrise above the stupas',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Siti Rahma',
      initials: 'SR',
      rating: '4.6',
      text: 'Arrived before sunrise and had the temple almost to ourselves. The reliefs are incredibly detailed — bring a guide to read them properly.',
    },
  },
  {
    id: 'diamond-beach',
    name: 'Diamond Beach',
    category: 'Travel',
    location: 'Nusa Penida, Bali',
    rating: '4.5',
    reviews: '2k+',
    price: 'Rp. 250.000',
    image: '/images/diamond-beach.jpg',
    description:
      'Diamond Beach is a secluded white sand beach on Nusa Penida, framed by towering limestone cliffs and a famous diamond-shaped rock',
    longDescription:
      'Diamond Beach is a secluded white sand beach on the east coast of Nusa Penida, framed by towering limestone cliffs and named after the diamond-shaped rock that stands in the shallows. Crystal clear water and soft morning light make it a favourite stop.',
    tags: ['Beach', 'Nature'],
    gallery: ['/images/diamond-beach.jpg', '/images/nusa-penida.jpg', '/images/komodo.jpg'],
    features: [
      {
        icon: 'waves',
        label: 'Hidden Beach',
        sublabel: 'Framed by limestone cliffs',
      },
      {
        icon: 'eye',
        label: 'Stunning Views',
        sublabel: 'Crystal clear turquoise water',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Marco Villanueva',
      initials: 'MV',
      rating: '4.5',
      text: 'Steep stairs down, but the beach is pure paradise. Go early — the tide and the light are at their best before 10 am.',
    },
  },
  {
    id: 'nusa-penida',
    name: 'Nusa Penida',
    category: 'Travel',
    location: 'Nusa Penida, Bali',
    rating: '4.1',
    listed: false,
    reviews: '2k+',
    price: 'Rp. 300.000',
    image: '/images/nusa-penida.jpg',
    description:
      'Nusa Penida is a rugged island off the southeast coast of Bali, known for the cliffside viewpoint of Kelingking Beach and the natural pool at Angel’s Billabong',
    longDescription:
      'Nusa Penida is a rugged island off the southeast coast of Bali, a 45-minute fast boat ride from Sanur. Its west coast holds the T-rex shaped cliff of Kelingking Beach, the natural infinity pool at Angel’s Billabong and the broken arch of Broken Beach, while the north coast is the best place to swim with manta rays.',
    tags: ['Beach', 'Nature'],
    gallery: ['/images/nusa-penida.jpg', '/images/diamond-beach.jpg', '/images/pink-beach.jpg'],
    features: [
      {
        icon: 'waves',
        label: 'Cliffside Beaches',
        sublabel: 'Kelingking and Broken Beach',
      },
      {
        icon: 'eye',
        label: 'Stunning Views',
        sublabel: 'Sunset over the west coast',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Grace Lim',
      initials: 'GL',
      rating: '4.6',
      text: 'The Kelingking viewpoint is even better in person. The roads are rough, so hiring a driver for the day was the right call.',
    },
  },
  {
    id: 'pink-beach',
    name: 'Pink Beach',
    category: 'Travel',
    location: 'Pink Beach, Lombok',
    rating: '4.1',
    listed: false,
    reviews: '1k+',
    price: 'Rp. 275.000',
    image: '/images/pink-beach.jpg',
    description:
      'Pink Beach on Lombok’s east coast takes its rosy colour from crushed red coral and offers calm, clear water that is perfect for snorkelling',
    longDescription:
      'Pink Beach sits on the east coast of Lombok, a quiet stretch of sand tinted pink by millions of crushed red coral fragments. The reef starts only a few metres from the shore, so you can snorkel straight off the beach, and the drive through the fishing villages is part of the experience.',
    tags: ['Beach', 'Nature'],
    gallery: ['/images/pink-beach.jpg', '/images/komodo.jpg', '/images/nusa-penida.jpg'],
    features: [
      {
        icon: 'waves',
        label: 'Rosy Sand',
        sublabel: 'Coloured by crushed coral',
      },
      {
        icon: 'eye',
        label: 'Stunning Views',
        sublabel: 'Quiet bay on the east coast',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Hannah Weber',
      initials: 'HW',
      rating: '4.4',
      text: 'Quiet and almost empty in the morning. Bring reef shoes — the coral starts right at the shoreline.',
    },
  },
  {
    id: 'bromo',
    name: 'Mount Bromo',
    category: 'Travel',
    location: 'Mount Bromo, East Java',
    rating: '4.7',
    listed: false,
    reviews: '9k+',
    price: 'Rp. 350.000',
    image: '/images/bromo.jpg',
    description:
      'Mount Bromo is an active volcano in the Tengger caldera, famous for the sunrise over its smoking crater and the sea of sand below',
    longDescription:
      'Mount Bromo rises out of the vast Tengger caldera in East Java, surrounded by a sea of sand and the jagged rim of an older crater. Visitors leave around 3 am for the viewpoint on Mount Penanjakan, then cross the sand by 4x4 and climb the 250 steps to the rim of the crater.',
    tags: ['Volcano', 'Hiking'],
    gallery: ['/images/bromo.jpg', '/images/ijen.jpg', '/images/ijen-lake.jpg'],
    features: [
      {
        icon: 'mountain',
        label: 'Active Volcano',
        sublabel: 'Smoking crater at 2,329 m',
      },
      {
        icon: 'eye',
        label: 'Sunrise Point',
        sublabel: 'Above the sea of sand',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Putri Anjani',
      initials: 'PA',
      rating: '4.8',
      text: 'Cold, dusty and absolutely worth it. The sunrise from Penanjakan is the best I have seen in Indonesia.',
    },
  },
  {
    id: 'tanah-lot',
    name: 'Tanah Lot Temple',
    category: 'Travel',
    location: 'Tanah Lot, Bali',
    rating: '4.5',
    listed: false,
    reviews: '7k+',
    price: 'Rp. 100.000',
    image: '/images/tanah-lot.jpg',
    description:
      'Tanah Lot is a 16th century sea temple built on a tidal rock off Bali’s west coast, and the island’s most famous place to watch the sunset',
    longDescription:
      'Tanah Lot is a Balinese sea temple standing on a rock formation surrounded by the ocean, about 20 km north of Kuta. At low tide you can walk across the sand to its base, and at sunset the silhouette of the pagodas against the sky draws visitors from all over the island.',
    tags: ['Culture'],
    gallery: ['/images/tanah-lot.jpg', '/images/borobudur.jpg', '/images/bromo.jpg'],
    features: [
      {
        icon: 'temple',
        label: 'Sea Temple',
        sublabel: 'Built on a tidal rock',
      },
      {
        icon: 'eye',
        label: 'Sunset Views',
        sublabel: 'Silhouette over the ocean',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Kevin Tanaka',
      initials: 'KT',
      rating: '4.5',
      text: 'Come about an hour before sunset and walk to the far side of the cliff — you get the temple without the crowd.',
    },
  },
  {
    id: 'derawan',
    name: 'Derawan Islands',
    category: 'Travel',
    location: 'Derawan Islands, East Kalimantan',
    rating: '4.6',
    listed: false,
    reviews: '2k+',
    price: 'Rp. 900.000',
    image: '/images/derawan.jpg',
    description:
      'The Derawan Islands are a remote archipelago in East Kalimantan with turtle nesting beaches, a lake of stingless jellyfish and world class diving',
    longDescription:
      'The Derawan Islands sit off the coast of Berau in East Kalimantan, far from the usual tourist trail. Green turtles nest on Derawan itself, Kakaban holds a lake full of stingless jellyfish, and the reefs around Sangalaki and Maratua are among the richest in the country.',
    tags: ['Beach', 'Nature'],
    gallery: ['/images/derawan.jpg', '/images/raja-ampat.jpg', '/images/bunaken.jpg'],
    features: [
      {
        icon: 'waves',
        label: 'Turtle Beaches',
        sublabel: 'Green turtles all year',
      },
      {
        icon: 'eye',
        label: 'Jellyfish Lake',
        sublabel: 'Stingless jellyfish at Kakaban',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Sofia Mendes',
      initials: 'SM',
      rating: '4.7',
      text: 'Remote, quiet and full of turtles. We saw more marine life here in three days than in a week elsewhere.',
    },
  },
  {
    id: 'bunaken',
    name: 'Bunaken Island',
    category: 'Travel',
    location: 'Bunaken, North Sulawesi',
    rating: '4.8',
    listed: false,
    reviews: '4k+',
    price: 'Rp. 750.000',
    image: '/images/bunaken.jpg',
    description:
      'Bunaken is a small island in North Sulawesi surrounded by a marine park with coral walls, reef fish and turtles right off the beach',
    longDescription:
      'Bunaken is part of the Bunaken Manado Tua Marine Park in North Sulawesi, known for dramatic coral walls that drop 25 to 50 metres. Most guesthouses sit on the south beach, where the reef begins only a few metres from the sand.',
    tags: ['Beach', 'Nature'],
    gallery: ['/images/bunaken.jpg', '/images/derawan.jpg', '/images/raja-ampat.jpg'],
    features: [
      {
        icon: 'waves',
        label: 'Coral Walls',
        sublabel: 'Drop-offs off the beach',
      },
      {
        icon: 'eye',
        label: 'Marine Park',
        sublabel: 'Bunaken Manado Tua',
      },
      {
        icon: 'camera',
        label: 'Photogenic',
        sublabel: 'Unforgettable moments',
      },
    ],
    review: {
      name: 'Andre Costa',
      initials: 'AC',
      rating: '4.9',
      text: 'We snorkelled straight from the beach every morning and still saw turtles on every single swim.',
    },
  },
]

export const getService = (id) =>
  services.find((service) => service.id === id) ?? services[0]

/* Destinations shown on the List of Services screen, in order. */
export const listedServices = services.filter((service) => service.listed !== false)

/* Home screen rows, in display order. */
export const homePopular = ['nusa-penida', 'pink-beach', 'diamond-beach'].map((id) =>
  getService(id),
)

export const homeRecommended = [
  'raja-ampat',
  'komodo',
  'bromo',
  'tanah-lot',
  'derawan',
  'bunaken',
].map((id) => getService(id))
