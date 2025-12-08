"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plane } from "lucide-react"
import { TravelMap } from "@/components/travel-map"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
}

const countries = [
    {
        name: "India",
        status: "visited",
        description: "Where it all began. Rich culture, diverse landscapes, and amazing food.",
        year: "Home",
        color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800"
    },
    {
        name: "United Kingdom",
        status: "visited",
        description: "Exploring history, castles, and the bustling city life of London.",
        year: "Visited",
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
    },
    {
        name: "Ireland",
        status: "current",
        description: "Current base. The Emerald Isle, known for its friendly people and stunning coastlines.",
        year: "Current",
        color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
    }
]

const nextDestinations = [
    {
        name: "United Arab Emirates",
        status: "next",
        description: "The next chapter. Looking forward to modern skylines and desert adventures.",
        year: "Next Stop",
        color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
    },
    {
        name: "Thailand",
        status: "next",
        description: "Tropical beaches, royal palaces, and ancient ruins awaiting exploration.",
        year: "Coming Soon",
        color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
    }
]

export default function TravelPage() {
    return (
        <div className="container py-10 md:py-20 min-h-screen">
            <div className="flex flex-col items-start gap-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 w-full"
                >
                    <div className="flex items-center gap-2 text-primary">
                        <Plane className="h-6 w-6" />
                        <span className="font-semibold tracking-wider uppercase text-sm">My Journey</span>
                    </div>
                    <h1 className="font-bold text-4xl tracking-tight lg:text-5xl">
                        Countries I&apos;ve Visited
                    </h1>
                    <p className="text-muted-foreground mb-8">Here&apos;s a map of places I&apos;ve visited. I love exploring new cultures and trying new foods!</p>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Exploring the world one country at a time. From my roots in India to my current home in Ireland, and future adventures ahead.
                    </p>

                    <div className="mt-8">
                        <TravelMap />
                    </div>
                </motion.div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {countries.map((country) => (
                    <motion.div key={country.name} variants={item}>
                        <Card className={`h-full border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${country.color.split(' ')[3] || 'border-border'}`}>
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className={`${country.color} border-0`}>
                                        {country.year}
                                    </Badge>
                                    {country.status === "current" && (
                                        <MapPin className="h-5 w-5 text-green-500 animate-bounce" />
                                    )}
                                </div>
                                <CardTitle className="text-2xl">{country.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-muted-foreground">
                                    {country.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                <motion.div variants={item} className="md:col-span-2 lg:col-span-3 mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-2 text-sm text-muted-foreground uppercase tracking-wider">
                                Up Next
                            </span>
                        </div>
                    </div>
                </motion.div>

                {nextDestinations.map((destination) => (
                    <motion.div key={destination.name} variants={item} className="w-full">
                        <Card className="h-full border-2 border-dashed border-amber-500/50 bg-amber-500/5">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">
                                        {destination.year}
                                    </Badge>
                                    <Plane className="h-5 w-5 text-amber-500" />
                                </div>
                                <CardTitle className="text-2xl">{destination.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-muted-foreground">
                                    {destination.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

            </motion.div>
        </div>
    )
}
