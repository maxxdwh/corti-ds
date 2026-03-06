"use client"

import * as React from "react"
import Link from "next/link"
import { toast as sonnerToast } from "sonner"
import { Expand, Monitor, Smartphone, Tablet } from "lucide-react"
import {
  MODE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  ThemeFamily,
  ThemeMode,
  ThemeSwitcher,
  isThemeFamily,
  isThemeMode,
  resolveMode,
} from "@/components/theme-switcher"
import { ThemeScopeProvider } from "@/components/theme-scope"
import { ThemeStyleLoader } from "@/components/theme-style-loader"
import names from "@/data/shadcn-components.json"
import codeExamples from "@/data/shadcn-doc-examples.json"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toaster as ToastToaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"

type ViewMode = "preview" | "code"
type DeviceSize = "full" | "desktop" | "tablet" | "mobile"

const DEVICE_WIDTH: Record<DeviceSize, string> = {
  full: "100%",
  desktop: "1280px",
  tablet: "820px",
  mobile: "390px",
}

function toTitle(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function PreviewByName({ name }: { name: string }) {
  const { toast: appToast } = useToast()
  const form = useForm<{ username: string }>({ defaultValues: { username: "" } })

  switch (name) {
    case "accordion":
      return (
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
            <AccordionContent>A collection of reusable components.</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    case "alert":
      return (
        <Alert className="max-w-md">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>This is an alert example.</AlertDescription>
        </Alert>
      )
    case "alert-dialog":
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Open alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    case "aspect-ratio":
      return (
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9}>
            <div className="flex h-full items-center justify-center rounded-md bg-muted text-sm">
              16:9 Preview
            </div>
          </AspectRatio>
        </div>
      )
    case "avatar":
      return <Avatar><AvatarFallback>MW</AvatarFallback></Avatar>
    case "badge":
      return <Badge>Default</Badge>
    case "breadcrumb":
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link href="#">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Library</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    case "button-group":
      return (
        <ButtonGroup>
          <Button>Left</Button>
          <ButtonGroupText>or</ButtonGroupText>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      )
    case "button":
      return <Button>Default</Button>
    case "calendar":
      return (
        <Calendar
          mode="single"
          selected={new Date("2026-03-06T00:00:00Z")}
          className="rounded-md border"
        />
      )
    case "card":
      return (
        <Card className="max-w-md">
          <CardHeader><CardTitle>Card title</CardTitle><CardDescription>Card description</CardDescription></CardHeader>
          <CardContent>Card content</CardContent>
          <CardFooter><Button size="sm">Save</Button></CardFooter>
        </Card>
      )
    case "carousel":
      return (
        <Carousel className="w-full max-w-md">
          <CarouselContent>
            <CarouselItem><div className="rounded-md border p-6 text-center">Slide 1</div></CarouselItem>
            <CarouselItem><div className="rounded-md border p-6 text-center">Slide 2</div></CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )
    case "chart":
      return (
        <ChartContainer
          config={{ value: { label: "Value", color: "hsl(var(--chart-1))" } }}
          className="h-[180px] w-full max-w-md"
        >
          <BarChart data={[{ month: "Jan", value: 120 }, { month: "Feb", value: 90 }, { month: "Mar", value: 150 }]}>
            <XAxis dataKey="month" />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
          </BarChart>
        </ChartContainer>
      )
    case "checkbox":
      return <div className="flex items-center gap-2"><Checkbox id="terms" /><Label htmlFor="terms">Accept terms</Label></div>
    case "collapsible":
      return (
        <Collapsible>
          <CollapsibleTrigger asChild><Button variant="outline">Toggle</Button></CollapsibleTrigger>
          <CollapsibleContent className="mt-2 text-sm">Hidden details</CollapsibleContent>
        </Collapsible>
      )
    case "command":
      return (
        <Command className="max-w-md rounded-lg border">
          <CommandInput placeholder="Search commands..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )
    case "context-menu":
      return (
        <ContextMenu>
          <ContextMenuTrigger className="rounded-md border px-4 py-2">Right click me</ContextMenuTrigger>
          <ContextMenuContent><ContextMenuItem>Open</ContextMenuItem></ContextMenuContent>
        </ContextMenu>
      )
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Update your profile information.</DialogDescription></DialogHeader>
          </DialogContent>
        </Dialog>
      )
    case "drawer":
      return (
        <Drawer>
          <DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger>
          <DrawerContent>
            <DrawerHeader><DrawerTitle>Drawer</DrawerTitle><DrawerDescription>Slide-up content.</DrawerDescription></DrawerHeader>
            <DrawerFooter><Button>Done</Button></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )
    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline">Menu</Button></DropdownMenuTrigger>
          <DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
      )
    case "empty":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No results</EmptyTitle>
            <EmptyDescription>Try adjusting your filters.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm">Reset</Button></EmptyContent>
        </Empty>
      )
    case "field":
      return (
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" placeholder="you@example.com" />
          <FieldDescription>We will never share your email.</FieldDescription>
        </Field>
      )
    case "form":
      return (
        <Form {...form}>
          <form className="w-full max-w-md space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="button" size="sm">Submit</Button>
          </form>
        </Form>
      )
    case "hover-card":
      return (
        <HoverCard>
          <HoverCardTrigger asChild><Button variant="link">Hover me</Button></HoverCardTrigger>
          <HoverCardContent>Hover card content.</HoverCardContent>
        </HoverCard>
      )
    case "input":
      return <Input className="max-w-md" placeholder="Enter text" />
    case "input-group":
      return (
        <InputGroup className="max-w-md">
          <InputGroupAddon>https://</InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
      )
    case "input-otp":
      return (
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
    case "item":
      return (
        <Item className="max-w-md">
          <ItemContent>
            <ItemTitle>Project Alpha</ItemTitle>
            <ItemDescription>Updated 2 minutes ago</ItemDescription>
          </ItemContent>
        </Item>
      )
    case "kbd":
      return <KbdGroup><Kbd>Cmd</Kbd><Kbd>K</Kbd></KbdGroup>
    case "label":
      return <Label htmlFor="demo">This is a label</Label>
    case "menubar":
      return (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent><MenubarItem>New</MenubarItem></MenubarContent>
          </MenubarMenu>
        </Menubar>
      )
    case "navigation-menu":
      return (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem><NavigationMenuLink href="#">Docs</NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )
    case "pagination":
      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      )
    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>
      )
    case "progress":
      return <Progress value={66} className="w-72" />
    case "radio-group":
      return (
        <RadioGroup defaultValue="a" className="space-y-2">
          <div className="flex items-center gap-2"><RadioGroupItem value="a" id="a" /><Label htmlFor="a">Option A</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="b" id="b" /><Label htmlFor="b">Option B</Label></div>
        </RadioGroup>
      )
    case "resizable":
      return (
        <ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-md border">
          <ResizablePanel defaultSize={50}><div className="p-4 text-sm">Left</div></ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}><div className="p-4 text-sm">Right</div></ResizablePanel>
        </ResizablePanelGroup>
      )
    case "scroll-area":
      return (
        <ScrollArea className="h-24 w-64 rounded-md border p-2">
          <div className="space-y-2 text-sm">
            <p>Item 1</p><p>Item 2</p><p>Item 3</p><p>Item 4</p><p>Item 5</p>
          </div>
        </ScrollArea>
      )
    case "select":
      return (
        <Select defaultValue="prod">
          <SelectTrigger className="w-64"><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent><SelectItem value="dev">Dev</SelectItem><SelectItem value="prod">Prod</SelectItem></SelectContent>
        </Select>
      )
    case "separator":
      return <div className="w-full max-w-md"><p>Profile</p><Separator className="my-2" /><p className="text-sm">Public settings</p></div>
    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
          <SheetContent>Sheet content</SheetContent>
        </Sheet>
      )
    case "sidebar":
      return (
        <div className="h-56 w-full max-w-xl overflow-hidden rounded-md border">
          <SidebarProvider defaultOpen>
            <Sidebar>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Dashboard</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Settings</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="p-3">
                <SidebarTrigger className="mb-2" />
                <p className="text-sm">Sidebar content area</p>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      )
    case "skeleton":
      return <div className="space-y-2 w-72"><Skeleton className="h-4 w-40" /><Skeleton className="h-4 w-full" /></div>
    case "slider":
      return <Slider defaultValue={[42]} max={100} className="w-72" />
    case "sonner":
      return (
        <div className="space-y-3">
          <Button onClick={() => sonnerToast("Sonner toast")}>Show sonner toast</Button>
          <SonnerToaster />
        </div>
      )
    case "spinner":
      return <Spinner />
    case "switch":
      return <div className="flex items-center gap-2"><Switch id="airplane" /><Label htmlFor="airplane">Airplane mode</Label></div>
    case "table":
      return (
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody><TableRow><TableCell>Alpha</TableCell><TableCell>Active</TableCell></TableRow></TableBody>
        </Table>
      )
    case "tabs":
      return (
        <Tabs defaultValue="a" className="max-w-md">
          <TabsList><TabsTrigger value="a">Account</TabsTrigger><TabsTrigger value="s">Security</TabsTrigger></TabsList>
          <TabsContent value="a" className="rounded-md border p-3 text-sm">Account content</TabsContent>
          <TabsContent value="s" className="rounded-md border p-3 text-sm">Security content</TabsContent>
        </Tabs>
      )
    case "textarea":
      return <Textarea className="max-w-md" placeholder="Type your message" />
    case "toast":
      return (
        <div className="space-y-3">
          <Button onClick={() => appToast({ title: "Toast", description: "Toast preview" })}>Show toast</Button>
          <ToastToaster />
        </div>
      )
    case "toggle":
      return <Toggle aria-label="Toggle italic">Italic</Toggle>
    case "toggle-group":
      return (
        <ToggleGroup type="single" defaultValue="bold">
          <ToggleGroupItem value="bold" aria-label="Bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">Italic</ToggleGroupItem>
        </ToggleGroup>
      )
    case "tooltip":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    default:
      return <div className="rounded-md border p-4 text-sm text-muted-foreground">Preview unavailable.</div>
  }
}

