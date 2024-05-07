import { useState } from "react";

export default function Todo() {
  const [data, addData] = useState<string[]>([]);
  return (
    <div className="w-full flex">
      <div className="w-full flex justify-center items-center">
        <div className="w-[40rem] bg-[#60c0bf] border-2 border-black rounded-lg h-full p-5 ">
          <h1 className="text-5xl">Things to do:</h1>
          <div className="mt-10">
            <div className="w-full flex gap-5">
              <form className="flex rounded-xl overflow-hidden border-2 border-black w-full ">
                <input
                  type="text"
                  className="h-full w-full outline-none py-2 px-5 bg-[#f7cb66] placeholder:font-bold text-2xl"
                  placeholder="Search a task..."
                />
                <button
                  type="submit"
                  className=" px-3 bg-black text-white text-5xl -mt-3 -scale-x-100"
                >
                  &#8981;
                </button>
              </form>
              <button
                onClick={() => addData([...data, "new task"])}
                className="bg-[#7fbc95] border-2 border-black rounded-xl w-2/3 text-2xl"
              >
                New task
              </button>
            </div>
          </div>
          <hr className="border-2 border-black mt-10 mb-5" />

          {data.map((item) => (
            <div className="bg-[#b380da] border-2 border-black rounded-lg">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
