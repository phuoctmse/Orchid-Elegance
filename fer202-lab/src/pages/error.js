// pages/error.js
import Head from 'next/head';

const ErrorPage = () => {
    return (
        <>
            <Head>
                <title>Error</title>
                <meta name="description" content="Error page" />
            </Head>
            <main className="bg-dark text-light dark:bg-light dark:text-dark min-h-screen p-4 flex items-center justify-center">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Error</h1>
                    <p className="text-lg">You are not authorized to access this page. Please log in first.</p>
                </div>
            </main>
        </>
    );
};

export default ErrorPage;
