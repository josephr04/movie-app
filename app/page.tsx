import styles from "./page.module.css";
import Header from "./Header"

export default function Home() {
  return (
    <div>
      <Header/>
      <main>
        <h1 className="text-danger">Movie App</h1>
      </main>
      <footer>
      </footer>
    </div>
  );
}
