import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Atorus</title>
        <meta name="description" content="Bring you and your friends' photos together." />
      </Head>
      <header>
        <h1>Atorus</h1>
      </header>
    </div>
  )
}

export default Home
