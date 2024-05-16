import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Task from "./Task";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileDone,
} from "react-icons/ai";
import Sidebar from "./Sidebar";

export default function Todo() {
  const { register, setValue, getValues, watch, handleSubmit } = useForm({
    defaultValues: {
      value: "",
      cari: "",
    },
  });
  type todoList = {
    value: string;
    done: boolean;
  }[];

  const [data, addData] = useState<todoList>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [btnClick, setClick] = useState(false);
  const [filter, setFilter] = useState<todoList | null>(null);
  const [search, setSearch] = useState<todoList | null>(null);
  const resultData = filter ?? search ?? data;

  const onSubmit = () => {
    const datas = filter ?? data;
    const searchData = datas.filter((d) => d.value.includes(watch("cari")));
    setSearch(searchData);
    setValue("cari", "");
  };

  const btnRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full p-5 flex relative flex-col-reverse md:flex-row gap-2">
      <div className="px-5 relative">
        <Sidebar setFilter={setFilter} data={data} setSearch={setSearch} />
      </div>
      <div className="w-full flex justify-center min-h-[80vh] md:min-h-[90vh] gap-2 pb-5 md:p-0">
        <div className="xl:w-[50rem] md:w-[35rem] w-full bg-[#60c0bf] border-2 border-black rounded-lg min-h-max p-5 px-10 mb-16 md:m-0">
          <h1 className="text-6xl font-bold">Things to do:</h1>
          <div className="w-full flex gap-5 mt-10 font-bold flex-col md:flex-row">
            <form
              className="flex rounded-xl overflow-hidden border-2 border-black w-full "
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                {...register("cari")}
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
              className="bg-[#7fbc95] border-2 border-black rounded-xl md:w-2/3 text-2xl active:translate-y-0.5 py-2 duration-150"
              onClick={() => setClick((click) => !click)}
            >
              New task
            </button>
          </div>
          <hr className="border-2 border-black mt-10 mb-5" />
          <div
            className="w-full flex flex-col gap-3 overflow-x-auto max-h-[50vh] md:max-h-[62.5vh] pr-1"
            style={{
              scrollbarColor: "white transparent",
              scrollbarWidth: "thin",
            }}
          >
            {resultData.map((val, key) => (
              <div
                key={key}
                className="w-full min-h-16 bg-[#b380da] border-2 flex items-center border-black rounded-xl p-3 gap-1 group/item flex-shrink-0"
              >
                <p className="text-lg w-full font-extrabold leading-6 relative whitespace-pre max-h-[10rem] overflow-x-hidden overflow-y-auto text-ellipsis">
                  {index === key ? (
                    <textarea
                      {...register("value")}
                      className="w-full px-2 py-1 rounded-md bg-[#f7cb66] outline-none h-full focus:border-black border max-h-40 md:max-h-[10rem]  "
                      autoFocus
                    />
                  ) : (
                    val.value
                  )}
                </p>
                <div
                  className=" flex gap-2 flex-col sm:flex-row"
                  style={{
                    scrollbarColor: "white #60c0bf",
                  }}
                >
                  <button
                    className="p-2 px-2.5 bg-[#f7cb66] rounded-xl text-2xl border border-black active:translate-y-0.5 active:bg-slate-500 duration-150"
                    onClick={() =>
                      index === null || index !== key
                        ? (setIndex(key), setValue("value", val.value))
                        : (index === key && (val.value = getValues("value")),
                          setIndex(null))
                    }
                  >
                    {index === key ? <AiOutlineFileDone /> : <AiOutlineEdit />}
                  </button>
                  <button
                    className={`p-2 px-2.5 bg-[#7fbc95] rounded-xl text-2xl border border-black active:translate-y-0.5 active:bg-slate-500 ${
                      val.done && "bg-slate-500"
                    }`}
                    onClick={() => {
                      data[key].done = !data[key].done;
                      addData([...data]);
                    }}
                  >
                    <AiOutlineCheckCircle />
                  </button>
                  <button
                    className="p-2 px-2.5 bg-[#ed7461] rounded-xl text-2xl border border-black active:translate-y-0.5 active:bg-slate-500"
                    onClick={() => addData(data.filter((_, i) => i !== key))}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`lg:${btnClick ? "block" : "hidden"} 
          ${!btnClick ? "opacity-0 -z-10" : "opacity-100 z-0"}
          absolute top-0 left-0 duration-300 lg:z-0 lg:static lg:w-max w-full p-10 md:p-20 py-40 lg:p-0 bg-black/50 lg:bg-transparent h-full overflow-y-auto`}
          ref={btnRef}
          onClick={() => setClick(!btnClick)}
        >
          <Task
            addTodo={addData}
            btnEvent={btnClick}
            setBtn={setClick}
            setSearch={setSearch}
          />
        </div>
      </div>
    </div>
  );
}

// export const DataTodo = () => {
//   // Fungsi untuk menambahkan data baru
//   const addTodo = (newTodo: string) => {
//     addData((prevData) => ({
//       tasks: [...prevData.tasks, { value: newTodo }],
//     }));
//   };

//   return { data, addTodo }; // Mengembalikan data dan fungsi addTodo
// };
