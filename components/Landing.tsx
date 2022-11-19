import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image';

function Landing() {
  const { publicKey, sendTransaction } = useWallet();

  return (
    <div>
      {!publicKey && (
        <div className='pt-32 sm:pt-24 '>
          <div className='container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
            <div className='flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left'>
              <h1 className='my-4 text-5xl font-bold leading-tight'>
                Publish, Own, and Fund your ideas like never before!
              </h1>
              <p className='leading-normal text-2xl mb-8'>
                Write blog posts to blockchain, share ideas, raise funds and
                connect with the global community without permission!
              </p>
              <div className='w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0  lg:bg-transparent text-black p-4 lg:p-0 z-20'>
                <button

                  className={`mx-auto lg:mx-0 hover:underline  font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out`}>
                  Connect Wallet
                </button>
              </div>
              {/* <Login /> */}
            </div>

            <div className='w-full md:w-3/5 py-6 text-center'>
              {/* <img className='w-full md:w-4/5 z-50' src={landingIllustration} /> */}
              <img className='w-full md:w-4/5' src="/logo.png" />

            </div>
          </div>
        </div>)}
    </div>);
}

export default Landing;