import React from 'react'
import Button from './Button'
import Link from 'next/link'

export default function NavBar() {
  return (
    <div className='flex w-screen bg-red-light text-black py-4 px-12 items-center sticky top-0 z-10'>
      <Link href='/' className='m-2'>Icon</Link>
      <div className='w-12'/>
      <Link href='/page1' className='mx-6 hover:underline'>Page 1</Link>
      <Link href='/page2' className='mx-6 hover:underline'>Page 2</Link>
      <Link href='/page3' className='mx-6 hover:underline'>Page 3</Link>
      <div className='grow'></div>
      <Button title="Connect Wallet"/>
    </div>
  )
}
