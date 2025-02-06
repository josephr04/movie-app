import { Suspense } from "react";
import { Banner } from "./components/home/banner";
import { Loading } from "./components/Loading";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Banner/>
      </Suspense>
      <main>
      </main>
      <footer>
      </footer>
    </div>
  );
}
