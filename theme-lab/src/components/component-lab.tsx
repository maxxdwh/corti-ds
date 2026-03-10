"use client"

import * as React from "react"
import {
  Activity,
  ArrowUpRight,
  Upload,
  Users,
} from "lucide-react"
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
import { ThemeStyleLoader } from "@/components/theme-style-loader"
import { ThemeScopeProvider } from "@/components/theme-scope"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  AlertDialogMedia,
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
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
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
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
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
  return (
    <Card className={cn("overflow-hidden rounded-2xl border-border/70 bg-background shadow-none", className)}>
      {children}
    </Card>
  )
}

function ExampleWall() {
  return (
    <>
      <MasonryItem>
        <ExampleCard>
          <CardContent className="flex items-center justify-between p-4">
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
          <CardContent className="flex items-center justify-between p-4">
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
          <CardHeader className="pb-3">
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
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">corti-soap</p>
                    <Badge variant="outline">Subjective · Objective · Assessment · Plan</Badge>
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
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">corti-brief-clinical-note</p>
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
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">corti-patient-summary</p>
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
          <CardHeader className="pb-3">
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
                <DialogFooter showCloseButton>
                  <Button>Approve draft</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </ExampleCard>
      </MasonryItem>

      <MasonryItem>
        <ExampleCard>
          <CardHeader className="pb-3">
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
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <Activity className="size-7" />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Reroute this case?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The cardiology reviewer will lose ownership and the case will be reassigned immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep assigned</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">Confirm reroute</AlertDialogAction>
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
                <PopoverHeader>
                  <PopoverTitle>Case tools</PopoverTitle>
                  <PopoverDescription>Choose the fastest next step for this active review.</PopoverDescription>
                </PopoverHeader>
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

export function ComponentLab() {
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)
  const [themeFamily, setThemeFamily] = React.useState<ThemeFamily>("corti-console")
  const [mode, setMode] = React.useState<ThemeMode>("system")
  const [resolvedMode, setResolvedMode] = React.useState<"light" | "dark">("light")

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
            "min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(0,0,0,0.05),transparent_60%)] text-foreground antialiased dark:bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(255,255,255,0.06),transparent_60%)]",
            themeFamily === "corti-classic" &&
              "bg-none dark:bg-none",
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
                  <SidebarGroupContent className="px-2">
                    <ThemeSwitcher
                      themeFamily={themeFamily}
                      mode={mode}
                      onThemeFamilyChange={onThemeFamilyChange}
                      onModeChange={onModeChange}
                    />
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter className="border-t border-sidebar-border/70">
                <p className="px-2 text-xs text-muted-foreground">
                  Base shadcn/ui primitives + Corti theme tokens.
                </p>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <div className="w-full p-4 sm:p-6">
                <div className="mb-4 md:hidden">
                  <SidebarTrigger />
                </div>

                <div
                  className={cn(
                    "mx-auto border border-border/70 bg-secondary/45 p-4 transition-all sm:p-5",
                    themeFamily === "corti-classic"
                      ? "rounded-none bg-card p-3 shadow-[inset_1px_1px_0_var(--classic-highlight),inset_-1px_-1px_0_var(--classic-shadow-deep),inset_2px_2px_0_color-mix(in_srgb,var(--classic-face)_84%,var(--classic-highlight)),inset_-2px_-2px_0_var(--classic-shadow)]"
                      : "rounded-[28px]"
                  )}
                >
                  <div className="mx-auto max-w-[1180px] columns-1 gap-4 md:columns-2 xl:columns-3">
                    <ExampleWall />
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </main>
      </ThemeScopeProvider>
    </>
  )
}
