import AnimatedText from '@/components/AnimatedText'
import { LinkArrow } from '@/components/Icons'
import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />

      </Head>
      <main className='flex items-center text-dark w-full min-h-screen'>
        <Layout className='pt-0'>
          <div className='flex items-center justify-between w-full'>
            <div >
              <Image src='/images/profile/pngwing.com.png' width={500} height={500} alt='TT' className='w-full h-auto'/>
            </div>
            <div className='w-1/2 flex flex-col items-center self-center'>
              <AnimatedText text='Turning Vision Into Reality With Orchids' className='!text-6xl !text-left'/>
              <p className='my-4 text-base font-medium'>
                As a passionate orchid enthusiast, I am dedicated to turning ideas into beautiful orchid displays.
              Explore my latest projects and articles, showcasing my expertise in orchid cultivation and care
              </p>
              <div className='flex items-center self-start mt-2'>
              <Link href='/about' target='_blank'
              className='flex items-center bg-dark text-light p-2.5 px-6
              rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
              border border-solid border-transparent hover: border-dark' 
              >About
              <LinkArrow className={"w-6 ml-1"}/>
              </Link>
              <Link href='mailto:phuoctmse184067@fpt.edu.vn' target='_blank'
              className='ml-4 text-lg font-medium capitalize text-dark underline'
              >Contact</Link>
            </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  )
}
