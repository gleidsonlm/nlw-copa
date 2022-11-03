import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import appPreviewImage from '../assets/app-preview.png';
import LogoImage from '../assets/logo.svg'
import usersAvatarExampleImage from '../assets/users-avatar-example.png'
import iconCheckImage from '../assets/icon-check.svg'
import { api } from '../../lib/axios';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {

  /* useState to retrieve value from input */
  const [poolTitle, setPoolTitle] = useState('')

  /* Receives form inputs and parse them to function to create object with API POST /pools */
  async function createPool(event: FormEvent) {
    event.preventDefault();

    /* TryCatch axios promise POST /pools returns either the code of created pool or error alert */
    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });
      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      alert('\n\nI just copied the code to your clipboard.\n\n' + code + '\n\nYou can share it anywhere now.');
      setPoolTitle('');
    } catch (error) {
      console.error(error)
      alert('Ops, sorry. \n Please, try again.')
    }

  };



  return (
    <div className='max-w-5xl h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={LogoImage} alt="logo for the NLW Copa app" aria-hidden='true' />

        <h1 className='mt-14 text-5xl text-white font-bold leading-tight'>Invite your friends to share predictions for the World Cup 2022 games!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExampleImage} alt="image showing user's avatar using the app" />
          <strong className='text-xl'>
            <span className=' text-ignite-500'>+{props.userCount}</span> friends playing predictions.
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10'>
          <fieldset className='flex gap-2'>
            <legend className=' hidden'>After creating your group, you&apos;ll receive a code to invite your guests.</legend>
            <input
              onChange={event => setPoolTitle(event.target.value)}
              value={poolTitle}
              type='text'
              placeholder="What's your group name?"
              required
              className=' flex-1 px-6 py-4 rounded  bg-gray-800 border border-gray-600 text-sm'
            />
            <button type='submit' className=' bg-yellow-300 hover:bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase'>Create</button>
          </fieldset>
          <p className='mt-4 text-gray-300 place-self-end leading-relaxed' aria-disabled='false' >After creating your group, you&apos;ll receive a code to invite your friends, share your predictions and check the scoreboard. \uD83D\uDE80</p>
        </form>

        <div className='pt-10 mt-10 border-t bt-gray-600 divide-x divide-gray-600  grid grid-cols-2'>
          <div className='flex items-center gap-6 text-sm justify-start'>
            <Image src={iconCheckImage} alt="decoration icon" aria-hidden='true' />
            <span className='flex flex-col'><span className='text-bold text-2xl text-ignite-500'>+{props.poolCount}</span><span>&nbsp; groups created.</span></span>
          </div>
          <div className='flex items-center gap-6 text-sm justify-end'>
            <Image src={iconCheckImage} alt="decoration icon" aria-hidden='true' />
            <span className='flex flex-col'><span className='text-bold text-2xl text-ignite-500'>+{props.guessCount}</span><span>&nbsp; predictions shared.</span></span>
          </div>
        </div>
      </main>
      <Image src={appPreviewImage} alt="two mobile phones with app preview" />
    </div>
  )
}

/*
  todo: Replace implementing the getStaticProps
  https://nextjs.org/docs/basic-features/data-fetching/get-static-props
 */
export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    await api.get('pools/count'),
    await api.get('guesses/count'),
    await api.get('guesses/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}