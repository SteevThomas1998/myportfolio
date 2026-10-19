"use client"

import React from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { highlightedCountries } from "@/lib/travel-data"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Colours come from the cinema theme variables, so the map follows light/dark on its own
const fills = {
    visited: "rgb(var(--reel-sodium))",
    next: "rgb(var(--reel-bone) / 0.35)",
    none: "rgb(var(--reel-bone) / 0.08)",
}

export function TravelMap() {
    return (
        <div className="relative h-[300px] w-full overflow-hidden border border-reel-bone/10 bg-reel-bone/[0.03] md:h-[500px]">
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
                <ZoomableGroup center={[20, 20]} zoom={1.2}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const highlight = highlightedCountries.find((c) => c.name === geo.properties.name)
                                const fill = highlight ? fills[highlight.status as keyof typeof fills] : fills.none
                                const base = { fill, stroke: "rgb(var(--reel-ink))", strokeWidth: 0.5, outline: "none" }

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: base,
                                            hover: { ...base, fill: highlight ? fill : "rgb(var(--reel-bone) / 0.16)" },
                                            pressed: base,
                                        }}
                                    />
                                )
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <div className="absolute bottom-3 left-3 flex gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-reel-bone/60">
                <span className="flex items-center gap-2"><span className="h-2 w-2 bg-reel-sodium" />Shot</span>
                <span className="flex items-center gap-2"><span className="h-2 w-2 bg-reel-bone/35" />Storyboarded</span>
            </div>
        </div>
    )
}
