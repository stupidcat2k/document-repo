import { Button } from '@/components';
import { useRouter } from 'next/router';
import React from 'react';

const Custom404 = () => {
  const router = useRouter();
  return (
    <section className='flex items-center min-h-screen p-16 '>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl text-gray-600'>
            <span className='sr-only'>Error</span>404
          </h2>
          <p className='text-2xl font-semibold md:text-3xl'>
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className='mt-4 mb-8 text-gray-400'>
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button
            rel='noopener noreferrer'
            onClick={() => router.push('/')}
            className='px-8 py-3 font-semibold rounded bg-primary text-white hover:text-white hover:opacity-90'
          >
            Back to homepage
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Custom404;
