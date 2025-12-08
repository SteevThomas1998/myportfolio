"use client"

import React from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { useTheme } from "next-themes"
import { highlightedCountries } from "@/lib/travel-data"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export function TravelMap() {
    const { theme } = useTheme()

    // Adjust default fill based on theme
    const defaultFill = theme === "dark" ? "#27272a" : "#e5e7eb" // zinc-800 : gray-200
    const strokeColor = theme === "dark" ? "#52525b" : "#d4d4d8" // zinc-600 : zinc-300

    return (
        <div className="w-full h-[300px] md:h-[500px] bg-muted/20 rounded-xl overflow-hidden border border-border">
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
                <ZoomableGroup center={[20, 20]} zoom={1.2}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryName = geo.properties.name
                                const highlight = highlightedCountries.find(c => c.name === countryName)

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={highlight ? highlight.color : defaultFill}
                                        stroke={strokeColor}
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none", transition: "all 250ms" },
                                            hover: { fill: highlight ? highlight.color : quote(theme === "dark" ? "#3f3f46" : "#d1d5db"), outline: "none" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                )
                            })
                        }
                    </Geographies>

                    {/* Markers could be added here for specific cities if needed */}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}

function quote(str: string) {
    return str
}
