import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

export const Domain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      dom: "",
    },
  });
  const { ref, ...rest } = register("dom", {
    required: true,
    pattern: {
      value: /^[^0-9][a-zA-Z0-9.-]*$/,
      message: "Domain name cannot start with a number",
    },
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const search = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleFocus = () => {
      search.current?.classList.remove("shadow-[5px_5px_0_0_black]");
      search.current?.classList.add("shadow-[2px_2px_0_0_black]");
    };
    const handleFocusOut = () => {
      search.current?.classList.remove("shadow-[2px_2px_0_0_black]");
      search.current?.classList.add("shadow-[5px_5px_0_0_black]");
    };

    // Menambahkan event listener ke elemen input saat komponen dimount
    inputRef.current?.addEventListener("focus", handleFocus);
    inputRef.current?.addEventListener("focusout", handleFocusOut);
  }, []);

  type FormData = {
    dom: string;
  };

  const MUTATION = gql`
    mutation Search($dom: String!) {
      domain {
        domainOps {
          checkDomain(Domain: $dom) {
            domain
            price
            code
            available
          }
        }
      }
    }
  `;

  const [addData, { data, error, loading }] = useMutation(MUTATION);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addData({
      variables: { dom: data.dom },
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="font-bold">
      <h1 className="text-center p-5 text-5xl">Domain Checking</h1>
      <div className="w-full flex flex-col gap-2 justify-center items-center ">
        <div
          className="flex placeholder:text-lg shadow-[5px_5px_0_0_black] duration-300 border-collapse"
          ref={search}
        >
          <form action="" onSubmit={handleSubmit(onSubmit)} className="flex">
            <input
              {...rest}
              type="text"
              name="dom"
              className=" px-2 p-1 border-2 border-black outline-none w-[25rem] h-12 text-xl"
              placeholder="search domain"
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
            />
            <button
              type="submit"
              className="bg-[#aafb00] h-full p-2 px-3 border-2 border-l-0 border-black"
            >
              &#x1F50D;
            </button>
          </form>
        </div>
        <div className="text-red-600 flex flex-col justify-center items-center capitalize">
          {errors.dom && <p className="">{errors.dom.message}</p>}
        </div>
        {(loading && <p className="text-center p-5">loading...</p>) ||
          (error && isDirty && (
            <p className="text-center">Error : {error.message}</p>
          )) ||
          (data && (
            <div className="p-3 border-2 bg-black tracking-wide w-[80%] md:w-1/2 rounded-lg my-2 text-[#aafb00]">
              <h1 className="text-3xl text-center capitalize">data</h1>
              <div className="flex items-center justify-center capitalize">
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <h1>domain</h1>
                  <h1>available</h1>
                  <h1>code</h1>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-3 font-bold">
                  <p>{data?.domain.domainOps.checkDomain.domain}</p>
                  <p>{data?.domain.domainOps.checkDomain.available}</p>
                  <p>{data?.domain.domainOps.checkDomain.code}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
