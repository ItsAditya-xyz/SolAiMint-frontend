import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'

import { PingButton } from '../components/PingButton'
import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react'

import MintPage from '../components/MintPage'
const Home: NextPage = (props) => {
	const { publicKey, sendTransaction } = useWallet();
  useEffect(() => {
    console.log(publicKey)
  }, [publicKey])
  return (


    <WalletContextProvider>
      <AppBar />
      <div >
     
      <MintPage />
      </div>
     
       
    </WalletContextProvider >


  );
}

export default Home;