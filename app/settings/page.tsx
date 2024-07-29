import Link from 'next/link'
import React from 'react'

const Settings = () => {
  return (
    <div>
      <Link className='btn btn-primary' href='/settings/change-password'>Change Password</Link>
    </div>
  )
}

export default Settings
