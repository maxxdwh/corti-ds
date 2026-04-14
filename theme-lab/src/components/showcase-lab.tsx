"use client"

import * as React from "react"
import Link from "next/link"
import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  LayoutDashboard,
  Settings,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  MODE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  ThemeFamily,
  ThemeMode,
  ThemeFamilySidebarNav,
  ThemeModeTabs,
  isThemeFamily,
  isThemeMode,
  resolveMode,
} from "@/components/theme-switcher"
import { ThemeStyleLoader } from "@/components/theme-style-loader"
import { ThemeScopeProvider } from "@/components/theme-scope"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// ── Data ──────────────────────────────────────────────────────────────────────

const weeklyData = [
  { day: "Mon", encounters: 980, drafted: 712 },
  { day: "Tue", encounters: 1140, drafted: 863 },
  { day: "Wed", encounters: 1084, drafted: 798 },
  { day: "Thu", encounters: 1320, drafted: 1011 },
  { day: "Fri", encounters: 1218, drafted: 932 },
  { day: "Sat", encounters: 740, drafted: 541 },
  { day: "Sun", encounters: 620, drafted: 448 },
]

const chartConfig = {
  encounters: { label: "Encounters", color: "var(--primary)" },
  drafted: { label: "AI Drafted", color: "var(--muted-foreground)" },
}

const recentEncounters = [
  { id: "EH-2051", patient: "J. Andersen", type: "Cardiac", status: "Reviewed", draft: true, ago: "2m" },
  { id: "EH-2050", patient: "M. Sørensen", type: "Stroke", status: "Escalated", draft: true, ago: "5m" },
  { id: "EH-2049", patient: "P. Larsen", type: "Respiratory", status: "In review", draft: true, ago: "9m" },
  { id: "EH-2048", patient: "H. Nielsen", type: "Behavioral", status: "Pending", draft: false, ago: "14m" },
  { id: "EH-2047", patient: "A. Jensen", type: "Trauma", status: "Reviewed", draft: true, ago: "18m" },
  { id: "EH-2046", patient: "L. Christensen", type: "Pediatric", status: "Reviewed", draft: true, ago: "22m" },
  { id: "EH-2045", patient: "K. Møller", type: "Sepsis", status: "Escalated", draft: true, ago: "31m" },
  { id: "EH-2044", patient: "S. Poulsen", type: "Cardiac", status: "Pending", draft: false, ago: "38m" },
]

const statusVariant: Record<string, "secondary" | "outline" | "destructive"> = {
  Reviewed: "secondary",
  "In review": "outline",
  Pending: "outline",
  Escalated: "destructive",
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/showcase", active: true },
  { label: "Encounters", icon: HeartPulse, href: "#" },
  { label: "AI Drafts", icon: Bot, href: "#" },
  { label: "Analytics", icon: BarChart3, href: "#" },
  { label: "QA Queue", icon: ClipboardList, href: "#" },
  { label: "Lab Results", icon: FlaskConical, href: "#" },
  { label: "Clinicians", icon: Stethoscope, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  delta,
  up,
  icon: Icon,
}: {
  label: string
  value: string
  delta: string
  up: boolean
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {up ? (
            <TrendingUp className="size-3 text-primary" />
          ) : (
            <TrendingDown className="size-3 text-destructive" />
          )}
          <span className={up ? "text-primary" : "text-destructive"}>{delta}</span>
          <span>vs. yesterday</span>
        </p>
      </CardContent>
    </Card>
  )
}

// ── ShowcaseLab ───────────────────────────────────────────────────────────────

