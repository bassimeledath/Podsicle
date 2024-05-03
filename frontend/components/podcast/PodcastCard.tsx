'use Client';

import React, { useRef, useState, useEffect } from 'react';
import prisma from '@/lib/prisma';
import {
    HandThumbUpIcon,
    HandThumbDownIcon,
    ChatBubbleLeftIcon,
    BookmarkIcon
  } from '@heroicons/react/24/outline';


const getPodcasts = async (podcast) => {
    const like = await prisma.action.count({
        where: {
            podId: podcast.id,
            actionType: 'LIKE'
        },
      })
    const dislike = await prisma.action.count({
        where: {
            podId: podcast.id,
            actionType: 'DISLIKE'
        },
      })
    let value = like - dislike
    return value
}

export default function PodcastCard({ podcast }) {
    const like = getPodcasts(podcast)
    return <div>
            <img className= 'w-full h-[14rem] md:h-[12rem] 2xl:h-[20rem]' alt='thumbnail' src={podcast.imgUrl} />
            <div>
                <p className='text-sm md:text-xl font-bold'>{podcast.name}</p>
                <p className="text-xs sm:text-base text-black">{podcast.updatedAt.toDateString()}</p>
            </div>
            <div className="bottom-0 left-0 right-0 mt-2 flex flex-row justify-between">
                <div className="bg-slate-100 flex flex-row rounded-2xl gap-2 p-2">
                    <HandThumbUpIcon className="w-6 h-6"/>
                    <p>{like}</p>
                    <HandThumbDownIcon className="w-6 h-6"/>
                    </div>
                    <div className="bg-slate-100 flex flex-row rounded-2xl gap-2 p-2">
                    <ChatBubbleLeftIcon className="w-6 h-6"/>
                    </div>
        </div>
    </div>
  }