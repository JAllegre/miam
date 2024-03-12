"use client";

// import Link from "next/link";
import { ChangeEvent, useCallback, useContext } from "react";
// import { IoSearch } from "react-icons/io5";

//import { usePathname, useRouter } from "next/navigation";
import { SearchContext } from "../contexts/SearchContext";
import { Input } from "./ui/input";

// import { Paths } from "../lib/constants";

export default function Navbar() {
  const { searchText, setSearchText } = useContext(SearchContext);
  // const path = usePathname();
  // const router = useRouter();

  const handleChangeSearchText = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchText(evt.target.value);
      // if (path !== Paths.Recipes) {
      //   router.push(Paths.Recipes);
      // }
    },
    [setSearchText]
  );

  return (
    <nav className="fixed px-3 md:max-w-2xl m-auto top-0 left-0 right-0 p-1 h-[--nav-height] z-10 flex items-center justify-between bg-white shadow-[0_4px_6px_-4px_gray]">
      <div className="flex items-center justify-start">
        <div className="text-2xl border-initial border-1 border-solid rounded-full p-0 shadow-1px_1px_3px_#b9b9b9">
          {/* <Link href="/">
            <PiForkKnifeBold />
          </Link> */}
        </div>
        <div>
          <div className="font-bold text-2xl pl-1">miam miam</div>
        </div>
      </div>

      <div>
        <Input
          id="search"
          type="search"
          // icon={IoSearch}
          placeholder="Rechercher une recette"
          value={searchText}
          onChange={handleChangeSearchText}
        />
      </div>
    </nav>
  );
}
