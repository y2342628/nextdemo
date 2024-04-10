import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
    
      <h1>Welcome to nextjs with deployed by AWS Amplify</h1>
      哈哈哈哈哈哈
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      
    </main>
  );
}
