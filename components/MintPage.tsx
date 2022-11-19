import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../styles/Home.module.css'

function MintPage() {
    const { publicKey, sendTransaction } = useWallet();
    const [imageInput, setImageInput] = React.useState('');


    const [generateImageURL, setGenerateImageURL] = React.useState('');
    //const [generateImageURL, setGenerateImageURL] = React.useState('https://replicate.delivery/pbxt/c2VdqB8RG9anL1JYCee4PfN6zhmkZRd5S7rRPmE1QEZOKEDgA/out-0.png');
    const [loadingAiImage, setLoadingAiImage] = React.useState(false);
    const [receivedUUID, setReceivedUUID] = React.useState('');

    const [isMinting, setIsMinting] = React.useState(false);

    const handleGenerateImage = async () => {
        generateImageURL && setGenerateImageURL('');
        setLoadingAiImage(true);
        if (imageInput.length > 0) {
            const response = await fetch('https://mintedtweets.cordify.app/request-art', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "aiText": imageInput
                })
            });
            const data = await response.json();
            console.log(data)
            const uri = data.response.uuid
            setReceivedUUID(uri)
            // await a delay for 10 seconds
            await new Promise(r => setTimeout(r, 10000));


            for (let i = 0; i < 10; i++) {
                const response2 = await fetch('https://mintedtweets.cordify.app/get-generated-art-by-id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "uuid": uri
                    })
                })
                const responseJson = await response2.json();
                console.log(responseJson)
                let output = await responseJson["response"]["prediction"]["output"]
                if (output) {
                    setGenerateImageURL(output[0])
                    setLoadingAiImage(false);
                    return;
                }
                else {
                    console.log("waiting for image to generate")
                }
            }
        }





    }

    const mintImage = async () => {
        if(isMinting)return
        setIsMinting(true);
    
        const response = await fetch('https://mintedtweets.cordify.app/mint-solana-nft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "imageURL": generateImageURL,
                "receiverPublicKey": publicKey.toBase58(),
                "nftName": imageInput
            })


        });
        const data = await response.json();
        setIsMinting(false);
console.log(data)
        const errorMessage = data.response.error_message;
        if(errorMessage){
            alert(errorMessage)
        }
       else{
        alert("NFT Minted Successfully View in your Solana Wallet")
       }
        console.log(data)
    }
    return (
        <div className='w-full my-10'>

            <div>
                <div className='flex flex-shrink items-center justify-center space-x-1'>
                    <input type="text" placeholder="Enter your image description"
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        className='w-1/2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent' />


                    <button className={` bg-[rgb(8,6,35)] hover:bg-[rgb(23,18,58)] text-white px-3 py-2 rounded-md shadown-sm primary hover:text-gray-200 `}
                        onClick={handleGenerateImage}
                    >Generate</button>
                </div>

                <div className="w-full flex justify-center  my-5">
                    {generateImageURL && <img src={generateImageURL} alt="generated image" className='rounded-md' />}

                    {(!generateImageURL && !loadingAiImage) && <div className='w-72 h-72 bg-gray-200 rounded-md flex items-center justify-center mx-auto'>
                        <div className=" rounded-full h-32 w-32"></div>
                    </div>}


                </div>


                {loadingAiImage && <div className='w-72 h-72 bg-gray-200 rounded-md flex items-center justify-center mx-auto'>
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>}

                <div className='flex justify-center'>
                    {(generateImageURL && publicKey) && <div className=''>
                        <button className={` bg-[rgb(8,6,35)] hover:bg-[rgb(23,18,58)] text-white px-10 py-3 rounded-md shadown-sm primary hover:text-gray-200 `}
                        
                        onClick={mintImage}>
                            {isMinting? "Minting...":"Mint"}
                        </button></div>}

                    {(generateImageURL && !publicKey) && <div className=''>
                        <div className='bg-yellow-300  border-l-2 border-yellow-400 px-8 py-2 rounded-md shadown-sm'>
                            Connect your Wallet to mint this as NFT
                        </div></div>}
                </div>

            </div>

        </div>
    );
}

export default MintPage;