import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { BillStatusBadge } from "@/components/BillStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User, FileText, Clock, BookOpen } from "lucide-react";

const billData: Record<string, any> = {
  "AB 1234": {
    number: "AB 1234",
    title: "California Housing Accountability Act",
    status: "In Committee",
    author: "Smith",
    coauthors: ["Johnson", "Rivera"],
    session: "2025-2026",
    introduced: "2025-01-15",
    lastAction: "2025-03-15",
    committee: "Housing and Community Development",
    summary: "This bill would amend the Housing Accountability Act to strengthen protections for housing development projects. It establishes new requirements for local agencies when considering applications for housing development projects, including provisions for streamlined review processes and enhanced accountability measures.",
    history: [
      { date: "2025-03-15", action: "Referred to Committee on Housing and Community Development" },
      { date: "2025-02-20", action: "Read first time. To print." },
      { date: "2025-01-15", action: "Introduced by Assembly Member Smith" },
    ],
    text: "SECTION 1. Section 65589.5 of the Government Code is amended to read:\n\n65589.5. (a) The Legislature finds and declares all of the following:\n\n(1) The lack of housing, including emergency shelters, is a critical problem that threatens the economic, environmental, and social quality of life in California.\n\n(2) California housing has become the most expensive in the nation. The excessive cost of the state's housing supply is partially caused by activities and policies of many local governments that limit the approval of housing...",
  },
};

export default function BillDetail() {
  const { billNumber } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(billNumber || "");
  const bill = billData[decoded] || billData["AB 1234"];

  return (
    <AppLayout title={bill.number} description={bill.title}>
      <div className="space-y-4 max-w-4xl">
        <Button variant="ghost" size="sm" onClick={() => navigate("/bills")} className="text-muted-foreground gap-1.5 -ml-2">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Bills
        </Button>

        {/* Header Card */}
        <Card className="glass-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold font-serif text-foreground">{bill.number}</h1>
                  <BillStatusBadge status={bill.status} />
                </div>
                <p className="text-base text-foreground/80">{bill.title}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Export PDF
                </Button>
                <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                  <BookOpen className="h-3.5 w-3.5" /> Track Bill
                </Button>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1"><User className="h-3 w-3" /> Author</p>
                <p className="font-medium text-foreground">{bill.author}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Introduced</p>
                <p className="font-medium text-foreground">{bill.introduced}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Last Action</p>
                <p className="font-medium text-foreground">{bill.lastAction}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Session</p>
                <p className="font-medium text-foreground">{bill.session}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">{bill.summary}</p>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Action History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bill.history.map((item: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-accent" : "bg-border"}`} />
                    {i < bill.history.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                    <p className="text-sm text-foreground mt-0.5">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bill Text */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Bill Text</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-foreground/70 whitespace-pre-wrap font-sans leading-relaxed bg-muted/50 rounded-lg p-4">
              {bill.text}
            </pre>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
