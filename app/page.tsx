import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import my_image from '@/public/images/midjourney 1.png'
import { Metadata } from 'next'
import HeavyComponent from './components/HeavyComponent'

export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <main className='relative h-screen'>
      <h1>Hello World!</h1>
      <HeavyComponent/>
      {/* <Image
        src="https://bit.ly/react-cover"
        alt="midjourney"
        fill
        className='object-cover'
        sizes='(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw'
        quality={100}
        priority/> */}
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  // const product = await fetch('');
  return {
    title: 'Amir',
    description: '...'
  };
}
