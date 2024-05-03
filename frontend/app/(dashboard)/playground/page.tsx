"use client"

import { useState} from "react";
import { useChat } from "ai/react";
import ChatSection from "@/components/playground/chat-section";
import PlayBar from "@/components/playground/playbar";
import "../../globals.css"
import Lottie from 'react-lottie-player';
import lottieJson from './microphone.json';
import voiceJson from './voice.json';
import FormComponent from "@/components/playground/form";
import { createNewPodcast } from '@/lib/api';


export default function Page() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [audio, setAudio] = useState("");
  const { handleSubmit: sendInput } = useChat({ api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {"Content-Type": "application/json",
  },});
  const playMusic = () => {
      try {
        const music = new Audio("https://dl.dropboxusercontent.com/s/9h90r7ku3df5o9y/long-day.mp3?dl=0");
        music.loop = true;
        music.play();
        setTimeout(function() {
          music.pause();
        }, 30000);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }

  const handleFormSubmit = async (input) => {
    try {
      setLoading(true);
      const response = await createNewPodcast(input);
      console.log("Prompt:", response);
      if (response) {
        setOutput(response.transcript);
        setAudio(response.audio);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="flex w-full flex-col md:flex-row h-full min-h-[46rem]">
      <section className="md:w-1/2 w-screen overflow-auto items-center">
        <FormComponent onSubmit={handleFormSubmit} />
        {output ? (<div><h1 className="block text-gray-700 font-bold mt-4 mb-2">🎉Woohoo! Your podcast is ready to go!🥳</h1></div>): null}
      </section>
      {output ? (
        <section className="md:w-1/2 w-screen h-[calc(100% - 60px)] flex flex-col">
          <ChatSection output={output} />
          <PlayBar src={audio} />
        </section>
      ) : (
        loading ? (
          <section className="md:w-1/2 w-screen flex flex-row justify-center items-center md:p-20">
            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ width: 300, height: 300 }}
            />
          </section>
        ) : (<section className="md:w-1/2 w-screen flex flex-row justify-around md:p-20 mt-20">
        <Lottie
          loop
          animationData={voiceJson}
          play
          style={{ width: 300, height: 300 }}
          onClick={() => playMusic()}
        />
      </section>)
      )}
    </div>
    );
  }
