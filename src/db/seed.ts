import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { tours } from "./schema/tours";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

const seedTours = [
  {
    title: "Charyn Canyon Adventure",
    description:
      "Explore the breathtaking Charyn Canyon, often called the 'Grand Canyon's little brother.' Trek through the Valley of Castles, marvel at dramatic red sandstone formations carved by millions of years of erosion, and enjoy a picnic lunch by the Charyn River. This full-day tour includes comfortable transport from Almaty, an experienced guide, and unforgettable photo opportunities.",
    price: "45000",
    location: "Charyn Canyon, Almaty Region",
    duration: "1 day",
    difficulty: "moderate" as const,
    maxGroupSize: 15,
    images: [
      "https://images.unsplash.com/photo-1580311099638-79c3e4526bfe?w=800",
      "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800",
    ],
    popularityScore: 95,
  },
  {
    title: "Kolsai Lakes Trek",
    description:
      "Discover the stunning Kolsai Lakes, known as the 'Pearls of the Northern Tien Shan.' This two-day trek takes you through alpine meadows and dense spruce forests to three pristine mountain lakes, each more beautiful than the last. Camp under the stars at 2,500m altitude and wake up to mirror-like reflections of snow-capped peaks.",
    price: "85000",
    location: "Kolsai Lakes, Almaty Region",
    duration: "2 days",
    difficulty: "moderate" as const,
    maxGroupSize: 10,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    ],
    popularityScore: 92,
  },
  {
    title: "Big Almaty Lake Day Trip",
    description:
      "Visit the jewel of the Tien Shan mountains — Big Almaty Lake, a stunning alpine reservoir at 2,511m altitude. The lake's vivid turquoise color changes with the seasons, creating a mesmerizing palette from deep blue to emerald green. Enjoy scenic viewpoints, learn about the lake's importance to Almaty's water supply, and breathe in the crisp mountain air.",
    price: "25000",
    location: "Big Almaty Lake, Almaty",
    duration: "Half day",
    difficulty: "easy" as const,
    maxGroupSize: 20,
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
    ],
    popularityScore: 88,
  },
  {
    title: "Altyn-Emel National Park Safari",
    description:
      "Journey through the vast Altyn-Emel National Park, home to the famous Singing Dune, ancient burial mounds, and unique wildlife. This two-day expedition covers the park's key highlights: the 150-meter-high Singing Dune that produces hauntingly beautiful sounds, the Aktau painted mountains with their rainbow-like layers, and the chance to spot rare Przewalski's horses in the wild.",
    price: "120000",
    location: "Altyn-Emel, Almaty Region",
    duration: "2 days",
    difficulty: "easy" as const,
    maxGroupSize: 12,
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800",
    ],
    popularityScore: 85,
  },
  {
    title: "Turgen Gorge & Waterfalls",
    description:
      "Hike through the lush Turgen Gorge to discover hidden waterfalls and hot springs. The trail winds through birch and spruce forests, passing the spectacular Bear Waterfall (30m) and the serene Kairak Waterfall. Cool off in natural pools and enjoy a traditional Kazakh lunch prepared over an open fire. A perfect escape from the city.",
    price: "35000",
    location: "Turgen Gorge, Almaty Region",
    duration: "1 day",
    difficulty: "moderate" as const,
    maxGroupSize: 15,
    images: [
      "https://images.unsplash.com/photo-1432405972618-c6b0cfba8b57?w=800",
      "https://images.unsplash.com/photo-1520962922320-2038eebab146?w=800",
    ],
    popularityScore: 78,
  },
  {
    title: "Shymbulak Ski Resort Experience",
    description:
      "Hit the slopes at Shymbulak, Kazakhstan's premier ski resort nestled in the Zailiyskiy Alatau mountains at 2,260m altitude. Whether you're a beginner or an expert, enjoy world-class runs with stunning mountain panoramas. The package includes equipment rental, lift passes, and a cozy lunch at the resort's mountain restaurant.",
    price: "55000",
    location: "Shymbulak, Almaty",
    duration: "1 day",
    difficulty: "moderate" as const,
    maxGroupSize: 8,
    images: [
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800",
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800",
    ],
    popularityScore: 80,
  },
  {
    title: "Silk Road Heritage Tour",
    description:
      "Trace the ancient Silk Road through southern Kazakhstan. Visit the UNESCO-listed Mausoleum of Khoja Ahmed Yasawi in Turkestan, explore the ruins of Otrar, and walk through the bustling bazaars of Shymkent. This cultural immersion tour reveals Kazakhstan's rich history as a crossroads of civilizations, complete with traditional music, crafts, and cuisine.",
    price: "250000",
    location: "Turkestan & Shymkent",
    duration: "4 days",
    difficulty: "easy" as const,
    maxGroupSize: 12,
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800",
    ],
    popularityScore: 90,
  },
  {
    title: "Kaindy Lake & Sunken Forest",
    description:
      "Visit the ethereal Kaindy Lake, famous for its underwater forest of submerged spruce trees rising from the turquoise water like ghostly sentinels. Formed by a 1911 earthquake that triggered a massive landslide, this natural wonder is one of Kazakhstan's most photographed spots. The tour includes a moderate hike, photography stops, and a visit to nearby Kaindy Gorge.",
    price: "65000",
    location: "Kaindy Lake, Almaty Region",
    duration: "1 day",
    difficulty: "moderate" as const,
    maxGroupSize: 10,
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800",
    ],
    popularityScore: 87,
  },
  {
    title: "Baikonur Cosmodrome Visit",
    description:
      "Witness history at the Baikonur Cosmodrome, the world's first and largest operational space launch facility. Tour the historic launch pads where Yuri Gagarin began his journey to the stars, visit the space museum, and if timing aligns, watch a real rocket launch. This once-in-a-lifetime experience bridges the vast Kazakh steppe with the cosmos above.",
    price: "350000",
    location: "Baikonur, Kyzylorda Region",
    duration: "3 days",
    difficulty: "easy" as const,
    maxGroupSize: 20,
    images: [
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
      "https://images.unsplash.com/photo-1457364887197-9150188c107b?w=800",
    ],
    popularityScore: 82,
  },
  {
    title: "Aksu-Zhabagly Nature Reserve Trek",
    description:
      "Explore Central Asia's oldest nature reserve, home to rare snow leopards, golden eagles, and over 1,400 plant species including wild tulips. This three-day trek takes you through dramatic gorges, alpine pastures dotted with wildflowers, and ancient petroglyphs. Camp under pristine night skies far from any light pollution and connect with nature in its purest form.",
    price: "180000",
    location: "Aksu-Zhabagly, Turkestan Region",
    duration: "3 days",
    difficulty: "hard" as const,
    maxGroupSize: 8,
    images: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    ],
    popularityScore: 75,
  },
];

async function seed() {
  console.log("Seeding tours...");
  await db.insert(tours).values(seedTours);
  console.log(`Inserted ${seedTours.length} tours.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
