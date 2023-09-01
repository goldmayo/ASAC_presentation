import Modal from "@/components/modal/Modal";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <nav>
          <Link href={"/register"}>회원가입</Link>
        </nav>
      </main>
    </>
  );
}
