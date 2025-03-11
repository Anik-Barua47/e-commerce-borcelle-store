import Link from "next/link";
import Collections from "../../../components/Collections";
import { ChevronRight } from "lucide-react";
const Collection = () => {
  return (
    <div className="my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="text-sm text-muted-foreground">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                href="/collections"
                className="hover:text-foreground transition-colors"
              >
                Collections
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <Collections />
    </div>
  );
};

export default Collection;
