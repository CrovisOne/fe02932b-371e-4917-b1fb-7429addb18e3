import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ChangeEvent, ForwardedRef, forwardRef } from "react";

interface SearchMoleculeProps {
  handleSearchClick: () => void;
  search: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchMolecule = forwardRef<HTMLInputElement, SearchMoleculeProps>(
  (
    { handleSearchClick, search },
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    return (
      <div className="flex max-w-lg items-center gap-2">
        <Button variant={"ghost"} size={"icon"} onClick={handleSearchClick}>
          <SearchIcon />
        </Button>
        <Input
          ref={ref}
          type="search"
          placeholder="Search..."
          onChange={search}
        />
      </div>
    );
  },
);
