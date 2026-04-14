"use client"

import dynamic from "next/dynamic"

const ShowcaseLab = dynamic(
  () => import("@/components/showcase-lab").then((mod) => mod.ShowcaseLab),
  { ssr: false }
)

export default function ShowcasePage() {
  return <ShowcaseLab />
}
