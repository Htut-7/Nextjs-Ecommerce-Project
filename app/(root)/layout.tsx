import React from 'react'
import Nav from '@/Components/Nav'

function layout({children} : {children: React.ReactNode}) {
  return (
    <>
        <Nav/>
        <main>{children}</main>
    </>
  )
}

export default layout
