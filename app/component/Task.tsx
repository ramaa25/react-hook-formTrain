import { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  AiOutlineClose,
  AiTwotoneMinusCircle,
  AiTwotonePlusCircle,
} from "react-icons/ai";

export default function Task({
  addTodo,
  btnEvent,
  setBtn,
  setSearch,
}: {
  addTodo: Function;
  setBtn: Function;
  setSearch: any;
  btnEvent: boolean;
}) {
  type todoList = {
    tasks: {
      value: string;
    }[];
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<todoList>({
    defaultValues: {
      tasks: [{ value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
    rules: {
      minLength: 1,
      maxLength: 10,
    },
  });

  const onSubmit: SubmitHandler<todoList> = (data) => {
    data.tasks.map((val) => {
      const obj = { ...val, done: false };
      addTodo((prev: any) => [...prev, obj]);
    });

    // Mereset formulir setelah submit
    reset();
    setSearch(null);
  };

  return (
    <div
      className={`font-bold bg-[#60c0bf] border-2 border-black rounded-md px-10 p-5 w-full md:w-1/2 lg:w-full m-auto relative`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1 className="text-3xl capitalize mb-3 text-center">tambah todo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        {fields.map((field, index) => (
          <>
            <div key={field.id} className="flex gap-1">
              <textarea
                className="border-2 border-black rounded-lg outline-none bg-[#f7cb66] p-1 px-2 leading-5 resize-none w-full h-20"
                {...register(`tasks.${index}.value`, {
                  maxLength: {
                    value: 500,
                    message: "panjang karakter terlalu banyak",
                  },
                })}
                style={{
                  scrollbarColor: "white transparent",
                  scrollbarWidth: "thin",
                  scrollMargin: "5px",
                }}
              />
              <button
                type="button"
                onClick={() => {
                  fields.length > 1 && remove(index);
                }}
                className="text-xl"
              >
                <AiTwotoneMinusCircle />
              </button>
            </div>
            {errors.tasks && (
              <span className="text-red-500 ">
                {errors.tasks[index]?.value?.message}
              </span>
            )}
          </>
        ))}
        <div className="flex gap-2">
          <button
            type="submit"
            className="text-xl bg-[#f7cb66] text-black border-2 border-black rounded-lg px-3 p-1"
          >
            submit
          </button>
          {fields.length > 0 && (
            <button
              type="button"
              onClick={() => fields.length < 9 && append({ value: "" })}
              className="text-xl flex justify-center items-center px-2 p-1 gap-1  "
            >
              <AiTwotonePlusCircle /> Tambah
            </button>
          )}
        </div>
      </form>
      <button
        className={`flex lg:hidden absolute top-0 right-0 p-3 bg-slate-700/30 rounded-bl-md z-10`}
        onClick={() => setBtn(!btnEvent)}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
}
