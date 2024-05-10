"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Navbar from "@/app/component/Navbar";
import { useState } from "react";
import { Domain } from "@/app/component/Domain";
import Todo from "@/app/component/Todo";
import Task from "./component/Task";

export default function Home() {
  const client = new ApolloClient({
    uri: "https://ql.cloudbank.kotasatelit.com/query/",
    cache: new InMemoryCache(),
  });

  const [state, setState] = useState("/");

  return (
    <>
      <Navbar state={state} handleClick={setState} />
      <ApolloProvider client={client}>
        <div className="relative w-full overflow-hidden flex min-h-max">
          <div
            className={`${
              state === "/"
                ? "w-full translate-x-0"
                : "w-0 opacity-0 -translate-x-full"
            } flex-shrink-0 duration-500 transition-all grow overflow-hidden `}
          >
            <Todo />
          </div>
          <div
            className={`w-full flex-shrink-0  duration-500 transition-all ${
              state !== "domain" ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <Domain />
          </div>
        </div>
      </ApolloProvider>
    </>
  );
}
