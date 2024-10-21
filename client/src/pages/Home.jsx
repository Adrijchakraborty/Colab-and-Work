import React from 'react'
import { Link } from "react-router-dom"
import { Footer, OfferSection } from '../components'

const Home = () => {
  return (
    <>
      <section className='lg:h-[100vh] flex flex-col items-center justify-center gap-5 lg:gap-0 lg:flex-row bg-green-950'>
        <div className='lg:max-w-[50%] text-white flex flex-col gap-5 justify-center px-5 lg:px-9'>
          <p className='text-5xl font-cursive'>The best platform for freelancing</p>
          <p className='text-md font-serif'>Explore the best teams out there to get your work done or to work with them</p>
          <div className='flex gap-3'>
            <Link to={'/register'}>
              <button className="btn btn-primary">Signin as Client</button>
            </Link>
            <Link to={"/login"}>
              <button className="btn btn-neutral">Join as a Developer</button>
            </Link>
          </div>
        </div>
        <div className='h-full'>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c629a8180535451.650c3b7572921.png" alt="Image" className='h-full' />
        </div>
      </section>
      <OfferSection/>
      <Footer />
    </>
  )
}

export default Home