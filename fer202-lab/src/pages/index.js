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
      <main className='flex items-center text-dark w-full dark:text-light min-h-screen'>
        <Layout className='pt-0 md:pt-16 sm:pt-8'>
          <div className='flex items-center justify-between w-full lg:flex-col'>
            <div className='w-1/2 md:w-full'>
              <Image src='/images/profile/pngwing.com.png' width={500} height={500} alt='TT' className='w-full h-auto lg:hidden md:inline-block md:w-full'
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
              />
            </div>
            <div className='w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center'>
              <AnimatedText text='Turning Vision Into Reality With Orchids' className='!text-6xl !text-left
              xl: !text-5xl lg:!text-center lg:!text=6xl md:!text-5xl sm:!text-3xl
              '/>
              <p className='my-4 text-base font-medium md:text-xs sm:text-xs'>
                As a passionate orchid enthusiast, I am dedicated to turning ideas into beautiful orchid displays.
                Explore my latest projects and articles, showcasing my expertise in orchid cultivation and care
              </p>
              <div className='flex items-center self-start mt-2 lg:self-center'>
                <Link href='/about' target='_blank'
                  className='flex items-center bg-dark text-light p-2.5 px-6
              rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
              border border-solid border-transparent hover: border-dark 
              dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
              hover:dark:border-light md:p-2 md:px-4 md:text-base'
                >About
                  <LinkArrow className={"w-6 ml-1"} />
                </Link>
                <Link href='mailto:phuoctmse184067@fpt.edu.vn' target='_blank'
                  className='ml-4 text-lg font-medium capitalize text-dark dark:text-light underline md:text-base'
                >Contact</Link>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  )
}
