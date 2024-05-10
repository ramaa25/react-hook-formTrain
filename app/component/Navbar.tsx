const Navbar = ({
  handleClick,
  state,
}: {
  handleClick: any;
  state: string;
}) => {
  return (
    <div className="flex gap-5 w-full justify-around relative tracking-wider capitalize font-bold text-xl">
      <div
        onClick={() => handleClick("/")}
        className={` w-full text-center p-5 hover:cursor-pointer btn`}
      >
        todo
      </div>
      <div
        onClick={() => handleClick("domain")}
        className={` w-full text-center p-5 hover:cursor-pointer btn`}
      >
        domain
      </div>
      <div
        className={`bg-black h-1 w-1/2 absolute bottom-0 left-0 ${
          state === "domain" && `translate-x-full`
        }
        } duration-300`}
      ></div>
    </div>
  );
};

export default Navbar;
