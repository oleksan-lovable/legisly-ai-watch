import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { BillStatusBadge } from "@/components/BillStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const allBills = [
  { number: "AB 1234", title: "California Housing Accountability Act", status: "In Committee", author: "Smith", session: "2025-2026", date: "2025-03-15" },
  { number: "SB 567", title: "Clean Energy Infrastructure Investment", status: "Introduced", author: "Jones", session: "2025-2026", date: "2025-03-14" },
  { number: "AB 890", title: "Public Education Funding Reform", status: "Passed", author: "Garcia", session: "2025-2026", date: "2025-03-13" },
  { number: "SB 234", title: "Healthcare Access Expansion Act", status: "In Committee", author: "Williams", session: "2025-2026", date: "2025-03-12" },
  { number: "AB 456", title: "Environmental Protection Standards Update", status: "Introduced", author: "Chen", session: "2025-2026", date: "2025-03-11" },
  { number: "SB 789", title: "Transportation Safety Improvement Act", status: "Failed", author: "Davis", session: "2025-2026", date: "2025-03-10" },
  { number: "AB 321", title: "Water Conservation and Management", status: "Passed", author: "Martinez", session: "2025-2026", date: "2025-03-09" },
  { number: "SB 654", title: "Digital Privacy Protection Act", status: "In Committee", author: "Lee", session: "2025-2026", date: "2025-03-08" },
  { number: "AB 987", title: "Small Business Tax Relief Act", status: "Introduced", author: "Thompson", session: "2025-2026", date: "2025-03-07" },
  { number: "SB 111", title: "Criminal Justice Reform Act", status: "Chaptered", author: "Brown", session: "2025-2026", date: "2025-03-06" },
  { number: "AB 222", title: "Wildfire Prevention and Response", status: "Enrolled", author: "Wilson", session: "2025-2026", date: "2025-03-05" },
  { number: "SB 333", title: "Affordable Childcare Access Act", status: "In Committee", author: "Taylor", session: "2025-2026", date: "2025-03-04" },
];

export default function Bills() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = allBills.filter((bill) => {
    const matchesSearch = search === "" ||
      bill.title.toLowerCase().includes(search.toLowerCase()) ||
      bill.number.toLowerCase().includes(search.toLowerCase()) ||
      bill.author.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout title="Bills" description="Browse and search California legislation">
      <div className="space-y-4">
        {/* Filters */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bills by number, title, or author..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Introduced">Introduced</SelectItem>
                  <SelectItem value="In Committee">In Committee</SelectItem>
                  <SelectItem value="Passed">Passed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Enrolled">Enrolled</SelectItem>
                  <SelectItem value="Chaptered">Chaptered</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="shrink-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {allBills.length} bills
        </p>

        {/* Bills table */}
        <Card className="glass-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-5 text-xs font-medium text-muted-foreground">Bill</th>
                    <th className="text-left py-3 px-5 text-xs font-medium text-muted-foreground">Title</th>
                    <th className="text-left py-3 px-5 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-5 text-xs font-medium text-muted-foreground">Author</th>
                    <th className="text-left py-3 px-5 text-xs font-medium text-muted-foreground">Session</th>
                    <th className="text-left py-3 px-5 text-xs font-medium text-muted-foreground">Last Action</th>
                    <th className="text-left py-3 px-5 text-xs font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((bill, i) => (
                    <tr
                      key={bill.number}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${i * 0.03}s` }}
                      onClick={() => navigate(`/bills/${encodeURIComponent(bill.number)}`)}
                    >
                      <td className="py-3 px-5 font-semibold text-primary whitespace-nowrap">{bill.number}</td>
                      <td className="py-3 px-5 text-foreground max-w-sm truncate">{bill.title}</td>
                      <td className="py-3 px-5"><BillStatusBadge status={bill.status} /></td>
                      <td className="py-3 px-5 text-muted-foreground">{bill.author}</td>
                      <td className="py-3 px-5 text-muted-foreground text-xs">{bill.session}</td>
                      <td className="py-3 px-5 text-muted-foreground">{bill.date}</td>
                      <td className="py-3 px-5">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
