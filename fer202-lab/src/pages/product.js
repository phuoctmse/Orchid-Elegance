import AnimatedText from '@/components/AnimatedText'
import { GithubIcon } from '@/components/Icons'
import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { fetchOrchids } from './api/Orchids'
import { useRouter } from 'next/router'

const Orchids = ({ id, isSpecial, name, image, category, rating, color, country }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${id}`);
    }
    return (
        <article className="max-w-sm bg-white px-6 pt-4 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="mb-3 text-xl font-bold text-indigo-600">{category}</h3>
            <div className="relative w-full h-64">
                <Link href={image} target="_blank" passHref>
                    <div className="relative w-full h-full">
                        <Image src={image} layout="fill" objectFit="cover" alt={name} className="rounded-xl" />
                        {isSpecial && (
                            <p className="absolute top-0 left-0 bg-yellow-300 text-gray-800 font-semibold py-2 px-3 rounded-br-lg rounded-tl-lg">
                                Special
                            </p>
                        )}
                    </div>
                </Link>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{name}</h1>
            <div className="my-4">
                <div className="flex space-x-1 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                        </svg>
                    </span>
                    <p>{rating}</p>
                </div>
                <div className="flex space-x-1 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 20h-4V4h4v16zM7 16h4v4H7v-4zm0-6h4v4H7v-4zm0-6h4v4H7V4z" />
                        </svg>
                    </span>
                    <p>{color}</p>
                </div>
                <div className="flex space-x-1 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 010-16 8 8 0 010 16zm0-14a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" />
                        </svg>
                    </span>
                    <p>{country}</p>
                </div>
                <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
                    onClick={handleClick}
                >Details</button>
            </div>
        </article>
    )
}

const product = () => {
    const [orchids, setOrchids] = useState([]);

    useEffect(() => {
        const getOrchids = async () => {
            try {
                const data = await fetchOrchids();
                setOrchids(data);
            } catch (error) {
                console.error('Error fetching orchids:', error);
            }
        };

        getOrchids();
    }, []);

    return (
        <>
            <Head>
                <title>Product</title>
                <meta name="description" content="Product page" />
            </Head>
            <main className='w-full mb-16 flex flex-col items-center justify-center'>
                <Layout className='pt-16'>
                    <AnimatedText text="Typical Orchids"
                        className='mb-10 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8'
                    />
                    <div className='grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-24 xl:gap-16'>
                        {orchids.map((orchid, index) => (
                            <div key={index}>
                                <Orchids
                                    id={orchid.id}
                                    isSpecial={orchid.isSpecial}
                                    name={orchid.name}
                                    description={orchid.description}
                                    image={orchid.image}
                                    category={orchid.category}
                                    rating={orchid.rating}
                                    color={orchid.color}
                                    country={orchid.origin}
                                />
                            </div>
                        ))}
                    </div>
                </Layout>
            </main>
        </>
    )
}

export default product