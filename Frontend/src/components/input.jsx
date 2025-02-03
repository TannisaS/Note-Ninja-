"use client";
import { useState, useRef } from "react";
import { Send, Mic, X } from "lucide-react";
import { audioHandler } from "../services/transcriptHandler";

export default function ChatInput({ onResponse, updateLoading,setInputType,setNewReStatus }) {
  const [prompt, setPrompt] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  // const [isLoading,updateLoading]=useState(false);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = async () => {
    let inputData = null;
    let response = "";
    if(prompt==="")
      return ;
    setNewReStatus(true);
    const isGoogleDriveLink = prompt.startsWith("https://drive.google.com");
    updateLoading(true);
    if (isGoogleDriveLink) {
      
      inputData = {
        input_type: "audio",
        input_data: prompt,
      };
      console.log(inputData);
      setInputType(inputData.input_type);
      setPrompt("");
      const response = await audioHandler(inputData);
      setNewReStatus(false);
      console.log("audio block is hit")
      onResponse(response);
    } else {
      inputData = {
        input_type: "text",
        input_data: prompt,
      };
      console.log(inputData);
      setInputType(inputData.input_type);
      setPrompt("");
      const response = await audioHandler(inputData);
      setNewReStatus(false)
      console.log("text block is hit")
      onResponse(response);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  return (
    <div
      className="w-full max-w-3xl bg-black-900/60 backdrop-blur-sm rounded-lg p-4 border border-black
                 sm:ml-0 md:ml-14 mx-auto"
    >
      <div
        className={`relative ${isDragging ? "ring-2 ring-primary" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message or drop an google drive link which has the audio file..."
          className="w-full px-4 py-3 rounded-lg bg-white text-black placeholder-black
                     focus:outline-none focus:ring-2 focus:ring-primary resize-none
                     h-20 sm:h-24 pr-20 md:pr-24"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <div className="absolute right-2 bottom-2 flex gap-2 items-center">
          {audioFile ? (
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-700 text-gray-200 max-w-[120px] sm:max-w-[150px]">
              <span className="text-xs truncate">{audioFile.name}</span>
              <button
                onClick={() => setAudioFile(null)}
                className="p-1 hover:bg-gray-600 rounded"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg transition-colors"
            >
              <Mic size={20} className="text-black-300" />
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="p-2 rounded-lg transition-colors"
          >
            <Send size={20} className="text-black-300" />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
