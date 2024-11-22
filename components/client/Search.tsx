import { SearchIcon } from "lucide-react";
import { Label } from "../ui/label";

export const Search = () => {
  return (
    <article className="w-full">
      <form action="" />

      <fieldset className="flex flex-row flex-wrap rounded border border-slate-200 p-1 xs:flex-nowrap">
        <Label className="flex flex-1 origin-center flex-row items-center">
          <SearchIcon className="mx-2 text-slate-500" />
          <input
            placeholder="Search our store"
            type="text"
            className="w-full appearance-none bg-transparent py-2 text-sm font-light placeholder:text-sm focus:outline-none focus:ring-0"
          />
        </Label>
      </fieldset>
    </article>
  );
};