function ComponentCard({
  component,
  deviceSize,
  themeFamily,
  resolvedMode,
}: {
  component: string
  deviceSize: DeviceSize
  themeFamily: ThemeFamily
  resolvedMode: "light" | "dark"
}) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("preview")
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)
  const code = codeExamples[component as keyof typeof codeExamples] ?? "// Official example not found."
  const scopedTheme =
    themeFamily === "shadcn" ? undefined : `${themeFamily}-${resolvedMode}`

  return (
    <section className="rounded-2xl border border-border/70 bg-background/70 p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="mr-auto text-base font-semibold tracking-tight">{toTitle(component)}</h2>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "preview" ? (
        <div
          ref={setPortalContainer}
          data-theme={scopedTheme}
        >
          <ThemeScopeProvider container={portalContainer}>
            <div
              className="mx-auto rounded-xl border border-border/70 bg-background p-4 transition-all sm:p-5"
              style={{ width: DEVICE_WIDTH[deviceSize], maxWidth: "100%" }}
            >
              <PreviewByName name={component} />
            </div>
          </ThemeScopeProvider>
        </div>
      ) : (
        <pre className="overflow-x-auto rounded-xl border border-border/70 bg-muted/50 p-5 font-mono text-xs leading-relaxed text-foreground"><code>{code}</code></pre>
      )}
    </section>
  )
}

