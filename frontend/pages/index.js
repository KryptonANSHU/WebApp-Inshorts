import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
     <h1 className='m-10'><a href='/signup'>SignUp</a></h1>
     <h1><a href='/signin'>Login</a></h1>
    </>
  )
}
