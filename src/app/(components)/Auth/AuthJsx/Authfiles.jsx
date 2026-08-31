
'use client'

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import signimsignpuLotty from '../../../../../public/lotty/SignInAndSignUpLotty.json'

function Authfiles() {
    return (
        <div className="">
            <div className=" h-full lg:h-[600px]">
                <Lottie animationData={signimsignpuLotty} loop={true} className=' h-full lg:h-[550px]' />
            </div>
        </div>
    )
}

export default Authfiles