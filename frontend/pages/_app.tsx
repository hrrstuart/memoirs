import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Atorus</title>
        <meta name="description" content="Bring you and your friends' photos together." />
      </Head>
      <div className='bg-[#19191a] flex flex-col min-h-screen'>
        <main className='flex flex-grow flex-row mx-auto'>
          <div className='h-screen sticky top-0 hidden md:block'>
            <Sidebar />
          </div>
          <div className='w-full p-5'>
            <Component {...pageProps} />
          </div>
        </main>
        <div id="portal"></div>
      </div>
    </>
  );
}

export default MyApp
