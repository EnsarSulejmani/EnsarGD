import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        This is the website for all threeJS projects for the course "Computer
        Graphics"
      </div>
      <ul>
        <li>
          <Link href="/Week1">Week 1</Link>
        </li>
        <li>
          <Link href="/Week2">Week 2</Link>
        </li>
      </ul>
    </div>
  );
}
