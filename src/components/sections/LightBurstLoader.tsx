'use client';

import dynamic from 'next/dynamic';

const LightBurstDynamic = dynamic(() => import('./LightBurst'), { ssr: false });

export default LightBurstDynamic;
