import React from 'react'
import Layout from './Layout'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='w-full border-t-2 border-solid border-dark 
    font-medium text-lg'>
        <Layout className='py-8 flex items-center justify-between'>
            <span>{new Date().getFullYear()} &copy; All Right Reserved.</span>
            <div>
            <h2>By PhuocTM</h2>
            </div>
            <div>
            <Link href='https://www.facebook.com/tt.trece0/' className='underline'>About Me</Link>
            </div>
        </Layout>
    </footer>
  )
}

export default Footer