export function ComponentLab() {
  const [deviceSize, setDeviceSize] = React.useState<DeviceSize>("full")
  const [themeFamily, setThemeFamily] = React.useState<ThemeFamily>("shadcn")
  const [mode, setMode] = React.useState<ThemeMode>("system")
  const [resolvedMode, setResolvedMode] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const storedThemeFamily = window.localStorage.getItem(THEME_STORAGE_KEY) ?? ""
    const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY) ?? ""

    const nextThemeFamily = isThemeFamily(storedThemeFamily)
      ? storedThemeFamily
      : "shadcn"
    const nextMode = isThemeMode(storedMode) ? storedMode : "system"
    const nextResolvedMode = resolveMode(nextMode)

    setThemeFamily(nextThemeFamily)
    setMode(nextMode)
    setResolvedMode(nextResolvedMode)
  }, [])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const onSystemThemeChange = () => {
      if (mode === "system") {
        setResolvedMode(resolveMode("system"))
      }
    }

    mediaQuery.addEventListener("change", onSystemThemeChange)
    return () => mediaQuery.removeEventListener("change", onSystemThemeChange)
  }, [mode])

  function onThemeFamilyChange(nextThemeFamily: ThemeFamily) {
    setThemeFamily(nextThemeFamily)
    window.localStorage.setItem(THEME_STORAGE_KEY, nextThemeFamily)
  }

  function onModeChange(nextMode: ThemeMode) {
    setMode(nextMode)
    setResolvedMode(resolveMode(nextMode))
    window.localStorage.setItem(MODE_STORAGE_KEY, nextMode)
  }

  return (
    <>
      <ThemeStyleLoader />
      <main className={cn("min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(0,0,0,0.05),transparent_60%)] text-foreground antialiased dark:bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(255,255,255,0.06),transparent_60%)]", resolvedMode === "dark" && "dark")}>
        <div className="mx-auto w-full max-w-6xl p-4 sm:p-6">
          <header className="sticky top-4 z-20 mb-8 rounded-2xl border border-border/70 bg-background/90 px-5 py-4 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="mr-auto text-xl font-semibold tracking-tight sm:text-2xl">corti-ds theme lab</h1>
              <ThemeSwitcher
                themeFamily={themeFamily}
                mode={mode}
                onThemeFamilyChange={onThemeFamilyChange}
                onModeChange={onModeChange}
              />
              <Tabs value={deviceSize} onValueChange={(value) => setDeviceSize(value as DeviceSize)}>
                <TabsList>
                  <TabsTrigger value="full" title="Full width" aria-label="Full width"><Expand className="size-4" /></TabsTrigger>
                  <TabsTrigger value="desktop" title="Desktop" aria-label="Desktop viewport"><Monitor className="size-4" /></TabsTrigger>
                  <TabsTrigger value="tablet" title="Tablet" aria-label="Tablet viewport"><Tablet className="size-4" /></TabsTrigger>
                  <TabsTrigger value="mobile" title="Mobile" aria-label="Mobile viewport"><Smartphone className="size-4" /></TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </header>

          <div className="grid gap-5">
            {names.filter((name) => name !== "sidebar").map((name) => (
              <ComponentCard
                key={name}
                component={name}
                deviceSize={deviceSize}
                themeFamily={themeFamily}
                resolvedMode={resolvedMode}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
