import { Badge } from "@/components/ui/badge";

const statusStyles: Record<string, string> = {
  "Introduced": "bg-info/15 text-info border-info/20",
  "In Committee": "bg-warning/15 text-warning border-warning/20",
  "Passed": "bg-success/15 text-success border-success/20",
  "Failed": "bg-destructive/15 text-destructive border-destructive/20",
  "Enrolled": "bg-primary/15 text-primary border-primary/20",
  "Chaptered": "bg-success/15 text-success border-success/20",
};

export function BillStatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] || "bg-muted text-muted-foreground border-border";
  return (
    <Badge variant="outline" className={`text-[11px] font-medium ${style}`}>
      {status}
    </Badge>
  );
}