export function ShowcaseLab() {
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)
  const [themeFamily, setThemeFamily] = React.useState<ThemeFamily>("corti-console")
  const [mode, setMode] = React.useState<ThemeMode>("system")
  const [resolvedMode, setResolvedMode] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const storedThemeFamily = window.localStorage.getItem(THEME_STORAGE_KEY) ?? ""
    const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY) ?? ""
    const nextThemeFamily = isThemeFamily(storedThemeFamily) ? storedThemeFamily : "corti-console"
    const nextMode = isThemeMode(storedMode) ? storedMode : "system"
    setThemeFamily(nextThemeFamily)
    setMode(nextMode)
    setResolvedMode(resolveMode(nextMode))
  }, [])

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => { if (mode === "system") setResolvedMode(resolveMode("system")) }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [mode])

  function onThemeFamilyChange(next: ThemeFamily) {
    setThemeFamily(next)
    window.localStorage.setItem(THEME_STORAGE_KEY, next)
  }

  function onModeChange(next: ThemeMode) {
    setMode(next)
    setResolvedMode(resolveMode(next))
    window.localStorage.setItem(MODE_STORAGE_KEY, next)
  }

  const scopedTheme =
    themeFamily === "corti-console" ? undefined : `${themeFamily}-${resolvedMode}`

  return (
    <>
      <ThemeStyleLoader />
      <ThemeScopeProvider container={portalContainer}>
        <div
          ref={setPortalContainer}
          data-theme={scopedTheme}
          data-theme-family={themeFamily}
          className={cn(
            "h-screen overflow-hidden text-foreground antialiased",
            themeFamily === "corti-classic"
              ? "bg-none"
              : resolvedMode === "dark"
                ? "bg-background"
                : "bg-background",
            resolvedMode === "dark" && "dark"
          )}
        >
          <SidebarProvider defaultOpen className="h-full">
            {/* ── Sidebar ── */}
            <Sidebar collapsible="offcanvas">
              <SidebarHeader className="h-12 flex-row items-center border-b border-sidebar-border/70 p-0">
                <div className="flex items-center gap-2 px-4">
                  <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Activity className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none">Corti</p>
                    <p className="text-xs text-muted-foreground">Theme Lab</p>
                  </div>
                </div>
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {navItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton asChild isActive={item.active}>
                            <a href={item.href}>
                              <item.icon className="size-4" />
                              <span>{item.label}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                  <SidebarGroupLabel>Pages</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href="/">
                            <Activity className="size-4" />
                            <span>Component Gallery</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                          <Link href="/showcase">
                            <LayoutDashboard className="size-4" />
                            <span>Dashboard Showcase</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                  <SidebarGroupLabel>Themes</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <ThemeFamilySidebarNav
                      themeFamily={themeFamily}
                      onThemeFamilyChange={onThemeFamilyChange}
                    />
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter className="border-t border-sidebar-border/70">
                <div className="flex items-center gap-3 px-2 py-1.5">
                  <Avatar className="size-8">
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">Dr. Sofie Andersen</p>
                    <p className="truncate text-xs text-muted-foreground">Capital Region</p>
                  </div>
                </div>
                <ThemeModeTabs mode={mode} onModeChange={onModeChange} />
              </SidebarFooter>
            </Sidebar>

            {/* ── Main ── */}
            <SidebarInset className="overflow-y-auto">
              {/* Header */}
              <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b border-border/70 bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                        Theme Lab
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="size-3.5" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Bell className="mr-2 size-3.5" />
                    Alerts
                    <Badge variant="destructive" className="ml-1.5 px-1 py-0 text-[10px]">3</Badge>
                  </Button>
                  <Button size="sm">Export</Button>
                </div>
              </header>

              {/* Page content */}
              <div className="flex flex-col gap-6 p-6">
                {/* Page title */}
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    Today's encounter activity across all dispatch and telehealth units.
                  </p>
                </div>

                {/* Stats cards */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <StatCard
                    label="Total Encounters"
                    value="1,284"
                    delta="+8.2%"
                    up={true}
                    icon={HeartPulse}
                  />
                  <StatCard
                    label="AI Drafts Generated"
                    value="847"
                    delta="+12.4%"
                    up={true}
                    icon={Bot}
                  />
                  <StatCard
                    label="Avg. Review Time"
                    value="4m 12s"
                    delta="-0m 24s"
                    up={true}
                    icon={Activity}
                  />
                  <StatCard
                    label="High-Acuity Rate"
                    value="16%"
                    delta="+2.1%"
                    up={false}
                    icon={Users}
                  />
                </div>

                {/* Chart + breakdown */}
                <div className="grid gap-4 lg:grid-cols-7">
                  {/* Area chart */}
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Weekly Encounter Volume</CardTitle>
                      <CardDescription>Encounters processed and AI-drafted this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[220px] w-full">
                        <AreaChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="fillEncounters" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.18} />
                              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="fillDrafted" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.12} />
                              <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                          <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="encounters"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fill="url(#fillEncounters)"
                            dot={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="drafted"
                            stroke="var(--muted-foreground)"
                            strokeWidth={1.5}
                            strokeDasharray="4 2"
                            fill="url(#fillDrafted)"
                            dot={false}
                          />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Bar chart: encounter types */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>By Encounter Type</CardTitle>
                      <CardDescription>Distribution across call categories today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{ count: { label: "Calls", color: "var(--primary)" } }}
                        className="h-[220px] w-full"
                      >
                        <BarChart
                          data={[
                            { type: "Cardiac", count: 312 },
                            { type: "Resp.", count: 241 },
                            { type: "Stroke", count: 187 },
                            { type: "Trauma", count: 154 },
                            { type: "Behav.", count: 143 },
                            { type: "Other", count: 247 },
                          ]}
                          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                          <XAxis
                            dataKey="type"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar
                            dataKey="count"
                            fill="var(--primary)"
                            radius={[4, 4, 0, 0]}
                            fillOpacity={0.85}
                          />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent encounters table */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Encounters</CardTitle>
                      <CardDescription>Last 8 encounters across all units</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">View all</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-6">ID</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>AI Draft</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="pr-6 text-right">Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentEncounters.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell className="pl-6 font-mono text-xs text-muted-foreground">
                              {row.id}
                            </TableCell>
                            <TableCell className="font-medium">{row.patient}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{row.type}</TableCell>
                            <TableCell>
                              {row.draft ? (
                                <Badge variant="secondary" className="gap-1 text-xs">
                                  <Bot className="size-3" />
                                  Ready
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs text-muted-foreground">
                                  Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={statusVariant[row.status] ?? "outline"} className="text-xs">
                                {row.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="pr-6 text-right text-sm text-muted-foreground">
                              {row.ago} ago
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </ThemeScopeProvider>
    </>
  )
}
