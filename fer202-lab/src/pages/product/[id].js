import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchOrchidById } from '../api/Orchids';
import Head from 'next/head';
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';
import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon } from '@/components/Icons';

const ProductDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [orchid, setOrchid] = useState(null);

    const handleBack = () => {
        router.back();
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 1l2.56 5.83L18 7.36l-4.09 3.76.98 6.08L10 15.25l-5.9 3.95.98-6.08L2 7.36l5.44-.53L10 1z" clipRule="evenodd" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 1l2.56 5.83L18 7.36l-4.09 3.76.98 6.08L10 15.25l-5.9 3.95.98-6.08L2 7.36l5.44-.53L10 1z" clipRule="evenodd" />
                    </svg>
                );
            }
        }
        return stars;
    };

    useEffect(() => {
        const getOrchid = async () => {
            if (id) {
                try {
                    const data = await fetchOrchidById(id);
                    setOrchid(data);
                } catch (error) {
                    console.error('Error fetching orchid:', error);
                }
            }
        };

        getOrchid();
    }, [id]);

    if (!orchid) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>{orchid.name}</title>
                <meta name="description" content={`Details about ${orchid.name}`} />
            </Head>
            <main className='w-full mb-16 flex flex-col items-center justify-center'>
                <Layout className='sm:pt-16'>
                    <AnimatedText text="Typical Orchids" className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8' />
                    <div className='container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-10'>
                        <div className='bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 flex flex-col md:flex-row md:flex-row-reverse gap-6'>
                            <div className='relative w-full h-96 sm:h-auto md:w-1/2'>
                                <Image src={orchid.image} layout="fill" objectFit="cover" alt={orchid.name} className='rounded-xl' />
                            </div>
                            <div className='flex flex-col justify-between w-full md:w-1/2'>
                                <div>
                                    <h3 className='text-2xl font-bold text-indigo-600 mb-2'>{orchid.category}</h3>
                                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>{orchid.name}</h1>
                                    <div className='flex items-center mb-4'>
                                        {renderStars(orchid.rating)}
                                        <p className='ml-2 text-gray-500'>{orchid.rating} stars</p>
                                    </div>
                                    <p className='text-gray-500 mb-4'>{orchid.description}</p>
                                    <div className='flex gap-3 mb-4'>
                                        <span className='bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded'>{orchid.color}</span>
                                        <span className='bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded'>{orchid.origin}</span>
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-4'>
                                    <button
                                        onClick={handleBack}
                                        className='bg-indigo-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Back to Products
                                    </button>
                                    <a
                                        href={orchid.image}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='bg-gray-200 text-gray-800 px-4 py-2 rounded-lg'
                                    >
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </main>
        </>
    );
};

export default ProductDetail;
