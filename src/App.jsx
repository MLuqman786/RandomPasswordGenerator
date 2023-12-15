import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState("");

  // useRef hook
  const passwordInputRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&'*+-/=?^_`[]{|}~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPasswordUpdate(pass);
  }, [length, numberAllowed, charAllowed, setPasswordUpdate]);

  //Copy Password From Input
  const copyPasswordToClipboard = useCallback(() => {
    passwordInputRef.current?.select();
    // passwordInputRef.current.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(passwordUpdate);
  }, [passwordUpdate]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPasswordUpdate]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-11 text-orange-500 bg-gray-700 text-center">
        <h1 className="text-white text-center my-3 py-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={passwordUpdate}
            className="outline-none w-full py-1  px-3 text-gray-950"
            placeholder="Random Password"
            readOnly
            ref={passwordInputRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
