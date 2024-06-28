import React from 'react'
import Layout from './Layout'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='w-full border-t-2 border-solid border-dark 
    font-medium text-lg dark:text-light dark:border-light sm:text-base'>
        <Layout className='py-8 flex items-center justify-between lg:flex-col lg:py-6'>
            <span>{new Date().getFullYear()} &copy; All Right Reserved.</span>
            <div className='lg:py-2'>
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