"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Navbar from "@/app/component/Navbar";
import { useState } from "react";
import { Domain } from "@/app/component/Domain";
import Todo from "@/app/component/Todo";

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
        <div className="relative w-full overflow-hidden">
          <div
            className={`w-full duration-500 transition-all h-full p-5 ${
              state !== "/" ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <Todo />
          </div>
          <div
            className={`w-full duration-500 transition-all h-full absolute top-0 left-0 ${
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
