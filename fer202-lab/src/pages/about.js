import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

const AnimatedNumber = ({value}) => {
  const ref  = useRef(null)

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, {once: true});

  useEffect(() => {
    if(isInView){
      motionValue.set(value);
    }
  },[isInView, value, motionValue])

  useEffect(() => {
    springValue.on("change",(latest) => {
      if(ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    }
    )
  }, [springValue,value])

  return <span ref={ref}></span>
}

const about = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About page" />
      </Head>
      <main className='flex w-full flex-col items-center justify-center'>
        <Layout className='pt-16'>
          <AnimatedText text="Orchids embody elegance" className='mb-16' />
          <div className='grid w-full grid-cols-8 gap-16'>
            <div className='col-span-3 flex flex-col items-start justify-start'>
              <h2 className='mb-4 text-lg font-bold uppercase text-dark/75'>Biography</h2>
              <p className='font-medium'>
                Orchids, belonging to the Orchidaceae family, represent one of the largest
                and most diverse families of flowering plants, with over 25,000 species
                and more than 100,000 hybrids. These plants are found on every continent
                except Antarctica, thriving in a variety of habitats from tropical rainforests
                to arid deserts. Orchids have captivated humans for centuries,
                not only for their extraordinary beauty but also for their complex
                reproductive strategies and ecological significance.
              </p>
              <p className='my-4 font-medium'>
                The intricate flowers often resemble insects, aiding in pollination,
                while some species have developed unique symbiotic relationships with fungi
                to obtain nutrients. Orchids have been cultivated since ancient times,
                revered in many cultures for their aesthetic appeal and medicinal properties.
              </p>
              <p className='font-medium'>
                Today, they remain a symbol of refinement and luxury,
                celebrated in horticulture and cherished as one of nature’s most magnificent
                creations.
              </p>
            </div>
            <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8'>
              <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark'></div>
              <Image src='/images/profile/MiniOrchid.png' width={500} height={500} alt='TT' className='w-full h-auto rounded-2xl' />
            </div>
            <div className='col-span-2 flex flex-col items-end justify-between '>
              <div className='flex flex-col items-end justify-center'>
                <span className='inline-block text-7xl font-bold'>
                  <AnimatedNumber value={25000}/>
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75'>species</h2>
              </div>
              <div className='flex flex-col items-end justify-center'>
                <span className='inline-block text-7xl font-bold'>
                  +<AnimatedNumber value={70}/>%
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75'>orchid species are epiphytic</h2>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  )
}

export default about