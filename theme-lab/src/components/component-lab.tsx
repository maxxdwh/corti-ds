"use client"

import * as React from "react"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Bot,
  ClipboardList,
  FileText,
  FlaskConical,
  HeartPulse,
  LayoutDashboard,
  MessageSquare,
  Pill,
  ShieldAlert,
  Stethoscope,
  Upload,
  Users,
} from "lucide-react"
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
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
import { cn } from "@/lib/utils"

function MasonryItem({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto mb-4 w-full max-w-[23.8125rem] break-inside-avoid">{children}</div>
}

function ExampleCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Card className={className}>{children}</Card>
}

function ExampleWall() {
  return (
    <>
      <MasonryItem>
        <ExampleCard>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Active calls</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">128</p>
            </div>
            <Badge variant="secondary">+9% this hour</Badge>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">High-acuity rate</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">18%</p>
            </div>
            <Badge variant="outline">Within target</Badge>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Live Escalation Queue</CardTitle>
            <CardDescription>Calls requiring clinician attention in under 5 minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: "EH-2041", unit: "Capital Region", risk: "Chest pain", eta: "01:12" },
              { id: "EH-2045", unit: "North Dispatch", risk: "Shortness of breath", eta: "02:08" },
              { id: "EH-2050", unit: "Remote Care", risk: "Stroke indicators", eta: "03:44" },
            ].map((item) => (
              <div key={item.id} className="rounded-lg border border-border/70 bg-secondary/35 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{item.id}</p>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                  </div>
                  <Badge variant="outline">{item.eta}</Badge>
                </div>
                <p className="text-sm">{item.risk}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full">Open Queue</Button>
          </CardFooter>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Pipeline Progress</CardTitle>
            <CardDescription>Classic-theme progress bars and throughput states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Transcription", value: 84 },
              { label: "Clinical QA", value: 58 },
              { label: "EHR export", value: 33 },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} />
              </div>
            ))}
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Documentation Studio</CardTitle>
            <CardDescription>Generate multiple documents from the same interaction using standard Corti templates</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="soap">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="soap">SOAP</TabsTrigger>
                <TabsTrigger value="brief">Brief</TabsTrigger>
                <TabsTrigger value="patient">Summary</TabsTrigger>
              </TabsList>
              <TabsContent value="soap" className="space-y-3 pt-3">
                <div className="rounded-lg border border-border/70 bg-secondary/30 p-3">
                  <div className="mb-2 flex items-start gap-2">
                    <p className="min-w-0 text-sm font-medium">corti-soap</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Classic SOAP note for ambient generation across most medical visits.
                  </p>
                </div>
                <Textarea
                  readOnly
                  value={"S: Sudden confusion and slurred speech noted by spouse.\nO: FAST positive, unilateral weakness, onset 14 minutes ago.\nA: High suspicion for acute stroke.\nP: Immediate ambulance dispatch and stroke alert activation."}
                />
              </TabsContent>
              <TabsContent value="brief" className="space-y-3 pt-3">
                <div className="rounded-lg border border-border/70 bg-secondary/30 p-3">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <p className="min-w-0 text-sm font-medium">corti-brief-clinical-note</p>
                    <Badge variant="outline">1 paragraph</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Compact summary for quick review and handoff.
                  </p>
                </div>
                <Textarea
                  readOnly
                  value={"Caller with acute neurologic symptoms including slurred speech and one-sided weakness was identified as FAST positive and routed for immediate emergency response."}
                />
              </TabsContent>
              <TabsContent value="patient" className="space-y-3 pt-3">
                <div className="rounded-lg border border-border/70 bg-secondary/30 p-3">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <p className="min-w-0 text-sm font-medium">corti-patient-summary</p>
                    <Badge variant="outline">Plain language</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Visit summary written for non-medical readers.
                  </p>
                </div>
                <Textarea
                  readOnly
                  value={"You described symptoms that can happen during a stroke. Because timing matters, emergency help was sent right away so you can be evaluated quickly."}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Suggested Follow-up</CardTitle>
            <CardDescription>AI next steps after review completion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { title: "Notify cardiology nurse", meta: "Recommended in the next 5 min" },
              { title: "Push summary to EHR", meta: "Draft and audio transcript ready" },
              { title: "Schedule 24h callback", meta: "Follow-up reminder not yet created" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border/70 bg-secondary/35 px-3 py-2.5">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>
              </div>
            ))}
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Workflow Console</CardTitle>
            <CardDescription>Switch between triage, quality review, and handoff views</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="triage">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="triage">Triage</TabsTrigger>
                <TabsTrigger value="qa">QA</TabsTrigger>
                <TabsTrigger value="handoff">Handoff</TabsTrigger>
              </TabsList>
              <TabsContent value="triage" className="space-y-3 pt-3">
                <div className="rounded-lg border border-border/70 bg-secondary/35 p-3">
                  <p className="text-sm font-medium">Active escalation rules</p>
                  <p className="mt-1 text-sm text-muted-foreground">Stroke, sepsis, overdose, and pediatric respiratory distress.</p>
                </div>
                <Button className="w-full">Open triage board</Button>
              </TabsContent>
              <TabsContent value="qa" className="space-y-3 pt-3">
                <div className="rounded-lg border border-border/70 bg-secondary/35 p-3">
                  <p className="text-sm font-medium">Audits pending</p>
                  <p className="mt-1 text-sm text-muted-foreground">18 calls flagged for language quality and disposition consistency.</p>
                </div>
                <Button variant="outline" className="w-full">Review flagged calls</Button>
              </TabsContent>
              <TabsContent value="handoff" className="space-y-3 pt-3">
                <div className="rounded-lg border border-border/70 bg-secondary/35 p-3">
                  <p className="text-sm font-medium">Night shift brief</p>
                  <p className="mt-1 text-sm text-muted-foreground">Two unresolved pediatric cases and one cardiology callback remain open.</p>
                </div>
                <Button variant="outline" className="w-full">Share handoff</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Playbooks</CardTitle>
            <CardDescription>Compact knowledge access for common critical events</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="stroke">
              <AccordionItem value="stroke">
                <AccordionTrigger>Stroke pathway</AccordionTrigger>
                <AccordionContent>
                  Confirm FAST symptoms, capture onset time, and dispatch immediately when positive.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sepsis">
                <AccordionTrigger>Sepsis escalation</AccordionTrigger>
                <AccordionContent>
                  Listen for fever, altered mental state, rapid breathing, and immune-compromised status.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="behavioral">
                <AccordionTrigger>Behavioral health risk</AccordionTrigger>
                <AccordionContent>
                  Keep the caller engaged, verify immediate danger, and warm-transfer when self-harm risk is credible.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Care Team Onboarding</CardTitle>
            <CardDescription>Grant access to AI review workflows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { email: "elin@hospital.dk", role: "Clinical lead" },
              { email: "mikael@ems.se", role: "Reviewer" },
            ].map((member) => (
              <div key={member.email} className="rounded-lg border border-border/70 bg-secondary/25 p-3">
                <p className="text-sm font-medium">{member.email}</p>
                <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
              </div>
            ))}
            <div className="space-y-2">
              <Label>Add clinician</Label>
              <Input placeholder="name@healthsystem.org" />
            </div>
            <div className="space-y-2">
              <Label>Shared invite link</Label>
              <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-secondary/25 px-3 py-2">
                <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                  https://corti.app/invite/acute-review
                </p>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  Copy
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">+ Add clinician</Button>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Send Access Invites</Button>
          </CardFooter>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Draft Note Dialog</CardTitle>
            <CardDescription>Exercise the dialog treatment on a form-heavy flow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border/70 bg-secondary/35 p-3">
              <p className="text-sm font-medium">Prepared for clinician review</p>
              <p className="mt-1 text-sm text-muted-foreground">Includes transcript highlights, summary draft, and recommended disposition.</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Open draft editor</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Encounter summary draft</DialogTitle>
                  <DialogDescription>Review, edit, and approve the note before sending it to the EHR.</DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="dialog-patient">Patient label</FieldLabel>
                    <FieldContent>
                      <Input id="dialog-patient" defaultValue="EH-2050 / suspected stroke" />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="dialog-priority">Priority</FieldLabel>
                    <FieldContent>
                      <Select defaultValue="immediate">
                        <SelectTrigger id="dialog-priority">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate dispatch</SelectItem>
                          <SelectItem value="urgent">Urgent callback</SelectItem>
                          <SelectItem value="routine">Routine follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="dialog-note">Clinical note</FieldLabel>
                    <FieldContent>
                      <Textarea
                        id="dialog-note"
                        defaultValue="Caller reports slurred speech and unilateral weakness beginning 14 minutes ago. AI pathway marked FAST positive and recommends immediate ambulance dispatch."
                      />
                    </FieldContent>
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <Button>Approve draft</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Language Mix</CardTitle>
            <CardDescription>Incoming call distribution today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Danish", value: 62 },
              { label: "Swedish", value: 21 },
              { label: "English", value: 11 },
              { label: "Norwegian", value: 6 },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Case Redirect Alert</CardTitle>
            <CardDescription>Use alert dialog for irreversible routing decisions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border/70 bg-secondary/35 p-3">
              <p className="text-sm font-medium">Cardiology review unavailable</p>
              <p className="mt-1 text-sm text-muted-foreground">Reroute this live review to the emergency clinician queue if you want immediate coverage.</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">Reroute case</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <Activity className="size-7" />
                    </div>
                  </div>
                  <AlertDialogTitle>Reroute this case?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The cardiology reviewer will lose ownership and the case will be reassigned immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep assigned</AlertDialogCancel>
                  <AlertDialogAction className={cn(buttonVariants({ variant: "destructive" }))}>
                    Confirm reroute
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Recording Intake</CardTitle>
            <CardDescription>Upload files for transcription and QA analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Empty className="border-border/80 bg-secondary/30 p-6 md:p-8">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Upload className="size-5" />
                </EmptyMedia>
                <EmptyTitle>Drop call recordings</EmptyTitle>
                <EmptyDescription>
                  WAV, MP3, MP4 and EHR exports up to 2GB.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm">Select files</Button>
              </EmptyContent>
            </Empty>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-border/70 bg-secondary/25 p-3">
                <p className="text-xs text-muted-foreground">Queued</p>
                <p className="mt-1 text-lg font-semibold">42</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-secondary/25 p-3">
                <p className="text-xs text-muted-foreground">Processing</p>
                <p className="mt-1 text-lg font-semibold">8</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-secondary/25 p-3">
                <p className="text-xs text-muted-foreground">Failed</p>
                <p className="mt-1 text-lg font-semibold">1</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">
              Open pipeline <ArrowUpRight className="ml-1 size-3.5" />
            </Button>
          </CardFooter>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Quick Actions Popover</CardTitle>
            <CardDescription>Test compact overlays inside the themed portal container</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Escalation shortcuts</p>
              <p className="mt-1 text-sm text-muted-foreground">Create tasks, assign reviewers, and message a supervisor.</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open tools</Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="text-sm font-medium">Case tools</p>
                  <p className="text-sm text-muted-foreground">
                    Choose the fastest next step for this active review.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">Assign neurologist</Button>
                  <Button variant="outline" className="w-full">Create callback task</Button>
                  <Button variant="ghost" className="w-full justify-start">Message supervisor</Button>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Clinician Profile</CardTitle>
            <CardDescription>Default reviewer settings for high-acuity calls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-secondary/25 p-3">
              <Avatar className="size-10">
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Dr. Sofie Andersen</p>
                <p className="text-xs text-muted-foreground">Primary escalation reviewer</p>
              </div>
            </div>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="profile-reviewer">Reviewer</FieldLabel>
                <FieldContent>
                  <Input id="profile-reviewer" defaultValue="Dr. Sofie Andersen" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="profile-specialty">Specialty</FieldLabel>
                <FieldContent>
                  <Select defaultValue="emergency-medicine">
                    <SelectTrigger id="profile-specialty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency-medicine">Emergency medicine</SelectItem>
                      <SelectItem value="nursing-supervision">Nursing supervision</SelectItem>
                      <SelectItem value="behavioral-health">Behavioral health</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>
            </FieldGroup>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border/70 bg-secondary/25 p-3">
                <p className="text-xs text-muted-foreground">Avg. review time</p>
                <p className="mt-1 text-lg font-semibold">4m 18s</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-secondary/25 p-3">
                <p className="text-xs text-muted-foreground">Accepted drafts</p>
                <p className="mt-1 text-lg font-semibold">92%</p>
              </div>
            </div>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Shift Handoff Sheet</CardTitle>
            <CardDescription>Exercise slide-in panels and sticky footer actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border/70 bg-secondary/35 p-3">
              <p className="text-sm font-medium">3 unresolved items</p>
              <p className="mt-1 text-sm text-muted-foreground">A concise handoff is ready for the incoming overnight clinician.</p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">Open handoff sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Night handoff</SheetTitle>
                  <SheetDescription>Summary of the remaining high-priority items for the next reviewer.</SheetDescription>
                </SheetHeader>
                <div className="space-y-3 px-4">
                  {[
                    "EH-2045 awaiting neurologist callback",
                    "Two pediatric respiratory calls need final QA sign-off",
                    "One ambulance transcript failed upload and must be reprocessed",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border border-border/70 bg-secondary/35 p-3 text-sm">
                      {item}
                    </div>
                  ))}
                </div>
                <SheetFooter>
                  <Button>Send handoff</Button>
                  <Button variant="outline">Export brief</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Shift Activity</CardTitle>
            <CardDescription>Recent AI-assisted actions across dispatch and telehealth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { initials: "EA", text: "Escalated suspected sepsis call to duty clinician", time: "2m" },
              { initials: "MK", text: "Approved AI draft for pediatric triage note", time: "12m" },
              { initials: "LN", text: "Uploaded 18 recordings for overnight QA", time: "25m" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 rounded-md border border-border/70 bg-secondary/35 p-2.5">
                <Avatar className="size-8">
                  <AvatarFallback>{item.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time} ago</p>
                </div>
              </div>
            ))}
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Regional Coverage</CardTitle>
            <CardDescription>Speech pipeline availability by market</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Market</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Latency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Denmark</TableCell>
                  <TableCell><Badge variant="secondary">Healthy</Badge></TableCell>
                  <TableCell className="text-right">142 ms</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sweden</TableCell>
                  <TableCell><Badge variant="secondary">Healthy</Badge></TableCell>
                  <TableCell className="text-right">156 ms</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>UK</TableCell>
                  <TableCell><Badge variant="outline">Warning</Badge></TableCell>
                  <TableCell className="text-right">238 ms</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-between">
            <Badge variant="secondary">99.94% uptime</Badge>
            <Button variant="outline" size="sm">Status page</Button>
          </CardFooter>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Alert Routing</CardTitle>
            <CardDescription>Choose which clinical events trigger immediate review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Cardiac warning phrases",
              "Behavioral health risk flags",
              "Medication mismatch alerts",
            ].map((label) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-border/70 bg-secondary/35 p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="size-4 text-muted-foreground" />
                  <span>{label}</span>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader>
            <CardTitle>Review Circle</CardTitle>
            <CardDescription>Clinicians assigned to high-risk call calibration this week</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mx-auto mb-4 flex w-fit -space-x-2">
              <Avatar>
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback><Users className="size-4" /></AvatarFallback>
              </Avatar>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              6 clinicians scheduled for this week&apos;s high-risk review session.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Button>Open Calibration</Button>
              <Button variant="outline">View roster</Button>
            </div>
          </CardContent>
        </ExampleCard>
      </MasonryItem>
    </>
  )
}

