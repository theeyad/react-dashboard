import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function AnalyticsPage() {
  const documentTitle = useDocumentTitle()
  return (
    <div>
      <h1 className="text-2xl font-bold">{ documentTitle }</h1>
    </div>
  );
}
