'use client';
import React, { useState } from 'react'



const Page = () => {

    const [isVisible, setVisible] = useState(false)

    return (
        <div>
            <h1>Hello World!</h1>
            <button onClick={async () => {

                const _ = (await import('lodash')).default;

                const users = [
                    { name: 'c' },
                    { name: 'b' },
                    { name: 'a' },
                ];
                const sorted = _.orderBy(users, ['name']);
                console.log(sorted);
            }}>Show</button>
        </div>
    )
}

export default Page
