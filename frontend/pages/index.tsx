import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Atorus</title>
        <meta name="description" content="Bring you and your friends' photos together." />
      </Head>
      <Header />
    </div>
  )
}

export default Home
