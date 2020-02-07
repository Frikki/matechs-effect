import { effect as T } from "@matechs/effect";
import { sequenceS } from "fp-ts/lib/Apply";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import Link from "next/link";
import { App } from "../src/app";
import { MemoInput } from "./MemoInput";
import { ShowDate } from "./ShowDate";
import { UpdateDate } from "./UpdateDate";
import { UpdateOrganisations } from "./UpdateOrganisations";

// alpha
/* istanbul ignore file */

export const Home = App.ui.of(
  pipe(
    sequenceS(T.effect)({
      UpdateDate,
      UpdateOrganisations,
      ShowDate,
      MemoInput
    }),
    T.map(({ UpdateDate, ShowDate, UpdateOrganisations, MemoInput }) =>
      App.withState(({ state: { orgs, error } }) => (
        <>
          <ShowDate />
          <UpdateDate />
          <UpdateOrganisations />
          {pipe(
            orgs,
            O.map(orgs => <div>{orgs}</div>),
            O.toNullable
          )}
          {pipe(
            error,
            O.map(error => <div>{error}</div>),
            O.toNullable
          )}
          <MemoInput />
          <Link href={"/foo"}>
            <a>foo</a>
          </Link>
        </>
      ))
    )
  )
);
