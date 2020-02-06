import { effect as T } from "@matechs/effect";
import { sequenceS } from "fp-ts/lib/Apply";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import Link from "next/link";
import { App } from "../src/app";
import { ShowDate } from "./ShowDate";
import { UpdateDate } from "./UpdateDate";

// alpha
/* istanbul ignore file */

export const Foo = App.ui(() =>
  pipe(
    sequenceS(T.effect)({
      UpdateDate,
      ShowDate
    }),
    T.map(({ UpdateDate, ShowDate }) =>
      App.withState(({ state: { orgs } }) => (
        <>
          <ShowDate />
          <UpdateDate />
          {pipe(
            orgs,
            O.map(orgs => <div>{orgs}</div>),
            O.toNullable
          )}
          <Link href={"/"}>
            <a>home</a>
          </Link>
        </>
      ))
    )
  )
);
