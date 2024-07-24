'use client'
import React from 'react'

interface User {
    id: number;
    name: string;
    email: string;
}

const UserTable = async () => {

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

    return (
        <table className='table table-border'>
            <thead>
                <tr>
                    <th onClick={() => console.log("sort by name")}>Name</th>
                    <th onClick={() => console.log("sort by email")}>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    </tr>)}
            </tbody>                
        </table>
    )
}

export default UserTable
