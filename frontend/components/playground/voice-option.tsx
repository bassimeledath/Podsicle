import React from "react";
interface VoiceOptionProps {
    name: string;
    selectedName: string;
    setSelectedName: (name: string) => void;
  }
  
  const VoiceOption: React.FC<VoiceOptionProps> = ({ name, selectedName, setSelectedName }) => {
    const handleClick = () => {
      setSelectedName(name);
    };
    const playAudio = (audioFile) => {
        try {
            const audio = new Audio(audioFile);
            audio.play()
            setTimeout(function() {
              audio.pause();
            }, 2600);
        }
        catch( theError ) {
            console.log( theError );
        }
      };

  return (
    <label onClick={handleClick} className={`inline-flex items-center px-4 py-2 space-x-1.5 rounded-md cursor-pointer ${selectedName === name ? 'bg-[#9496FD] text-white hover:bg-blue-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} `}>
                <span className={`ml-2 ${selectedName === name ? 'font-bold' : ''}`}>{name}</span>
                <div className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline"
                    onClick={() => playAudio(`/voices/${name}.mp3`)}> 
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l18-9L5 3z" />
                    </svg>
                </div>
                </label>
  );
};

export default VoiceOption;
