import { useRef } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineFileDone,
  AiOutlineMenu,
  AiOutlineClockCircle,
} from "react-icons/ai";

export default function Sidebar() {
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

    all.current?.classList.toggle("opacity-0");
    all.current?.classList.toggle("-translate-x-full");
    allBtn.current?.classList.toggle("w-12");
    allBtn.current?.classList.toggle("w-full");

    check.current?.classList.toggle("opacity-0");
    check.current?.classList.toggle("-translate-x-full");
    checkBtn.current?.classList.toggle("w-12");
    checkBtn.current?.classList.toggle("w-full");

    chek.current?.classList.toggle("absolute");
    chek.current?.classList.toggle("opacity-0");
    // chek.current?.classList.toggle("-translate-x-full");
    chekBtn.current?.classList.toggle("w-12");
    chekBtn.current?.classList.toggle("w-full");
    chekBtn.current?.classList.toggle("p-3.5");
  };
  return (
    <div
      className="md:w-20 w-full bg-[#60c0bf] rounded-2xl border-2 border-black overflow-hidden font-semibold px-3 duration-300 transition-all flex bottom-0 left-0 md:static md:block p-3 md:py-0 fixed"
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
          className="bg-[#7fbc95] w-12 p-3.5 text-xl rounded-xl border border-black flex gap-2 items-center transition-all duration-300 relative overflow-hidden"
          ref={allBtn}
        >
          <AiOutlineFileDone />
          <span
            className="text-xl absolute -translate-x-full w-full flex justify-center items-center opacity-0 duration-300"
            ref={all}
          >
            All
          </span>
        </button>
        <button
          className="bg-[#7fbc95] w-12 p-3.5 text-xl rounded-xl border border-black flex gap-2 items-center transition-all duration-300 relative overflow-hidden"
          ref={checkBtn}
        >
          <AiOutlineCheckCircle />
          <span
            className="text-xl absolute -translate-x-full w-full flex justify-center items-center opacity-0 duration-300"
            ref={check}
          >
            Checked
          </span>
        </button>
        <button
          className="bg-[#7fbc95] w-12 p-3.5 py-3 text-xl rounded-xl border border-black flex gap-2 justify-center items-center transition-all duration-300 relative overflow-hidden"
          ref={chekBtn}
        >
          <AiOutlineClockCircle />
          <span className="absolute opacity-0 duration-300" ref={chek}>
            Uncheked
          </span>
        </button>
      </div>
    </div>
  );
}
