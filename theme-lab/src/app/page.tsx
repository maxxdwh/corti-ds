"use client"

import dynamic from "next/dynamic"

const ComponentLab = dynamic(
  () => import("@/components/component-lab").then((mod) => mod.ComponentLab),
  { ssr: false }
)

export default function Home() {
  return <ComponentLab />
}
