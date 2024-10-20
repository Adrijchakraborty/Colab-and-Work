import React from 'react'
import { Link } from "react-router-dom"
import { Footer } from '../components'

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
      <section className='h-[70vh] bg-pink-300'>
        <h1>What we offer</h1>
        <p>At our platform, we provide a dynamic and collaborative freelancing experience where developers, clients, and project leaders come together to build top-quality software solutions. Our services cater to both individual clients and businesses, offering a seamless process to get your project started.</p>
        <div className='flex justify-around '>
          <div>
            <img className='w-[12vw] rounded-full' src="https://img.freepik.com/free-vector/partners-doing-jigsaw-puzzle-flat-illustration_74855-5277.jpg?size=626&ext=jpg" alt="" />
            <p>Collaborative Development Teams</p>
          </div>
          <div>
            <img className='w-[12vw] rounded-full' src="https://img.freepik.com/free-vector/coworkers-cartoon-characters-effective-collaboration-coworkers-cooperation-teamwork-colleagues-discussing-solution-successful-interaction_335657-2309.jpg?size=626&ext=jpg" alt="" />
            <p>Skill-Building Opportunities</p>
          </div>
          <div>
            <img className='w-[12vw] rounded-full' src="https://img.freepik.com/free-vector/money-transfer-abstract-concept-illustration_335657-3868.jpg?ga=GA1.1.1564806246.1729438746&semt=ais_hybrid" alt="" />
            <p>Secure and Transparent Transactions</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home