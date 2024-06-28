import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FramerImage = motion(Image)

const FeaturedArticle = ({ img, title, time, summary, link }) => {
    return (
        <li className='col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl'>
            <Link href={link} target='_blank' className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'>
                <FramerImage 
                    src={img} 
                    alt={title} 
                    width={500} 
                    height={300} 
                    className='w-full h-auto' 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.3 }} 
                />
            </Link>
            <Link href={link} target='_blank'>
                <h2 className='capitalize text-2xl font-bold my-2 hover:underline sm:text-xl xs:text-lg'>{title}</h2>
            </Link>
            <p className='text-sm mb-2'>{summary}</p>
            <span className='text-primary font-semibold'>{time}</span>
        </li>
    )
}

const Article = () => {
    return (
        <>
            <Head>
                <title>Article</title>
                <meta name="description" content="Article page" />
            </Head>
            <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden'>
                <Layout className='pt-16'>
                    <AnimatedText text="Orchids around us!" className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' />
                    <ul className='grid grid-cols-2 md:grid-cols-1 gap-16 lg:gap-8'>
                        <FeaturedArticle
                            title='Easy Orchids'
                            summary='Suggestions for Choosing Plants Requiring Minimal Care THIS SEEMS LIKE AN IDEAL TOPIC for an article. Many of us want to enjoy orchid flowers with a minimum of fuss and I have found that most ...'
                            time='3 minutes ago'
                            img='https://www.orchids.org/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbE1lIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--aebb040754f5cc70f6d4256125edbd18337a96d8/Phalaenopsis_Baldans_Kaleidoscope_7zz.jpg'
                            link='https://www.orchids.org/articles/easy-orchids'
                        />
                        <FeaturedArticle
                            title='Easy Orchids'
                            summary='Suggestions for Choosing Plants Requiring Minimal Care THIS SEEMS LIKE AN IDEAL TOPIC for an article. Many of us want to enjoy orchid flowers with a minimum of fuss and I have found that most ...'
                            time='3 minutes read'
                            img='https://www.orchids.org/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbE1lIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--aebb040754f5cc70f6d4256125edbd18337a96d8/Phalaenopsis_Baldans_Kaleidoscope_7zz.jpg'
                            link='https://www.orchids.org/articles/easy-orchids'
                        />
                    </ul>
                </Layout>
            </main>
        </>
    )
}

export default Article
