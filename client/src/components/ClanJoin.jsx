import React from 'react'
import CreateClan from './CreateClan'
import JoinClan from './JoinClan'
import { Link } from 'react-router-dom'

const ClanJoin = () => {
    return (
        <div className='min-h-screen flex flex-col items-center'>
            <div className=''>
                <p className='text-center font-cursive text-xl'>Dont have a clan ?</p>
                <div className='flex items-center gap-16 '>
                    <div ><CreateClan /></div>
                    <div className="vl"></div>
                    <div> <Link to={'/join-clan'}>Join Clan</Link> </div>
                </div>
            </div>
        </div>
    )
}

export default ClanJoin