type EhrPatient = {
  id: string
  name: string
  age: number
  sex: string
  room: string
  mrn: string
  acuity: "high" | "moderate"
  allergies: string
  diagnosis: string
}

const EHR_PATIENTS: EhrPatient[] = [
  {
    id: "pt-40291",
    name: "Elin Jensen",
    age: 67,
    sex: "F",
    room: "ICU-04",
    mrn: "40291",
    acuity: "high",
    allergies: "Penicillin, shellfish",
    diagnosis: "Acute CHF exacerbation",
  },
  {
    id: "pt-40311",
    name: "Mikael Lund",
    age: 52,
    sex: "M",
    room: "ED-12",
    mrn: "40311",
    acuity: "moderate",
    allergies: "NKDA",
    diagnosis: "Rule out TIA",
  },
  {
    id: "pt-40322",
    name: "Sofia Berg",
    age: 34,
    sex: "F",
    room: "OBS-03",
    mrn: "40322",
    acuity: "moderate",
    allergies: "Latex",
    diagnosis: "Post-op pain management",
  },
]

function buildAiReply(input: string) {
  const normalized = input.toLowerCase()

  if (normalized.includes("note") || normalized.includes("summary")) {
    return "Draft recommendation: include symptom onset timestamp, oxygen trend over the last 6 hours, and explicit disposition criteria before sign-off."
  }

  if (normalized.includes("sepsis") || normalized.includes("lactate")) {
    return "Sepsis watch: lactate is mildly elevated and MAP dipped below 65 once. Consider repeating lactate in 2 hours and continue fluid responsiveness checks."
  }

  if (normalized.includes("med") || normalized.includes("dose")) {
    return "Medication safety check: no hard contraindications detected, but verify ACE inhibitor timing against most recent creatinine and potassium results."
  }

  return "I can help with note drafting, trend interpretation, and handoff prep. Ask me for a problem-oriented update, meds safety pass, or discharge-readiness checklist."
}

