// Travel page "locations". Visited places are film stills; upcoming ones are storyboard sketches.
// `plate` is an image path, or a CSS class for plates that swap with the theme.

export interface Location {
    name: string
    status: "visited" | "next"
    tag: string
    place: string
    description: string
    plate: { src: string } | { className: string }
}

export const locations: Location[] = [
    {
        name: "India",
        status: "visited",
        tag: "Home",
        place: "Kerala backwaters",
        description: "Where it all began. Rich culture, diverse landscapes, and amazing food.",
        plate: { src: "/cinema/about/kerala.webp" },
    },
    {
        name: "United Kingdom",
        status: "visited",
        tag: "Based here",
        place: "Manchester rooftops",
        description: "History, castles, and the bustling city life of London and Manchester.",
        plate: { className: "plate-hero" },
    },
    {
        name: "Ireland",
        status: "visited",
        tag: "Visited",
        place: "Cliffs of Moher",
        description: "The Emerald Isle: friendly people, stunning coastlines, and great craic.",
        plate: { src: "/cinema/travel/ireland.webp" },
    },
    {
        name: "Thailand",
        status: "visited",
        tag: "Visited",
        place: "Krabi",
        description: "Tropical beaches, royal palaces, and ancient ruins. An unforgettable trip.",
        plate: { src: "/cinema/travel/thailand.webp" },
    },
    {
        name: "United Arab Emirates",
        status: "next",
        tag: "Upcoming",
        place: "Dubai",
        description: "Modern skylines, desert adventures, and world-class architecture.",
        plate: { src: "/cinema/travel/storyboard-uae.webp" },
    },
    {
        name: "Turkey",
        status: "visited",
        tag: "Visited",
        place: "Cappadocia",
        description: "Where East meets West: mosques, bazaars, and coastal scenery.",
        plate: { src: "/cinema/travel/turkey.webp" },
    },
    {
        name: "Spain",
        status: "next",
        tag: "Upcoming",
        place: "Barcelona",
        description: "Vibrant culture, incredible food, and some of Europe's most beautiful cities.",
        plate: { src: "/cinema/travel/storyboard-spain.webp" },
    },
    {
        name: "Morocco",
        status: "next",
        tag: "Upcoming",
        place: "Marrakech",
        description: "Souks, riads and lantern-lit medinas, with the Sahara on the horizon.",
        plate: { src: "/cinema/travel/storyboard-morocco.webp" },
    },
]

// Used by the map and the chat bot
export const highlightedCountries = locations.map(({ name, status }) => ({ name, status }))
