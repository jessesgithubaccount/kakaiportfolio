import type { IslandRegistry } from "@tinacms/astro/experimental";
import type { QueryResult } from "@tinacms/astro/data";
import type { HomeQuery } from "../../../tina/__generated__/types";
import PageBody from "../../components/islands/PageBody.astro";
import { getHome } from "./data";

export const islands: IslandRegistry = {
  home: {
    fetch: () => getHome(),
    component: PageBody,
    wrapper: { tag: "div" },
    propsFromData: (data) => ({
      data: (data as QueryResult<HomeQuery>).data?.home,
    }),
  },
};
