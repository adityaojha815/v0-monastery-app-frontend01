export interface Monastery {
  id: string
  name: string
  nameLocal: string
  location: string
  coordinates: { lat: number; lng: number }
  description: string
  history: string
  significance: string
  founded: string
  tradition: string
  difficulty: "Easy" | "Moderate" | "Challenging"
  rating: number
  reviewCount: number
  visitingHours: string
  entryFee: string
  bestTimeToVisit: string
  duration: string
  altitude: string
  nearbyAttractions: string[]
  facilities: string[]
  images: string[]
  featured: boolean
  category: "Ancient" | "Modern" | "Small" | "Large"
  accommodations: {
    name: string
    type: "Hotel" | "Guesthouse" | "Homestay" | "Resort"
    distance: string
    rating: number
    priceRange: string
  }[]
  restaurants: {
    name: string
    cuisine: string
    distance: string
    rating: number
    priceRange: string
  }[]
  reviews: {
    id: string
    author: string
    rating: number
    comment: string
    date: string
    helpful: number
  }[]
}

export const monasteries: Monastery[] = [
  {
    id: "1",
    name: "Rumtek Monastery",
    nameLocal: "རུམ་ཐེག་དགོན་པ།",
    location: "Gangtok, East Sikkim",
    coordinates: { lat: 27.3389, lng: 88.5583 },
    description:
      "The largest monastery in Sikkim and seat of the Karmapa, featuring golden stupas and intricate murals.",
    history: "Built in the 1960s by the 16th Karmapa, Rumtek is a replica of the original Tsurphu Monastery in Tibet.",
    significance: "Seat of the Karma Kagyu lineage and one of the most important monasteries in Sikkim.",
    founded: "1966",
    tradition: "Karma Kagyu",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 1247,
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: "Free",
    bestTimeToVisit: "March to May, September to November",
    duration: "2-3 hours",
    altitude: "1,550 meters",
    nearbyAttractions: ["Lingdum Monastery", "Gangtok City", "Enchey Monastery"],
    facilities: ["Parking", "Restrooms", "Gift Shop", "Meditation Hall"],
    images: ["/rumtek-monastery-golden-stupa.jpg", "/rumtek-monastery-interior.jpg"],
    featured: true,
    category: "Large",
    accommodations: [
      { name: "Hotel Sonam Delek", type: "Hotel", distance: "12 km", rating: 4.2, priceRange: "₹2,500-4,000" },
      { name: "Gangtok Residency", type: "Hotel", distance: "15 km", rating: 4.0, priceRange: "₹1,800-3,200" },
      {
        name: "Rumtek Monastery Guesthouse",
        type: "Guesthouse",
        distance: "0.5 km",
        rating: 3.8,
        priceRange: "₹800-1,500",
      },
    ],
    restaurants: [
      { name: "Taste of Tibet", cuisine: "Tibetan", distance: "1 km", rating: 4.3, priceRange: "₹200-400" },
      { name: "Monastery Cafe", cuisine: "Local", distance: "0.2 km", rating: 4.0, priceRange: "₹150-300" },
      { name: "Dragon Restaurant", cuisine: "Chinese", distance: "12 km", rating: 4.1, priceRange: "₹300-600" },
    ],
    reviews: [
      {
        id: "1",
        author: "Priya Sharma",
        rating: 5,
        comment: "Absolutely breathtaking monastery with incredible architecture and peaceful atmosphere.",
        date: "2024-01-15",
        helpful: 23,
      },
      {
        id: "2",
        author: "John Mitchell",
        rating: 4,
        comment: "Beautiful place with rich history. The golden stupa is magnificent.",
        date: "2024-01-10",
        helpful: 18,
      },
    ],
  },
  {
    id: "2",
    name: "Pemayangtse Monastery",
    nameLocal: "པད་མ་ཡང་རྩེ་དགོན་པ།",
    location: "Pelling, West Sikkim",
    coordinates: { lat: 27.2951, lng: 88.2158 },
    description:
      "One of the oldest monasteries in Sikkim with stunning views of Kanchenjunga and intricate wooden sculptures.",
    history: "Founded in 1705 by Lama Lhatsun Chempo, it is one of the premier monasteries of the Nyingma tradition.",
    significance: "Head monastery of the Nyingma order in Sikkim with a famous seven-tiered wooden sculpture.",
    founded: "1705",
    tradition: "Nyingma",
    difficulty: "Moderate",
    rating: 4.7,
    reviewCount: 892,
    visitingHours: "7:00 AM - 5:00 PM",
    entryFee: "Free",
    bestTimeToVisit: "October to December, March to May",
    duration: "2-3 hours",
    altitude: "2,085 meters",
    nearbyAttractions: ["Rabdentse Ruins", "Khecheopalri Lake", "Kanchenjunga Falls"],
    facilities: ["Parking", "Museum", "Library", "Guest Rooms"],
    images: ["/pemayangtse-monastery-mountain-view.jpg", "/pemayangtse-monastery-wooden-sculpture.jpg"],
    featured: true,
    category: "Ancient",
    accommodations: [
      { name: "Hotel Garuda", type: "Hotel", distance: "2 km", rating: 4.1, priceRange: "₹2,000-3,500" },
      { name: "Pelling Residency", type: "Resort", distance: "3 km", rating: 4.3, priceRange: "₹3,000-5,000" },
      { name: "Monastery Guesthouse", type: "Guesthouse", distance: "0.1 km", rating: 3.9, priceRange: "₹600-1,200" },
    ],
    restaurants: [
      {
        name: "Melting Point Restaurant",
        cuisine: "Multi-cuisine",
        distance: "2 km",
        rating: 4.2,
        priceRange: "₹250-500",
      },
      { name: "Big Bite", cuisine: "Indian", distance: "2.5 km", rating: 3.9, priceRange: "₹200-400" },
      { name: "Monastery Kitchen", cuisine: "Tibetan", distance: "0.1 km", rating: 4.0, priceRange: "₹150-300" },
    ],
    reviews: [
      {
        id: "3",
        author: "Rajesh Kumar",
        rating: 5,
        comment: "The view of Kanchenjunga from here is absolutely stunning. A must-visit place.",
        date: "2024-01-12",
        helpful: 31,
      },
      {
        id: "4",
        author: "Sarah Johnson",
        rating: 4,
        comment: "Beautiful ancient monastery with incredible wooden carvings and peaceful environment.",
        date: "2024-01-08",
        helpful: 19,
      },
    ],
  },
  {
    id: "3",
    name: "Enchey Monastery",
    nameLocal: "ཨེན་ཅེ་དགོན་པ།",
    location: "Gangtok, East Sikkim",
    coordinates: { lat: 27.3314, lng: 88.6138 },
    description: "A 200-year-old monastery known for its annual Cham dance and beautiful location overlooking Gangtok.",
    history: "Built in 1909 on the site blessed by Lama Druptob Karpo, a tantric master with flying powers.",
    significance: "Famous for its annual Cham dance festival and traditional Nyingma practices.",
    founded: "1909",
    tradition: "Nyingma",
    difficulty: "Easy",
    rating: 4.5,
    reviewCount: 634,
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: "Free",
    bestTimeToVisit: "Year-round, December for Cham dance",
    duration: "1-2 hours",
    altitude: "1,675 meters",
    nearbyAttractions: ["Ganesh Tok", "Hanuman Tok", "Flower Exhibition Centre"],
    facilities: ["Parking", "Prayer Wheels", "Meditation Area"],
    images: ["/enchey-monastery-prayer-wheels.jpg", "/enchey-monastery-cham-dance.jpg"],
    featured: false,
    category: "Small",
    accommodations: [
      { name: "Hotel Tibet", type: "Hotel", distance: "3 km", rating: 4.0, priceRange: "₹1,500-2,800" },
      { name: "Gangtok Delight", type: "Hotel", distance: "4 km", rating: 3.8, priceRange: "₹1,200-2,200" },
      { name: "Enchey Homestay", type: "Homestay", distance: "0.8 km", rating: 4.2, priceRange: "₹800-1,500" },
    ],
    restaurants: [
      { name: "Nimtho Restaurant", cuisine: "Sikkimese", distance: "2 km", rating: 4.4, priceRange: "₹200-400" },
      { name: "Cafe Live & Loud", cuisine: "Continental", distance: "3 km", rating: 4.1, priceRange: "₹300-600" },
      { name: "Local Tea House", cuisine: "Snacks", distance: "0.5 km", rating: 3.9, priceRange: "₹100-250" },
    ],
    reviews: [
      {
        id: "5",
        author: "Anita Rai",
        rating: 4,
        comment: "Peaceful monastery with beautiful prayer wheels. Great views of Gangtok city.",
        date: "2024-01-14",
        helpful: 15,
      },
      {
        id: "6",
        author: "David Chen",
        rating: 5,
        comment: "Attended the Cham dance festival - absolutely mesmerizing cultural experience!",
        date: "2023-12-28",
        helpful: 28,
      },
    ],
  },
  {
    id: "4",
    name: "Tashiding Monastery",
    nameLocal: "བཀྲ་ཤིས་སྡིང་དགོན་པ།",
    location: "Tashiding, West Sikkim",
    coordinates: { lat: 27.3167, lng: 88.2667 },
    description: "Sacred monastery on a hilltop between two rivers, considered the holiest in Sikkim.",
    history:
      "Founded in 1641 by Ngadak Sempa Chenpo, it is built on a conical hill between Rathong and Rangeet rivers.",
    significance: "Most sacred monastery in Sikkim, believed that a glimpse of it washes away sins.",
    founded: "1641",
    tradition: "Nyingma",
    difficulty: "Challenging",
    rating: 4.9,
    reviewCount: 456,
    visitingHours: "6:00 AM - 5:00 PM",
    entryFee: "Free",
    bestTimeToVisit: "February-March for Bumchu festival, October-December",
    duration: "3-4 hours including trek",
    altitude: "1,465 meters",
    nearbyAttractions: ["Yuksom", "Khecheopalri Lake", "Dubdi Monastery"],
    facilities: ["Basic Facilities", "Sacred Chorten", "Festival Ground"],
    images: ["/tashiding-monastery-hilltop-view.jpg", "/tashiding-monastery-sacred-chorten.jpg"],
    featured: true,
    category: "Ancient",
    accommodations: [
      { name: "Tashiding Residency", type: "Guesthouse", distance: "1 km", rating: 3.7, priceRange: "₹800-1,500" },
      { name: "Yuksom Retreat", type: "Resort", distance: "8 km", rating: 4.0, priceRange: "₹2,500-4,000" },
      { name: "Village Homestay", type: "Homestay", distance: "0.5 km", rating: 4.1, priceRange: "₹600-1,000" },
    ],
    restaurants: [
      { name: "Hilltop Cafe", cuisine: "Local", distance: "0.3 km", rating: 3.8, priceRange: "₹150-300" },
      { name: "Tashiding Kitchen", cuisine: "Tibetan", distance: "0.8 km", rating: 4.0, priceRange: "₹200-400" },
      {
        name: "River View Restaurant",
        cuisine: "Multi-cuisine",
        distance: "1.2 km",
        rating: 3.9,
        priceRange: "₹250-500",
      },
    ],
    reviews: [
      {
        id: "7",
        author: "Lama Tenzin",
        rating: 5,
        comment: "The most sacred place in Sikkim. The spiritual energy here is incredible.",
        date: "2024-01-11",
        helpful: 42,
      },
      {
        id: "8",
        author: "Maria Rodriguez",
        rating: 5,
        comment: "Challenging trek but absolutely worth it. The monastery and views are breathtaking.",
        date: "2024-01-05",
        helpful: 35,
      },
    ],
  },
  {
    id: "5",
    name: "Dubdi Monastery",
    nameLocal: "གྲུབ་སྡེ་དགོན་པ།",
    location: "Yuksom, West Sikkim",
    coordinates: { lat: 27.3667, lng: 88.2167 },
    description: "The oldest monastery in Sikkim, also known as the Hermit's Cell, founded by Lhatsun Chenpo.",
    history: "Built in 1701, it is the first monastery established in Sikkim and holds great historical significance.",
    significance: "First monastery of Sikkim and coronation site of the first Chogyal (king) of Sikkim.",
    founded: "1701",
    tradition: "Nyingma",
    difficulty: "Moderate",
    rating: 4.6,
    reviewCount: 298,
    visitingHours: "7:00 AM - 5:00 PM",
    entryFee: "Free",
    bestTimeToVisit: "March to May, September to November",
    duration: "2-3 hours including trek",
    altitude: "2,100 meters",
    nearbyAttractions: ["Yuksom Coronation Throne", "Norbugang Park", "Kathok Lake"],
    facilities: ["Trekking Path", "Ancient Artifacts", "Meditation Cave"],
    images: ["/dubdi-monastery-oldest-sikkim.jpg", "/dubdi-monastery-meditation-cave.jpg"],
    featured: false,
    category: "Ancient",
    accommodations: [
      { name: "Yuksom Residency", type: "Hotel", distance: "2 km", rating: 3.9, priceRange: "₹1,500-2,500" },
      { name: "Trekkers Lodge", type: "Guesthouse", distance: "1.5 km", rating: 3.8, priceRange: "₹800-1,400" },
      { name: "Dubdi Homestay", type: "Homestay", distance: "1 km", rating: 4.0, priceRange: "₹700-1,200" },
    ],
    restaurants: [
      { name: "Yuksom Kitchen", cuisine: "Local", distance: "2 km", rating: 4.1, priceRange: "₹180-350" },
      { name: "Trekkers Cafe", cuisine: "Continental", distance: "1.8 km", rating: 3.9, priceRange: "₹200-400" },
      { name: "Mountain View Restaurant", cuisine: "Tibetan", distance: "2.2 km", rating: 4.0, priceRange: "₹220-450" },
    ],
    reviews: [
      {
        id: "9",
        author: "Pemba Sherpa",
        rating: 5,
        comment:
          "The oldest monastery in Sikkim with incredible historical significance. A must-visit for history lovers.",
        date: "2024-01-09",
        helpful: 22,
      },
      {
        id: "10",
        author: "Jennifer Lee",
        rating: 4,
        comment: "Beautiful trek through the forest to reach this ancient monastery. Very peaceful and spiritual.",
        date: "2024-01-03",
        helpful: 18,
      },
    ],
  },
  {
    id: "6",
    name: "Lingdum Monastery",
    nameLocal: "གླིང་གདུམ་དགོན་པ།",
    location: "Ranka, East Sikkim",
    coordinates: { lat: 27.2833, lng: 88.5833 },
    description: "Modern monastery known for its beautiful architecture and peaceful meditation retreats.",
    history: "Established in 1999 by the 12th Zurmang Gharwang Rinpoche as a center for Buddhist learning.",
    significance: "Important center for Buddhist education and meditation practices in modern Sikkim.",
    founded: "1999",
    tradition: "Kagyu",
    difficulty: "Easy",
    rating: 4.4,
    reviewCount: 387,
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: "Free",
    bestTimeToVisit: "Year-round",
    duration: "1-2 hours",
    altitude: "1,200 meters",
    nearbyAttractions: ["Rumtek Monastery", "Ranka Village", "Sikkim Himalayan Zoological Park"],
    facilities: ["Meditation Hall", "Library", "Guest Rooms", "Parking"],
    images: ["/lingdum-monastery-modern-architecture.jpg", "/lingdum-monastery-meditation-hall.jpg"],
    featured: false,
    category: "Modern",
    accommodations: [
      { name: "Ranka Resort", type: "Resort", distance: "3 km", rating: 4.2, priceRange: "₹2,200-3,800" },
      { name: "Lingdum Guesthouse", type: "Guesthouse", distance: "0.5 km", rating: 3.9, priceRange: "₹900-1,600" },
      { name: "Valley View Homestay", type: "Homestay", distance: "2 km", rating: 4.0, priceRange: "₹800-1,400" },
    ],
    restaurants: [
      { name: "Ranka Kitchen", cuisine: "Sikkimese", distance: "2.5 km", rating: 4.2, priceRange: "₹200-400" },
      { name: "Monastery Canteen", cuisine: "Vegetarian", distance: "0.2 km", rating: 3.8, priceRange: "₹120-250" },
      { name: "Hillside Cafe", cuisine: "Multi-cuisine", distance: "3 km", rating: 4.0, priceRange: "₹250-500" },
    ],
    reviews: [
      {
        id: "11",
        author: "Karma Lama",
        rating: 4,
        comment: "Beautiful modern monastery with excellent facilities for meditation and learning.",
        date: "2024-01-13",
        helpful: 16,
      },
      {
        id: "12",
        author: "Robert Wilson",
        rating: 4,
        comment: "Peaceful place with modern amenities. Great for those seeking spiritual retreat.",
        date: "2024-01-07",
        helpful: 12,
      },
    ],
  },
]
