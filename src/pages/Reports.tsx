import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Clock, Calendar, BarChart3, TrendingUp } from "lucide-react";

const reports = [
  {
    title: "Weekly Legislative Summary",
    description: "Overview of all bills introduced, amended, and acted upon this week",
    type: "Weekly",
    generated: "2025-03-15",
    format: "PDF",
    size: "2.4 MB",
  },
  {
    title: "Committee Hearing Report",
    description: "Summary of upcoming and recent committee hearings with bill analysis",
    type: "Weekly",
    generated: "2025-03-14",
    format: "PDF",
    size: "1.8 MB",
  },
  {
    title: "Housing Policy Tracker",
    description: "All housing-related legislation with status updates and impact analysis",
    type: "Topic",
    generated: "2025-03-12",
    format: "PDF",
    size: "3.1 MB",
  },
  {
    title: "Monthly Activity Digest",
    description: "Comprehensive monthly overview of legislative activity and trends",
    type: "Monthly",
    generated: "2025-03-01",
    format: "PDF",
    size: "5.6 MB",
  },
  {
    title: "Author Productivity Report",
    description: "Analysis of bill introductions and success rates by legislator",
    type: "Analytics",
    generated: "2025-02-28",
    format: "PDF",
    size: "1.2 MB",
  },
];

const typeColors: Record<string, string> = {
  Weekly: "bg-info/15 text-info border-info/20",
  Monthly: "bg-primary/15 text-primary border-primary/20",
  Topic: "bg-warning/15 text-warning border-warning/20",
  Analytics: "bg-success/15 text-success border-success/20",
};

export default function Reports() {
  return (
    <AppLayout title="Reports" description="Generate and download legislative reports">
      <div className="space-y-6">
        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass-card hover:shadow-md transition-shadow cursor-pointer group animate-fade-in">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-lg bg-info/10 flex items-center justify-center group-hover:bg-info/20 transition-colors">
                <FileText className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Weekly Summary</p>
                <p className="text-xs text-muted-foreground">Generate now</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card hover:shadow-md transition-shadow cursor-pointer group animate-fade-in" style={{ animationDelay: "0.05s" }}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-lg bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                <BarChart3 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Analytics Report</p>
                <p className="text-xs text-muted-foreground">Generate now</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card hover:shadow-md transition-shadow cursor-pointer group animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-lg bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
                <TrendingUp className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Custom Report</p>
                <p className="text-xs text-muted-foreground">Build from scratch</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report history */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Generated Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {reports.map((report, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 px-6 hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${0.2 + i * 0.04}s` }}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{report.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <Badge variant="outline" className={`text-[10px] ${typeColors[report.type]}`}>{report.type}</Badge>
                    <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {report.generated}
                    </div>
                    <span className="hidden lg:inline text-xs text-muted-foreground">{report.size}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