function EhrWorkspace() {
  const [patientId, setPatientId] = React.useState(EHR_PATIENTS[0].id)
  const [noteText, setNoteText] = React.useState(
    "Subjective: Patient reports improved dyspnea at rest, persistent orthopnea overnight.\nObjective: O2 requirement decreased from 4L to 2L NC, bibasilar crackles remain, net -1.2L over 24h.\nAssessment: Improving acute CHF exacerbation with persistent volume overload.\nPlan: Continue IV diuresis, trend BMP q12h, and reassess for step-down transfer this evening."
  )
  const [chatInput, setChatInput] = React.useState("")
  const [aiMessages, setAiMessages] = React.useState<
    Array<{ id: number; role: "ai" | "user"; text: string }>
  >([
    {
      id: 1,
      role: "ai",
      text: "Hi team, I reviewed the chart. I can draft a focused progress note, propose orders, or generate handoff bullets.",
    },
    {
      id: 2,
      role: "user",
      text: "Give me a concise overnight handoff.",
    },
    {
      id: 3,
      role: "ai",
      text: "Overnight handoff: no pressor use, oxygen weaned, one transient MAP drop, diuresis effective, labs stable except mild lactate elevation.",
    },
  ])
  const [autoOrders, setAutoOrders] = React.useState(true)
  const [drugSafety, setDrugSafety] = React.useState(true)
  const [handoffAssist, setHandoffAssist] = React.useState(true)

  const patient = EHR_PATIENTS.find((item) => item.id === patientId) ?? EHR_PATIENTS[0]

  function sendAiMessage() {
    const trimmed = chatInput.trim()
    if (!trimmed) {
      return
    }

    const messageId = Date.now()
    setAiMessages((current) => [
      ...current,
      { id: messageId, role: "user", text: trimmed },
      { id: messageId + 1, role: "ai", text: buildAiReply(trimmed) },
    ])
    setChatInput("")
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-12rem)] max-w-[1320px] min-h-0 flex-col space-y-3">
      <Card>
        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Demo EHR Workspace</Badge>
              <Badge variant={patient.acuity === "high" ? "destructive" : "outline"}>
                {patient.acuity === "high" ? "High Acuity" : "Moderate Acuity"}
              </Badge>
              <Badge variant="outline">MRN {patient.mrn}</Badge>
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">{patient.name}</p>
              <p className="text-sm text-muted-foreground">
                {patient.age}y {patient.sex} • {patient.room} • {patient.diagnosis}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Allergies: {patient.allergies}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-80">
            <div className="space-y-2">
              <Label htmlFor="ehr-patient">Patient</Label>
              <Select value={patientId} onValueChange={setPatientId}>
                <SelectTrigger id="ehr-patient">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EHR_PATIENTS.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} ({item.room})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button className="flex-1">Sign Note</Button>
              <Button variant="outline" className="flex-1">Prep Handoff</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[minmax(0,2.1fr)_minmax(320px,1fr)]">
        <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Heart Rate", value: "92 bpm", trend: "+4 in 2h", icon: HeartPulse },
              { label: "SpO2", value: "95%", trend: "2L NC", icon: Activity },
              { label: "MAP", value: "71", trend: "Stable", icon: ShieldAlert },
              { label: "Urine Output", value: "1.7L", trend: "24h", icon: ClipboardList },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-lg font-semibold">{stat.value}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{stat.trend}</p>
                    </div>
                    <stat.icon className="size-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="chart" className="flex h-full min-h-0 w-full flex-col">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1 lg:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chart">Clinical Note</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="meds">Meds</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="h-full min-h-0 space-y-3 overflow-y-auto pt-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Problem List</CardTitle>
                  <CardDescription>Active issues with status and ownership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    ["Acute CHF exacerbation", "Improving", "Cardiology"],
                    ["Hypoxemia on exertion", "Monitoring", "Respiratory"],
                    ["AKI risk during diuresis", "Watch", "Hospitalist"],
                    ["Discharge planning barrier", "Pending PT eval", "Case Mgmt"],
                  ].map(([problem, status, owner]) => (
                    <div
                      key={problem}
                      className="flex flex-wrap items-center justify-between gap-2 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{problem}</p>
                        <p className="text-xs text-muted-foreground">Owner: {owner}</p>
                      </div>
                      <Badge variant="outline">{status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart" className="h-full min-h-0 space-y-3 overflow-y-auto pt-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Progress Note</CardTitle>
                  <CardDescription>SOAP-style documentation with AI-assisted quick actions</CardDescription>
                </CardHeader>
                <CardContent className="flex h-full min-h-0 flex-col gap-3">
                  <Textarea
                    value={noteText}
                    onChange={(event) => setNoteText(event.target.value)}
                    className="min-h-52"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setNoteText((current) => `${current}\n- Added overnight summary and disposition criteria.`)
                      }
                    >
                      Insert overnight summary
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setNoteText((current) => `${current}\n- Added medication reconciliation confirmation.`)
                      }
                    >
                      Add med rec line
                    </Button>
                    <Button size="sm">Save Draft</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="h-full min-h-0 space-y-3 overflow-y-auto pt-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Order Queue</CardTitle>
                  <CardDescription>Pending, signed, and suggested actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">ETA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["BMP q12h", "Routine", "Signed", "06:00"],
                        ["IV Furosemide 40mg", "High", "Due now", "Now"],
                        ["Portable CXR", "Routine", "In progress", "19:10"],
                        ["PT mobility eval", "Routine", "Requested", "20:30"],
                        ["Lactate repeat", "High", "Suggested by AI", "21:00"],
                      ].map(([order, priority, status, eta]) => (
                        <TableRow key={order}>
                          <TableCell>{order}</TableCell>
                          <TableCell>
                            <Badge variant={priority === "High" ? "destructive" : "outline"}>
                              {priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{status}</TableCell>
                          <TableCell className="text-right">{eta}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="h-full min-h-0 space-y-3 overflow-y-auto pt-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Results</CardTitle>
                  <CardDescription>Key labs and trend flags</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test</TableHead>
                        <TableHead>Current</TableHead>
                        <TableHead>Previous</TableHead>
                        <TableHead>Flag</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["Lactate", "2.6 mmol/L", "2.2 mmol/L", "High"],
                        ["Creatinine", "1.3 mg/dL", "1.2 mg/dL", "Watch"],
                        ["BNP", "880 pg/mL", "940 pg/mL", "Improving"],
                        ["WBC", "10.4 x10^9/L", "11.1 x10^9/L", "Normal"],
                        ["Potassium", "4.2 mmol/L", "4.0 mmol/L", "Normal"],
                      ].map(([test, current, previous, flag]) => (
                        <TableRow key={test}>
                          <TableCell>{test}</TableCell>
                          <TableCell>{current}</TableCell>
                          <TableCell>{previous}</TableCell>
                          <TableCell>
                            <Badge
                              variant={flag === "High" ? "destructive" : flag === "Watch" ? "outline" : "secondary"}
                            >
                              {flag}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meds" className="h-full min-h-0 space-y-3 overflow-y-auto pt-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Medication Administration</CardTitle>
                  <CardDescription>Current regimen and hold parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Furosemide IV 40mg q12h", detail: "Next: 20:00", active: true },
                    { name: "Lisinopril 10mg daily", detail: "Next: 08:00", active: true },
                    { name: "Metoprolol 25mg BID", detail: "Hold if HR < 55", active: true },
                    { name: "PRN Morphine 2mg", detail: "Last given 15:11", active: false },
                  ].map(({ name, detail, active }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{detail}</p>
                      </div>
                      <Switch defaultChecked={active} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="h-full min-h-0 space-y-3 overflow-y-auto pt-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Encounter Timeline</CardTitle>
                  <CardDescription>Chronological clinical events for the last 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    ["07:14", "ED to ICU transfer completed", "Nursing"],
                    ["08:02", "Initial AI note generated from transcript", "Corti AI"],
                    ["10:35", "Cardiology consult signed", "Cardiology"],
                    ["12:21", "Diuretic dose adjusted after fluid balance review", "Hospitalist"],
                    ["16:48", "Family update documented in chart", "Resident"],
                    ["18:06", "Handoff prep requested", "Charge RN"],
                  ].map(([time, event, source]) => (
                    <div key={`${time}-${event}`} className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{event}</p>
                        <Badge variant="outline">{time}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{source}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto pr-1">
          <Card className="flex min-h-[20rem] flex-1 flex-col">
            <CardHeader className="min-w-0">
              <CardTitle className="flex min-w-0 items-center gap-2">
                <Bot className="size-4" />
                AI Clinical Copilot
              </CardTitle>
              <CardDescription className="leading-snug">
                Simulated side-chat for decision support and note drafting
              </CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col gap-3">
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-1">
                {aiMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "px-3 py-2 text-sm",
                      message.role === "ai"
                        ? "bg-muted/50"
                        : "ml-6 border-primary/40 bg-primary/10"
                    )}
                  >
                    <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {message.role === "ai" ? "AI" : "You"}
                    </p>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Ask for a summary, recommendation, or draft..."
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      sendAiMessage()
                    }
                  }}
                />
                <Button className="w-full" onClick={sendAiMessage}>
                  <MessageSquare className="mr-2 size-4" />
                  Send to AI
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Assist Controls</CardTitle>
              <CardDescription>Interactive toggles for automation behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-start gap-2">
                  <ClipboardList className="mt-0.5 size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Auto-suggest orders</p>
                    <p className="text-xs text-muted-foreground">Suggest order sets from labs and vitals</p>
                  </div>
                </div>
                <Switch checked={autoOrders} onCheckedChange={setAutoOrders} />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-start gap-2">
                  <Pill className="mt-0.5 size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Medication safety pass</p>
                    <p className="text-xs text-muted-foreground">Flag interactions and renal dosing concerns</p>
                  </div>
                </div>
                <Switch checked={drugSafety} onCheckedChange={setDrugSafety} />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-start gap-2">
                  <FileText className="mt-0.5 size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Handoff assistant</p>
                    <p className="text-xs text-muted-foreground">Generate shift-ready bullet handoffs</p>
                  </div>
                </div>
                <Switch checked={handoffAssist} onCheckedChange={setHandoffAssist} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Context Tabs</CardTitle>
              <CardDescription>Side intelligence panels for the active encounter</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="team">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="docs">Docs</TabsTrigger>
                </TabsList>
                <TabsContent value="team" className="space-y-2 pt-3">
                  {[
                    "Attending: Dr. Karen Madsen",
                    "Resident: Dr. Jonas Holm",
                    "Charge RN: Sara Nilsson",
                  ].map((line) => (
                    <div key={line} className="px-3 py-2 text-sm">
                      {line}
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="alerts" className="space-y-2 pt-3">
                  {[
                    "Fluid balance threshold exceeded",
                    "Mild lactate rise requires repeat check",
                    "Discharge summary missing PT recommendation",
                  ].map((line) => (
                    <div key={line} className="px-3 py-2 text-sm">
                      {line}
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="docs" className="space-y-2 pt-3">
                  {[
                    "Admission H&P - signed",
                    "Cardiology consult - signed",
                    "Nursing shift note - pending cosign",
                  ].map((line) => (
                    <div key={line} className="px-3 py-2 text-sm">
                      {line}
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground">Pending Labs</p>
                <p className="mt-1 text-lg font-semibold">3</p>
                <FlaskConical className="mt-2 size-4 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground">Consults Open</p>
                <p className="mt-1 text-lg font-semibold">2</p>
                <Stethoscope className="mt-2 size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ComponentLab() {
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)
  const [themeFamily, setThemeFamily] = React.useState<ThemeFamily>("corti-console")
  const [mode, setMode] = React.useState<ThemeMode>("system")
  const [resolvedMode, setResolvedMode] = React.useState<"light" | "dark">("light")
  const [activeView, setActiveView] = React.useState<"gallery" | "ehr">("gallery")

  React.useEffect(() => {
    const storedThemeFamily = window.localStorage.getItem(THEME_STORAGE_KEY) ?? ""
    const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY) ?? ""

    const nextThemeFamily = isThemeFamily(storedThemeFamily)
      ? storedThemeFamily
      : "corti-console"
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

  const scopedTheme =
    themeFamily === "corti-console" ? undefined : `${themeFamily}-${resolvedMode}`

  return (
    <>
      <ThemeStyleLoader />
      <ThemeScopeProvider container={portalContainer}>
        <main
          ref={setPortalContainer}
          data-theme={scopedTheme}
          data-theme-family={themeFamily}
          className={cn(
            "min-h-screen text-foreground antialiased",
            themeFamily === "corti-classic"
              ? "bg-none"
              : resolvedMode === "dark"
                ? "bg-background bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(255,255,255,0.06),transparent_60%)]"
                : "bg-background bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(0,0,0,0.05),transparent_60%)]",
            themeFamily === "corti-classic" &&
              "bg-none",
            resolvedMode === "dark" && "dark"
          )}
        >
          <SidebarProvider defaultOpen>
            <Sidebar collapsible="offcanvas">
              <SidebarHeader className="border-b border-sidebar-border/70">
                <div className="px-2 py-1.5">
                  <h1 className="text-lg font-semibold tracking-tight">Theme Lab</h1>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Pages</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                          <Link href="/">
                            <Activity className="size-4" />
                            <span>Component Gallery</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
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
                <ThemeModeTabs mode={mode} onModeChange={onModeChange} />
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <div className="min-w-0 p-4 sm:p-6">
                <div className="mb-4 md:hidden">
                  <SidebarTrigger />
                </div>

                <div
                  className={cn(
                    "mx-auto min-w-0 border border-border/70 bg-secondary/45 p-4 transition-all sm:p-5",
                    themeFamily === "corti-classic"
                      ? "rounded-none bg-card p-3 shadow-[inset_1px_1px_0_var(--classic-highlight),inset_-1px_-1px_0_var(--classic-shadow-deep),inset_2px_2px_0_color-mix(in_srgb,var(--classic-face)_84%,var(--classic-highlight)),inset_-2px_-2px_0_var(--classic-shadow)]"
                      : "rounded-[28px]"
                  )}
                >
                  <div className="mx-auto mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">UI Sandbox</p>
                      <p className="text-xs text-muted-foreground">
                        Switch between the component wall and a dense fake EHR workspace.
                      </p>
                    </div>
                    <Tabs
                      value={activeView}
                      onValueChange={(value) => setActiveView(value as "gallery" | "ehr")}
                      className="w-full max-w-sm"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="gallery">Component Gallery</TabsTrigger>
                        <TabsTrigger value="ehr">EHR Workspace</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {activeView === "gallery" ? (
                    <div className="mx-auto max-w-[1180px] columns-1 gap-4 md:columns-2 xl:columns-3">
                      <ExampleWall />
                    </div>
                  ) : (
                    <EhrWorkspace />
                  )}
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </main>
      </ThemeScopeProvider>
    </>
  )
}
