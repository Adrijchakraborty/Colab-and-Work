import React from 'react'
import './OfferSec.css';
const OfferSection = () => {
    return (
        <section className="bg-img">
            <h1 className='text-center text-3xl font-cursive py-3'>What we offer</h1>
            
            <p className='px-10 py-5 font-sans text-lg'>At our platform, we provide a dynamic and collaborative freelancing experience where developers, clients, and project leaders come together to build top-quality software solutions. Our services cater to both individual clients and businesses, offering a seamless process to get your project started.</p>
            <div className='flex justify-around py-5'>
                <div className='flex flex-col items-center'>
                    <img className='w-[12vw] rounded-full' src="https://img.freepik.com/free-vector/partners-doing-jigsaw-puzzle-flat-illustration_74855-5277.jpg?size=626&ext=jpg" alt="" />
                    <p className='text-lg font-sans'>Collaborative Development Teams</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-[12vw] rounded-full' src="https://img.freepik.com/free-vector/coworkers-cartoon-characters-effective-collaboration-coworkers-cooperation-teamwork-colleagues-discussing-solution-successful-interaction_335657-2309.jpg?size=626&ext=jpg" alt="" />
                    <p className='text-lg font-sans'>Skill-Building Opportunities</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-[12vw] rounded-full' src="https://img.freepik.com/free-vector/money-transfer-abstract-concept-illustration_335657-3868.jpg?ga=GA1.1.1564806246.1729438746&semt=ais_hybrid" alt="" />
                    <p className='text-lg font-sans'>Secure and Transparent Transactions</p>
                </div>
            </div>
        </section>
    )
}

export default OfferSection
