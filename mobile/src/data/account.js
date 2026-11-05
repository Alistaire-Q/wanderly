/* ============================================
   Wanderly — Signed-in account data

   The Settings screen and the Profile screen
   read from here. Posts live in App state so
   new posts and likes survive navigation.
   ============================================ */

export const defaultAccount = {
  name: 'Lawrence Russel',
  email: 'lawrence@example.com',
  bio: 'Chasing blue flames and sunrises across Indonesia.',
  avatar: null,
  followers: 1280,
  following: 342,
}

export const seedPosts = [
  {
    id: 'post-ijen',
    image: '/images/ijen-lake.jpg',
    caption:
      'Sunrise over the turquoise crater lake. Worth every step at 2 am.',
    time: '2 hours ago',
    likes: 128,
    liked: true,
    comments: [
      {
        id: 'c-1',
        author: 'Amelia Foster',
        text: 'That colour is unreal!',
        likes: 14,
        liked: false,
      },
      {
        id: 'c-2',
        author: 'Daniel Putra',
        text: 'Adding this to my list.',
        likes: 3,
        liked: false,
      },
    ],
  },
  {
    id: 'post-bromo',
    image: '/images/bromo.jpg',
    caption:
      'Bromo at dawn. The whole valley was covered in smoke and gold light.',
    time: 'Yesterday',
    likes: 96,
    liked: false,
    comments: [
      {
        id: 'c-3',
        author: 'Sari Wulandari',
        text: 'Best sunrise in Java.',
        likes: 6,
        liked: false,
      },
    ],
  },
  {
    id: 'post-komodo',
    image: '/images/komodo.jpg',
    caption: 'Pink Beach and a Komodo dragon in the same afternoon. Unreal.',
    time: '3 days ago',
    likes: 214,
    liked: false,
    comments: [],
  },
]

/* The signed-in user's own reviews, shown on the Review tab. */
export const myReviews = [
  {
    id: 'rev-ijen',
    serviceId: 'ijen-crater',
    rating: '5.0',
    date: 'Sep 2026',
    text: 'Hiking down to the crater at 2 am was worth every step. The blue flames are surreal and the turquoise lake looks like it belongs on another planet.',
  },
  {
    id: 'rev-komodo',
    serviceId: 'komodo',
    rating: '4.5',
    date: 'Aug 2026',
    text: 'The boat trip was well organised and the guides knew exactly where to find the dragons.',
  },
  {
    id: 'rev-tanah',
    serviceId: 'tanah-lot',
    rating: '4.0',
    date: 'Jul 2026',
    text: 'Sunset at the temple is crowded but absolutely worth it. Come an hour early.',
  },
]
