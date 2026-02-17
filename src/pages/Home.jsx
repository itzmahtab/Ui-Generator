import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsEye, BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCw } from "react-icons/fi";

function Home() {
  const [outputScreen, setOutputScreen] = useState(true);
  const [tab, setTab] = useState(1);

  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  // Dark theme styles
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1f1f23",
      borderColor: "#2a2a2e",
      color: "#fff",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
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
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center px-25 gap-5 justify-between">
        {/* LEFT PANEL */}
        <div className="left w-1/2 h-[80vh] bg-[#141319] mt-5 p-5 rounded-lg">
          <h3 className="sp-text mt-2 text-2xl">Ai Components Generator</h3>
          <p className="text-gray-400 mt-2">
            Generate beautiful UI components with AI assistance
          </p>

          <p className="text-15px font-semibold mt-3">
            Choice your FrameWork
          </p>

          <Select
            className="mt-4"
            options={options}
            styles={customStyles}
            placeholder="Select framework..."
          />

          <p className="text-[20px] font-semibold mt-4">
            Describe Your Components
          </p>

          <textarea
            className="w-full min-h-[250px] g-bg rounded-2xl mt-3 p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Describe the component you want to generate..."
          ></textarea>

          <div className="generate flex items-center justify-center mt-4">
            <button
              className="bg-indigo-600 flex mb-2 cursor-pointer ml-auto hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-out
hover:scale-105 hover:-translate-y-1 active:scale-95
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#141319]"
            >
              <i>
                <BsStars />
              </i>
              Generate Component
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        {/* FIX: flex column + stable height */}
        <div className="right w-1/2 h-[80vh] bg-[#141319] mt-5 p-5 rounded-lg flex flex-col">
          {outputScreen === false ? (
            <div className="skeleton w-full h-full flex items-center flex-col justify-center">
              <div className="circle flex items-center justify-center text-[35px] p-[20px] w-[70px] h-[70px] rounded-[50%] bg-gradient-to-tr from-[#545c93] to-[#b84c7b]">
                <HiOutlineCode />
              </div>
              <p className="text-gray-400 mt-4">
                Your generated component will appear here
              </p>
            </div>
          ) : (
            <>
              {/* TAB BAR */}
              <div className="top w-full h-[60px] bg-[#4d4d61] flex items-center justify-center gap-10 rounded-tl-lg rounded-tr-lg mb-4 px-3">
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
              <div className="top2 w-full h-[60px] bg-[#4d4d61] flex items-center justify-between gap-3 rounded-tl-lg rounded-tr-lg mb-4 px-3">
                <div className="left font-bold sp-text">Code Editor</div>

                <div className="right flex items-center gap-4">
                  {tab === 1 ? (
                    <>
                      <button className="copy px-3 py-2 rounded-lg border cursor-pointer border-gray-600 bg-transparent text-gray-300 transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white hover:border-indigo-500 active:scale-95">
                        <IoCopy />
                      </button>

                      <button className="export px-3 py-2 rounded-lg border cursor-pointer border-gray-600 bg-transparent text-gray-300 transition-all duration-300 ease-in-out hover:bg-emerald-600 hover:text-white hover:border-emerald-500 active:scale-95">
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="copy px-3 py-2 rounded-lg border cursor-pointer border-gray-600 bg-transparent text-gray-300 transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white hover:border-indigo-500 active:scale-95">
                        <ImNewTab />
                      </button>

                      <button className="export px-3 py-2 rounded-lg border cursor-pointer border-gray-600 bg-transparent text-gray-300 transition-all duration-300 ease-in-out hover:bg-emerald-600 hover:text-white hover:border-emerald-500 active:scale-95">
                        <FiRefreshCw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* EDITOR AREA */}
              {/* FIX: flex-1 + min-h-0 prevents collapse */}
              <div className="editor flex-1 min-h-0">
                {tab === 1 ? (
                  <Editor height="100%" theme="vs-dark" language="html" />
                ) : (
                  <div className="preview w-full h-full flex items-center justify-center bg-black text-white"></div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
