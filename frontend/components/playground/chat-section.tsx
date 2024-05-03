import React, { useRef, useState, useEffect } from 'react';

export default function ChatSection({ output }) {
  const msgEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex == 0) {
      //console.log(mockMessages[currentMessageIndex].text.length*100);
      let delay = 11000;
      const timer = setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, output[currentMessageIndex]]);
        setCurrentMessageIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (currentMessageIndex < output.length) {
      let delay = output[currentMessageIndex].text.length*60;
      const timer = setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, output[currentMessageIndex]]);
        setCurrentMessageIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, output.length]);

  useEffect(() => {
    if (currentMessageIndex > 6 && msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
    return <div className="h-[46rem] bg-white flex flex-col rounded-xl shadow-xl">
    <div className="chat-container">{messages.map ((message, i) =>
            <div key={i} className={message.left?"chat left": "chat right"}>
                <img className= 'chatImg' src="/gemini.png"/>
                <p className='text'>{message.text}</p>
            </div>
            )}<div ref={msgEndRef}/>
      </div>
    </div>;
  }