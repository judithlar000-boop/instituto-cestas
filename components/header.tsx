"use client"

import { Package } from "lucide-react"

export function Header() {
  return (
    <header className="bg-primary px-4 py-4 shadow-lg">
      <div className="flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
          <Package className="h-6 w-6 text-accent-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight text-primary-foreground">
            Instituto Cestas
          </h1>
          <p className="text-xs text-primary-foreground/80">
            Assistência Social
          </p>
        </div>
      </div>
    </header>
  )
}
