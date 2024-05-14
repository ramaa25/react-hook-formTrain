import { useEffect, useRef, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineFileDone,
  AiOutlineMenu,
  AiOutlineClockCircle,
} from "react-icons/ai";

export default function Sidebar({
  setFilter,
  setSearch,
  data,
}: {
  setFilter: any;
  setSearch: any;
  data: { value: string; done: boolean }[];
}) {
  const side = useRef<HTMLDivElement>(null);

  const menu = useRef<HTMLElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  const all = useRef<HTMLElement>(null);
  const allBtn = useRef<HTMLButtonElement>(null);

  const check = useRef<HTMLElement>(null);
  const checkBtn = useRef<HTMLButtonElement>(null);

  const chek = useRef<HTMLElement>(null);
  const chekBtn = useRef<HTMLButtonElement>(null);

  const handleClickMenu = () => {
    side.current?.classList.toggle("md:w-40");
    side.current?.classList.toggle("md:w-20");

    menu.current?.classList.toggle("opacity-0");
    menu.current?.classList.toggle("-translate-x-full");
    menuBtn.current?.classList.toggle("w-12");
    menuBtn.current?.classList.toggle("w-full");

    all.current?.classList.toggle("md:opacity-0");
    all.current?.classList.toggle("md:-translate-x-full");

    check.current?.classList.toggle("md:opacity-0");
    check.current?.classList.toggle("md:-translate-x-full");

    chek.current?.classList.toggle("md:absolute");
    chek.current?.classList.toggle("md:opacity-0");
    // chek.current?.classList.toggle("-translate-x-full");

    chekBtn.current?.classList.toggle("md:p-3.5");
  };

  const [currentFilter, setFilters] = useState("");
  const [widthPage, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [widthPage]);

  return (
    <div
      className="md:w-20 w-full md:h-full bg-[#60c0bf] rounded-2xl border-2 border-black overflow-hidden font-semibold px-3 duration-300 transition-all flex bottom-0 left-0 md:static md:block p-3 md:py-0 absolute"
      ref={side}
    >
      <div className="w-full md:flex justify-center items-center py-5 hidden">
        <button
          className=" text-xl border border-black rounded-xl bg-[#f7cb66] h-12 p-3.5 items-center flex w-12 gap-1 overflow-hidden transition-all duration-300 relative"
          onClick={() => handleClickMenu()}
          ref={menuBtn}
        >
          <AiOutlineMenu />
          <span
            className="text-xl absolute -translate-x-full w-full flex justify-center items-center opacity-0 duration-300"
            ref={menu}
          >
            Menu
          </span>
        </button>
      </div>
      <hr className="border border-black mb-3 hidden md:block" />
      <div className="flex md:flex-col gap-3 justify-between w-full items-center ">
        <button
          className={`${
            currentFilter === "" ? "bg-slate-800/40" : "bg-[#7fbc95]"
          } md:w-full p-3.5 h-12 md:h-auto text-xl rounded-xl border border-black flex gap-2 items-center transition-all duration-300 relative overflow-hidden`}
          ref={allBtn}
          onClick={() => {
            setFilter(null);
            setSearch(null);
            setFilters("");
          }}
        >
          <AiOutlineFileDone className="flex-shrink-0" />
          <span
            className={`text-xl md:absolute md:-translate-x-full ${
              (currentFilter === "" &&
                widthPage < 768 &&
                "static translate-x-0") ||
              (currentFilter !== "" &&
                widthPage < 768 &&
                "absolute translate-x-full")
            } px-2 md:px-0 md:w-full flex justify-center items-center md:opacity-0 duration-300 `}
            ref={all}
            title="All Todo"
          >
            All
          </span>
        </button>
        <button
          className={`${
            currentFilter === "checked" ? "bg-slate-800/40" : "bg-[#7fbc95]"
          } md:w-full p-3.5 h-12 md:h-auto text-xl rounded-xl border border-black flex gap-2 items-center transition-all duration-300 relative overflow-hidden`}
          ref={checkBtn}
          onClick={() => {
            const filter = data.filter((val) => val.done === true);
            setFilter(filter);
            setFilters("checked");
          }}
        >
          <AiOutlineCheckCircle className="flex-shrink-0" />
          <span
            className={`text-xl md:absolute md:-translate-x-full ${
              (currentFilter === "checked" &&
                widthPage < 768 &&
                "static translate-x-0") ||
              (currentFilter !== "checked" &&
                widthPage < 768 &&
                "absolute translate-x-full")
            } pl-2 md:px-0 md:w-full flex justify-center items-center md:opacity-0 duration-300`}
            ref={check}
            title="Checked Todo"
          >
            Checked
          </span>
        </button>
        <button
          className={`${
            currentFilter === "uncheck" ? "bg-slate-800/40" : "bg-[#7fbc95]"
          } md:w-full ${
            currentFilter === "uncheck" && window.innerWidth < 768 ? "" : "w-12"
          } p-3.5 h-12 md:h-auto py-3 text-xl rounded-xl border border-black flex gap-2 justify-center items-center transition-all duration-300 relative overflow-hidden`}
          ref={chekBtn}
          onClick={() => {
            const filter = data.filter((val) => val.done === false);
            setFilter(filter);
            setFilters("uncheck");
          }}
        >
          <AiOutlineClockCircle
            className={`flex-shrink-0 ${
              currentFilter === "uncheck" && widthPage < 768 ? "" : "ml-7"
            } md:m-0`}
          />
          <span
            className={`md:absolute md:opacity-0 w-full ${
              (currentFilter === "uncheck" &&
                widthPage < 768 &&
                "translate-x-0") ||
              (currentFilter !== "uncheck" &&
                widthPage < 768 &&
                "translate-x-full")
            } duration-300`}
            ref={chek}
            title="Unchecked Todo"
          >
            Uncheked
          </span>
        </button>
      </div>
    </div>
  );
}
