import Head from "next/head"
import { useRouter } from "next/router";
import Showcase from "./Showcase";
import Header from "@/components/Header";
import Footer from "./Footer";
import styles from '../styles/Layout.module.css';

export default function Layout({title, description, keywords, children}) {

  const router = useRouter();



  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Head>

      <Header />

      {router.pathname === '/' && <Showcase />}

      
       <div className={styles.container}>
            {children}
       </div>
       <Footer />
    </div>
  )
}
