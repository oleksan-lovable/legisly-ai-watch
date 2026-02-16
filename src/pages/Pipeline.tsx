import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Database,
  FileSearch,
  CheckCircle2,
  AlertCircle,
  Play,
  RefreshCw,
  Clock,
} from "lucide-react";

const pipelineSteps = [
  {
    title: "Data Download",
    description: "Fetch bill data from CA legislature",
    icon: Download,
    status: "complete" as const,
    details: "pubinfo_daily_Mon.zip — 87.3 MB downloaded",
    time: "2m 14s",
  },
  {
    title: "Data Parsing",
    description: "Parse XML/SQL data files",
    icon: FileSearch,
    status: "complete" as const,
    details: "1,342 bills parsed from 5 tables",
    time: "45s",
  },
  {
    title: "Database Storage",
    description: "Store bills in PostgreSQL",
    icon: Database,
    status: "complete" as const,
    details: "1,342 records inserted, 0 errors",
    time: "12s",
  },
];

const statusIcon = {
  complete: <CheckCircle2 className="h-4 w-4 text-success" />,
  running: <RefreshCw className="h-4 w-4 text-info animate-spin" />,
  error: <AlertCircle className="h-4 w-4 text-destructive" />,
  pending: <Clock className="h-4 w-4 text-muted-foreground" />,
};

const recentRuns = [
  { date: "2025-03-15 08:00", status: "complete", bills: 1342, duration: "3m 11s" },
  { date: "2025-03-14 08:00", status: "complete", bills: 1298, duration: "3m 05s" },
  { date: "2025-03-13 08:00", status: "error", bills: 0, duration: "1m 22s" },
  { date: "2025-03-12 08:00", status: "complete", bills: 1256, duration: "2m 58s" },
  { date: "2025-03-11 08:00", status: "complete", bills: 1231, duration: "3m 01s" },
];

export default function Pipeline() {
  return (
    <AppLayout title="Data Pipeline" description="Download and process California bill data">
      <div className="space-y-6">
        {/* Run pipeline */}
        <Card className="glass-card animate-fade-in border-l-4 border-l-accent">
          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Run Pipeline</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Download latest data from <span className="font-mono text-xs">downloads.leginfo.legislature.ca.gov</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" /> Daily Update
              </Button>
              <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                <Play className="h-3.5 w-3.5" /> Full Sync
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pipelineSteps.map((step, i) => (
            <Card key={i} className="glass-card animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  {statusIcon[step.status]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-foreground/70">{step.details}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {step.time}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent runs */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Recent Runs</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Bills Processed</th>
                  <th className="text-left py-2.5 px-5 text-xs font-medium text-muted-foreground">Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentRuns.map((run, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-5 text-muted-foreground font-mono text-xs">{run.date}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-1.5">
                        {statusIcon[run.status as keyof typeof statusIcon]}
                        <span className="text-xs capitalize">{run.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 font-medium text-foreground">{run.bills.toLocaleString()}</td>
                    <td className="py-3 px-5 text-muted-foreground">{run.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
