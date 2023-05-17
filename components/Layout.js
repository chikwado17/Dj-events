import Head from "next/head"

import Header from "@/components/Header";
import Footer from "./Footer";
import styles from '../styles/Layout.module.css';

export default function Layout({title, description, keywords, children}) {
  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Head>

      <Header />
       <div className={styles.container}>
            {children}
       </div>
       <Footer />
    </div>
  )
}
