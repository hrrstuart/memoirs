import Link from 'next/link'
import { Component } from 'react'

export default class Error extends Component {
    render () {
      return (
        <div className='w-full text-center pt-10'>
            <h1 className='text-2xl text-gray-400'>Oops... Couldn&apos;t find that page. Try going back to <Link href="/">Home</Link></h1>
        </div>
      )
    }
  }