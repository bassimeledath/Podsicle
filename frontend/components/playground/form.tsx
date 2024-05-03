import { useState } from "react";
import VoiceOption from "@/components/playground/voice-option";
import { getUser } from '@/lib/getUser';
import Knob from "../ui/knob";

export default function FormComponent({ onSubmit }) {
  const user = getUser();
  const email = user ? user.email : '';
    const [prompt, setPrompt] = useState('');
    const [link, setLink] = useState('https://arxiv.org/abs/1706.03762');
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedGuestName, setSelectedGuestName] = useState<string>('');
    const [speedValue, setSpeedValue] = useState<number>(1);
    const [barValue, setBarValue] = useState<number>(0);

  const handleKnobChange = (newSpeed: number) => {
    const decimalValue = newSpeed;
    setBarValue(decimalValue);
  };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSpeedValue(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
          prompt: prompt,
          link: link,
          host: selectedName,
          guest: selectedGuestName,
          temp: barValue,
          email: email
        };
      console.log("form here", formData);
      onSubmit(formData);
      setPrompt("");
      setLink("");
      setSelectedName("");
      setSelectedGuestName("");
    };
  
    return (
      <div className="pr-4">
        {user ? (<div className=" bg-white rounded-xl shadow-xl px-8 pt-6 pb-8 mb-4">
        <h1 className="block text-gray-700 text-xl font-bold mb-4">Hello {user.displayName} 👋 </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
            What do you want your Podcast to be about?
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prompt"
            type="text"
            placeholder="Please be as specific as you want. This will be the topic of your podcast."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
            Let's speak Research
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="text"
            placeholder="Please provide a URL to your research paper"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
          Select a voice for the Gemini Podcaster
          </label>
          </div>

        <div className="mb-4 flex">
        <div className='w-1/2'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            🎙️ Host
            </label>
            <div className="w-1/2 space-y-2">
                <VoiceOption selectedName={selectedName} setSelectedName={setSelectedName} name="Zack" />
                <VoiceOption selectedName={selectedName} setSelectedName={setSelectedName} name="Mary" />
                <VoiceOption selectedName={selectedName} setSelectedName={setSelectedName} name="Leo" />
                <VoiceOption selectedName={selectedName} setSelectedName={setSelectedName} name="Amy" />
            </div>
        </div>
        <div className='w-1/2'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            🎙️ Guest
            </label>
            <div className="w-1/2 space-y-2">
                <VoiceOption selectedName={selectedGuestName} setSelectedName={setSelectedGuestName} name="Emily" />
                <VoiceOption selectedName={selectedGuestName} setSelectedName={setSelectedGuestName} name="Howard" />
                <VoiceOption selectedName={selectedGuestName} setSelectedName={setSelectedGuestName} name="Penny" />
                <VoiceOption selectedName={selectedGuestName} setSelectedName={setSelectedGuestName} name="Raj" />
            </div>
        </div>
        </div>
        <div className="mb-4 flex">
        <div className='w-1/2'>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bar">Speaking rate</label>
          <input type="range" id="bar" name="bar" min="0" max="2" value={speedValue} onChange={handleSpeedChange} />
          <p className="block text-gray-700 text-sm mb-2">{speedValue}</p>
        </div>
        <div className='w-1/2'>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bar">Creativity level</label>
          <Knob value={barValue} min={0} max={10} step={1} onChange={handleKnobChange} />
        </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-yellow-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
        </div>
          ) : <div className='flex flex-col'> Loading...
          <h1>Sign in or create an account to join Podsicle playground!</h1></div>}
        </div>
    );
  }