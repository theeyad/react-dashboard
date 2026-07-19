import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive({
  alertTitle,
  alertDesc,
  className,
}: {
  alertTitle: string;
  alertDesc: string;
  className?: string;
}) {
  return (
    <Alert variant="destructive" className={`max-w-md ${className}`}>
      <AlertCircleIcon />
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription>{alertDesc}</AlertDescription>
    </Alert>
  );
}
