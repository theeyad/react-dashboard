import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import PageNotFoundImage from "@/assets/404.svg";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col h-screen">
        <div>
          <img
            src={PageNotFoundImage}
            className="w-full h-[calc(100vh-6rem)] xs:h-[calc(100vh-3rem)]"
            alt="Page Not Found"
          />
          <div className="flex flex-col gap-3 xs:flex-row xs:gap-0 justify-between items-center mx-3">
            <Button
              className="hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
            <Link to="https://storyset.com/online" target="_blank">
              <Button className="hover:cursor-pointer">
                Online illustrations by Storyset
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
