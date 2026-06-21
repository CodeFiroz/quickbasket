import ProductCard from '@/components/ui/cards/ProductCard'
import React from 'react'

const page = () => {
  return (
    <>
    
    <div className="container mx-auto px-5 py-16">

      <h2
        className='text-2xl font-semibold font-poppins text-center'
      >
        Best Seller
      </h2>

      <div className="grid grid-cols-5 gap-5">

        <ProductCard />

      </div>

    </div>

    </>
  )
}

export default page