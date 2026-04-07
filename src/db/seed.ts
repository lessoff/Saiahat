import { config } from "dotenv";
config({ path: ".env.local" });
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
      "Charyn Canyon sits about 200 kilometers east of Almaty, cutting through the steppe in a way that catches you completely off guard. The Valley of Castles section is where most people spend their time: walls of red and orange sandstone rising up to 300 meters, shaped over millions of years into columns, arches, and ridges that cast long shadows by late afternoon. The trail runs along the canyon floor beside the Charyn River, where the air is noticeably cooler and the sound of moving water carries through the rocks. We stop for lunch on the riverbank before climbing back up to the rim. Transport from Almaty is included, and the guide knows both the geology and the local folklore well enough to make the walk feel like more than just a sightseeing loop.",
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
      "The Kolsai Lakes are three separate bodies of water stacked up the same valley in the northern Tien Shan, each one sitting higher and quieter than the last. The trail winds through spruce forest that stays dense enough to muffle the wind, opening up at each lake into a wide alpine clearing. The lower lake is the largest and most visited. The middle one, reached after a solid two-hour climb, tends to hold a reflection of the surrounding peaks on calm mornings. We camp at around 2,500 meters, which means cold nights and no light pollution worth mentioning. Day two takes you back down at a pace that lets you stop where you want. Group size is kept small so the trail stays peaceful.",
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
      "Big Almaty Lake sits at 2,511 meters, less than an hour's drive from the city center, and the color of the water genuinely changes depending on the time of year. In early summer it runs a deep milky blue from glacial melt. By August it shifts toward green. The lake feeds Almaty's water supply, which is part of why the surrounding area is protected and relatively undeveloped. The viewpoints above the shoreline give you a wide angle on the reservoir and the Tien Shan peaks behind it. This is a half-day trip that works well even for people who are not keen on long hikes. The altitude is noticeable if you came from sea level recently, so take the first stretch slowly.",
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
      "Altyn-Emel covers over 450,000 hectares of steppe, desert, and river plain east of Almaty, and most of it sees very few visitors. The Singing Dune is the park's most well-known feature: a 150-meter sand dune that produces a low, resonant hum when the wind catches the surface at the right angle. The Aktau mountains are something else entirely, a series of ridges striped in white, red, green, and grey from mineral deposits laid down over tens of millions of years. We also spend time looking for Przewalski's horses, a breed that was extinct in the wild until a reintroduction program brought them back here in the 1990s. Accommodation is in a small guesthouse inside the park. Two days is enough to cover the main sites without feeling rushed.",
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
      "Turgen Gorge runs about 100 kilometers east of Almaty and stays green and wet through most of the summer. The trail passes through birch and spruce forest before opening up at the Bear Waterfall, which drops around 30 meters into a basin you can get close enough to feel the spray. A bit further along is Kairak Waterfall, smaller and quieter, with a natural pool that is cold enough to be refreshing in July. Lunch is cooked over an open fire at a rest point in the gorge, traditional Kazakh food that tends to be the highlight of the day for a lot of people. The whole hike is manageable for anyone in reasonable shape and takes most of the day at a relaxed pace.",
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
      "Shymbulak sits at 2,260 meters in the Zailiyskiy Alatau range, about 25 kilometers from central Almaty. The resort has runs suited to every level, from wide beginner slopes near the base to longer steeper descents higher up. On a clear day the views across the range are hard to beat. The package covers lift passes, equipment rental, and lunch at the mountain restaurant, so you do not need to organize anything separately. The season typically runs from November through April, with the best snow conditions in January and February. Group sizes are small, which makes it easier for the guide to adjust the day to everyone's ability.",
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
      "Southern Kazakhstan was one of the main corridors of the Silk Road for centuries, and the traces of that are still visible if you know where to look. The Mausoleum of Khoja Ahmed Yasawi in Turkestan is the anchor of the tour: a 14th-century structure commissioned by Timur that remains one of the best-preserved examples of Timurid architecture in Central Asia. It was listed as a UNESCO World Heritage Site in 2003. From there we visit the ruins of Otrar, a city that was a significant trading hub before its destruction in the 13th century, and spend time in Shymkent, where the old bazaar still functions as a working market. The four days include traditional meals, visits to local craftspeople, and some evenings with folk music. This is a trip for people interested in history and culture more than physical activity.",
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
      "Kaindy Lake was formed in 1911 when an earthquake triggered a landslide that dammed the valley and flooded the forest above. The spruce trees that were already growing there did not fall. They are still standing, submerged up to their trunks, with bare grey branches reaching above the surface of the water. In winter the lake freezes and divers have explored the underwater trunks. In summer the turquoise water makes the whole scene look slightly unreal. The hike in takes a couple of hours through the gorge, with several good stopping points along the way. We spend time at the lake itself before continuing into the adjacent Kaindy Gorge, which is less visited and worth the extra walk.",
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
      "Baikonur is where the Soviet space program was run from, and a lot of the infrastructure is still in use today. Yuri Gagarin launched from here in 1961. The Buran orbiter is stored here. The launch pads that sent the first satellites into orbit are still standing. The cosmodrome is a restricted site leased by Russia from Kazakhstan, which means access requires coordination and permits arranged in advance. The tour covers the main historical launch pads, the assembly buildings, and the space museum, which holds original hardware and mission artifacts. If a launch happens to be scheduled during your visit, it is possible to watch from the designated viewing area. The surrounding steppe is flat and empty in every direction, which makes the scale of the facility feel even larger than it is.",
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
      "Aksu-Zhabagly was established in 1926, making it the oldest nature reserve in Central Asia, and it has been largely left alone since. The reserve covers a significant stretch of the western Tien Shan, including deep gorges, high alpine zones, and river valleys. Over 1,400 plant species grow here, including wild Greig's tulips that carpet the lower slopes in April and May. Snow leopards live in the reserve but are rarely seen; golden eagles are more reliable. The three-day trek moves through the Aksu Canyon, which drops around 500 meters to the river, and up into the alpine pastures above the treeline. There are petroglyphs in several locations along the route, left by people who passed through these mountains long before the reserve existed. This is a physically demanding trip with significant elevation gain each day.",
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
