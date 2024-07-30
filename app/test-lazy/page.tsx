'use client';
import React, { useState } from 'react'
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
    () => import('../components/HeavyComponent'),
    {
        ssr: false,
        loading: () => <p>Loading ...</p>
    }
);

const page = () => {

    const [isVisible, setVisible] = useState(false)

    return (
        <div>
            <h1>Hello World!</h1>
            <button onClick={() => setVisible(true)}>Show</button>
            {isVisible && <HeavyComponent/>}
        </div>
    )
}

export default page
