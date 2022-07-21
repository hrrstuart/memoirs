import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    Router.push("/home")
  }, []);

  return (
    <div>

    </div>
  )
}

export default Home
