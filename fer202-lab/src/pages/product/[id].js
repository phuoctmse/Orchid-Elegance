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

    const Orchids = ({ id, isSpecial, name, image, category, rating, color, country, description }) => {
        return (
            <div className='container mx-auto lg:px-12 md:px-8 px-4 bg-light py-10'>
                <div className='card bg-white p-4 rounded-lg
                flex md:flex-row flex-col gap-5
                '>
                    <div className='image my-auto'>
                        <img src={image} alt={name} className='w-full h-96 object-cover rounded-lg' />
                    </div>
                    <div className='other'>
                        <div className='tag'>
                            <ul className='flex gap-3'>
                                <li className='border-2 border-solid
                                     border-blue-200 text-sm rounded-full px-3 py-[2px]'>
                                    {color}
                                </li>
                                <li className='border-2 border-solid
                                     border-blue-200 text-sm rounded-full px-3 py-[2px]'>
                                    {country}
                                </li><li className='border-2 border-solid
                                     border-blue-200 text-sm rounded-full px-3 py-[2px]'>
                                    {category}
                                </li>
                            </ul>

                        </div>
                        <div className='head py-2'>
                            <h3 className='font-bold text-3xl'>{name}</h3>
                            <div className='flex items-center mt-1'>
                                    {renderStars(orchid.rating)}
                                    <p className='ml-2 text-gray-500'>{orchid.rating} stars</p>
                                </div>
                            <p className='py-1 text-sm text-gray-500'>{description}</p>
                        </div>
                        <div className='button flex py-3'>
                            <button
                                onClick={handleBack}
                                className='bg-indigo-600 text-white px-4 py-2 rounded-lg mr-4'
                            >
                                Back to Products
                            </button>
                            <a
                                href={image}
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
        );
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
                <Layout className='pt-16'>
                    <AnimatedText text="Typical Orchids" className='mb-10' />
                    <div className='grid grid-cols-12 gap-24'>
                        <div className='col-span-12'>
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
                    </div>
                </Layout>
            </main>
        </>
    );
};

export default ProductDetail;