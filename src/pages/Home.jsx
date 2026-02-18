import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsEye, BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);

  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [framework, setFramework] = useState(options[0]);

  // AI client
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBI_cJr0V4zsDVVl1ciyMDTNEt79kTQOPo", // add your API key
  });

  async function getResponse() {
    setLoading(true);
    setOutputScreen(false);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components.

Now, generate a UI component for: ${prompt}  
Framework to use: ${framework.value}  

Requirements:  
Return ONLY the code as a single HTML file. Do NOT include Markdown code fences or explanations.
The code must be clean, well-structured, and easy to understand.  
Optimize for SEO where applicable.  
Focus on creating a modern, animated, and responsive UI design.  
Include high-quality hover effects, shadows, animations, colors, and typography.  
Return ONLY the code, formatted properly in Markdown fenced code blocks.  
Do NOT include explanations, text, comments, or anything else besides the code.  
And give the whole code in a single HTML file.
        `,
      });

      setCode(response.text);
      setOutputScreen(true);
      toast.success("Component generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error generating component!");
    } finally {
      setLoading(false);
    }
  }

  // Function to download the code as an HTML file
  const downloadCode = () => {
    if (!code.trim()) return toast.error("No code to download");

    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  // Function to copy code
  const CopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code.");
    }
  };

  // Open code in a new tab
  const openInNewTab = () => {
    if (!code.trim()) return toast.error("No code to open");
    const newWindow = window.open();
    newWindow.document.write(code);
    newWindow.document.close();
    toast.success("Opened in new tab");
  };

  // Refresh iframe preview
  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
      toast.success("Preview refreshed");
    }
  };

  // Dark theme styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1f1f23",
      borderColor: "#2a2a2e",
      color: "#fff",
      boxShadow: "none",
      "&:hover": { borderColor: "#3b82f6" },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f1f23",
      color: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#2a2a2e" : "#1f1f23",
      color: "#fff",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({ ...provided, color: "#fff" }),
    placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
  };

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <div className="flex items-center px-25 gap-5 justify-between">
        {/* LEFT PANEL */}
        <div className="left w-1/2 h-[80vh] bg-[#141319] mt-5 p-5 rounded-lg">
          <h3 className="sp-text mt-2 text-2xl">AI Components Generator</h3>
          <p className="text-gray-400 mt-2">
            Generate beautiful UI components with AI assistance
          </p>

          <p className="text-[15px] font-semibold mt-3">
            Choose your Framework
          </p>

          <Select
            className="mt-4"
            options={options}
            styles={customStyles}
            placeholder="Select framework..."
            onChange={(e) => setFramework(e)}
            value={framework}
          />

          <p className="text-[20px] font-semibold mt-4">
            Describe Your Component
          </p>

          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                getResponse();
              }
            }}
            value={prompt}
            className="w-full min-h-[250px] g-bg rounded-2xl mt-3 p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Describe the component you want to generate...
(Press Enter to generate, Shift + Enter for new line.)"
          ></textarea>

          <div className="generate flex items-center justify-center mt-4">
            <button
              onClick={getResponse}
              className="bg-indigo-600 flex mb-2 cursor-pointer ml-auto hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-out
hover:scale-105 hover:-translate-y-1 active:scale-95
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#141319]"
            >
              <BsStars className="mr-2" />
              Generate Component
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right w-1/2 h-[80vh] bg-[#141319] mt-5 p-5 rounded-lg flex flex-col relative">
          {/* Loader overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center rounded-lg">
              <ClipLoader color="#3b82f6" size={50} />
            </div>
          )}

          {outputScreen ? (
            <>
              {/* TAB BAR */}
              <div className="top w-full h-[60px] bg-[#4d4d61] flex items-center justify-center gap-10 rounded-tl-lg rounded-tr-lg mb-4 px-3 z-0">
                <button
                  className={`px-6 py-2 rounded-lg cursor-pointer text-white bg-[#3b3b58] hover:bg-[#4d4d70] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    tab === 1 ? "bg-[#282862]" : ""
                  }`}
                  onClick={() => setTab(1)}
                >
                  Code
                </button>

                <button
                  className={`px-6 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-white bg-[#3b3b58] hover:bg-[#4d4d70] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    tab === 2 ? "bg-[#282862]" : ""
                  }`}
                  onClick={() => setTab(2)}
                >
                  <BsEye /> Live Preview
                </button>
              </div>

              {/* TOOLBAR */}
              <div className="top2 w-full h-[60px] bg-[#4d4d61] flex items-center justify-between gap-3 rounded-tl-lg rounded-tr-lg mb-4 px-3 z-0">
                <div className="left font-bold sp-text">Code Editor</div>
                <div className="right flex items-center gap-4">
                  {tab === 1 ? (
                    <>
                      <button onClick={CopyCode} className="copy px-3 py-2 rounded-lg border cursor-pointer border-gray-600 bg-transparent text-gray-300 transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white hover:border-indigo-500 active:scale-95">
                        <IoCopy />
                      </button>

                      <button
                        onClick={downloadCode}
                        className="export px-3 py-2 rounded-lg border cursor-pointer border-gray-600 bg-transparent text-gray-300 transition-all duration-300 ease-in-out hover:bg-emerald-600 hover:text-white hover:border-emerald-500 active:scale-95"
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={openInNewTab}
                        className="copy px-3 py-2 rounded-lg border cursor-pointer border-gray-600 bg-transparent text-gray-300 transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white hover:border-indigo-500 active:scale-95"
                      >
                        <ImNewTab />
                      </button>

                      <button
                        onClick={refreshPreview}
                        className="export px-3 py-2 rounded-lg border cursor-pointer border-gray-600 bg-transparent text-gray-300 transition-all duration-300 ease-in-out hover:bg-emerald-600 hover:text-white hover:border-emerald-500 active:scale-95"
                      >
                        <FiRefreshCw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* EDITOR AREA */}
              <div className="editor flex-1 min-h-0 z-0">
                {tab === 1 ? (
                  <Editor
                    height="100%"
                    theme="vs-dark"
                    language="html"
                    value={code}
                    onChange={(val) => setCode(val)}
                  />
                ) : (
                  <div className="preview w-full h-full flex items-center justify-center bg-black text-white">
                    <iframe
                      ref={iframeRef}
                      srcDoc={code}
                      title="Live Preview"
                      className="w-full h-full"
                      frameBorder="0"
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            // Initial skeleton
            <div className="skeleton w-full h-full flex items-center flex-col justify-center z-0">
              <div className="circle flex items-center justify-center text-[35px] p-[20px] w-[70px] h-[70px] rounded-[50%] bg-gradient-to-tr from-[#545c93] to-[#b84c7b]">
                <HiOutlineCode />
              </div>
              <p className="text-gray-400 mt-4">
                Your generated component will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
