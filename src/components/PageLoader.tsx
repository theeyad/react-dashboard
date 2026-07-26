import { ThreeDots } from "react-loader-spinner";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <ThreeDots
        color="var(--color-primary)"
        height="50"
        width="50"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}
