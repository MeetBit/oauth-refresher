import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>OAUTH Refresher</title>
        <meta name="description" content="Refresh Oauth Credentials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          OAUTH Refresher
        </h1>

        <p className={styles.description}>
          Refresh expired OAUTH tokens for development.
          {/* <code className={styles.code}>pages/index.js</code> */}
        </p>

        <div className={styles.grid}>
          <a href="/google" className={styles.card}>
            <h2>Google &rarr;</h2>
            <p>Refresh Google Identity OAUTH 2.0 tokens.</p>
          </a>
          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://meetbit.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/meetbit.svg" alt="Vercel Logo" width={96} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
