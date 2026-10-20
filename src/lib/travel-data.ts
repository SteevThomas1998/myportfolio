// Travel page "locations". Visited places are film stills; upcoming ones are storyboard sketches.
// `plate` is an image path, or a CSS class for plates that swap with the theme.

export interface Location {
    name: string
    status: "visited" | "next"
    tag: string
    place: string
    description: string
    plate: { src: string } | { className: string }
    /** Map pins for `place`: [longitude, latitude], label side defaults to right */
    pins: { label: string; coords: [number, number]; side?: "left" | "right" }[]
}

export const locations: Location[] = [
    {
        name: "India",
        status: "visited",
        tag: "Home",
        place: "Kerala backwaters",
        description: "Where it all began. Rich culture, diverse landscapes, and amazing food.",
        plate: { src: "/cinema/about/kerala.webp" },
        pins: [{ label: "Kerala", coords: [76.34, 9.5] }],
    },
    {
        name: "United Kingdom",
        status: "visited",
        tag: "Based here",
        place: "Manchester rooftops",
        description: "History, castles, and the bustling city life of London and Manchester.",
        plate: { className: "plate-hero" },
        pins: [{ label: "Manchester", coords: [-2.24, 53.48] }],
    },
    {
        name: "Ireland",
        status: "visited",
        tag: "Visited",
        place: "Cliffs of Moher",
        description: "The Emerald Isle: friendly people, stunning coastlines, and great craic.",
        plate: { src: "/cinema/travel/ireland.webp" },
        pins: [{ label: "Moher", coords: [-9.43, 52.97], side: "left" }],
    },
    {
        name: "Thailand",
        status: "visited",
        tag: "Visited",
        place: "Bangkok & Pattaya",
        description: "Tropical beaches, royal palaces, and ancient ruins. An unforgettable trip.",
        plate: { src: "/cinema/travel/thailand.webp" },
        pins: [
            { label: "Bangkok", coords: [100.5, 13.75], side: "left" },
            { label: "Pattaya", coords: [100.88, 12.93] },
        ],
    },
    {
        name: "United Arab Emirates",
        status: "next",
        tag: "Upcoming",
        place: "Dubai",
        description: "Modern skylines, desert adventures, and world-class architecture.",
        plate: { src: "/cinema/travel/storyboard-uae.webp" },
        pins: [{ label: "Dubai", coords: [55.27, 25.2] }],
    },
    {
        name: "Turkey",
        status: "visited",
        tag: "Visited",
        place: "Istanbul",
        description: "Where East meets West: mosques, bazaars, and coastal scenery.",
        plate: { src: "/cinema/travel/turkey.webp" },
        pins: [{ label: "Istanbul", coords: [28.98, 41.01] }],
    },
    {
        name: "Spain",
        status: "next",
        tag: "Upcoming",
        place: "Barcelona",
        description: "Vibrant culture, incredible food, and some of Europe's most beautiful cities.",
        plate: { src: "/cinema/travel/storyboard-spain.webp" },
        pins: [{ label: "Barcelona", coords: [2.17, 41.39] }],
    },
    {
        name: "Morocco",
        status: "next",
        tag: "Upcoming",
        place: "Marrakech",
        description: "Souks, riads and lantern-lit medinas, with the Sahara on the horizon.",
        plate: { src: "/cinema/travel/storyboard-morocco.webp" },
        pins: [{ label: "Marrakech", coords: [-7.99, 31.63], side: "left" }],
    },
]

// Used by the map and the chat bot
export const highlightedCountries = locations.map(({ name, status }) => ({ name, status }))
