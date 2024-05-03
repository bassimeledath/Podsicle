import prisma from '@/lib/prisma';
import PodcastCard from '@/components/podcast/PodcastCard';

const getPodcasts = async () => {
  const podcasts = prisma.podcast.findMany({})
  return podcasts
}

const Page= async () =>{
  const podcasts = await getPodcasts()
  return <div className='h-full min-h-[46rem] w-full p-4'>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-9">
    {podcasts.map((podcast) => (
      <div key={podcast.id} className='p-5 cursor-pointer overflow-hidden bg-white rounded-xl aspect-square shadow-xl space-y-4'>
        <PodcastCard podcast={podcast}/>
      </div>
        ))}
        </div>
  </div>;
}

export default Page