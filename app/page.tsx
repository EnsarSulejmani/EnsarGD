import Link from "next/link";
import Week1 from "./Week1/page";

export default function Home() {
  return (
    <div className="w-full h-full flex-col items-center justify-center relative">
      <div className="lg:mt-16 w-full flex-col items-center text-center">
        <h1 className=" text-[4rem] animate-pulse">
          Computer Graphics with threejs
        </h1>
        <p className="text-lg text-center mx-auto">
          This is the website for all threeJS projects for the course "Computer
          Graphics"
        </p>
      </div>
      <ul className="flex w-full items-center justify-evenly mx-auto flex-wrap my-8 sticky top-4 max-w-[960px]">
        <li className="hover:scale-110 ease-in-out duration-300">
          <Link
            href="/"
            className=" bg-[#656765] border-white border px-4 py-2 rounded-md hover:bg-white hover:text-black hover:scale-150"
          >
            Home
          </Link>
        </li>
        <li className="hover:scale-110 ease-in-out duration-300">
          <Link
            href="/Week1"
            className=" bg-[#656765] border-white border px-4 py-2 rounded-md hover:bg-white hover:text-black hover:scale-150"
          >
            Week 1
          </Link>
        </li>
        <li className="hover:scale-110 ease-in-out duration-300">
          <Link
            href="/Week2"
            className="bg-[#656765] border-white border px-4 py-2 rounded-md hover:bg-white hover:text-black hover:scale-150"
          >
            Week 2
          </Link>
        </li>
        <li className="hover:scale-110 ease-in-out duration-300">
          <Link
            href="/Week3"
            className="bg-[#656765] border-white border px-4 py-2 rounded-md hover:bg-white hover:text-black hover:scale-150"
          >
            Week 3
          </Link>
        </li>
      </ul>
      <Week1 />
    </div>
  );
}
