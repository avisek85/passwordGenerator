import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const passvalue = useRef();
  const [password, setpassword] = useState("password");
  const [height, setheight] = useState(8);
  const [numberallow, setnumberallow] = useState(false);
  const [charallow, setcharallow] = useState(false);

  const generatepassword = useCallback(() => {
    console.log("generatepassword called");
    let ans = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numberallow) {
      const num = "0123456789";
      ans += num;
    }
    if (charallow) {
      ans += "!@#$%^&*(){}";
    }
    console.log("before for loop height is ", height);
    for (let i = 1; i <= height; i++) {
      console.log("inside for loop");

      let count = Math.floor(Math.random() * ans.length);
      console.log("count is ", count);
      pass += ans.charAt(count);
    }
    console.log("after for loop");
    // password = pass;
    setpassword(pass);
  }, [height, numberallow, charallow]);
  const copytoclipboard = useCallback(() => {
    passvalue.current?.select();
    passvalue.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(generatepassword, [numberallow, charallow, height]);
  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="uppercontainer">
          <input type="text" value={password} ref={passvalue} />
          <button
            // onClick={() => {
            //   passvalue.current?.select();
            //   passvalue.current?.setSelectionRange(0, 999);
            //   window.navigator.clipboard.writeText(password);
            // }}
            onClick={copytoclipboard}
          >
            copy
          </button>
        </div>
        <div>
          <input
            type="range"
            min={6}
            max={100}
            value={height}
            onChange={(e) => {
              setheight(e.target.value);
            }}
          />
          <label className="label">{height}</label>
          <label className="label">number</label>
          <input
            type="checkbox"
            onClick={() => {
              // numberallow = !numberallow;
              setnumberallow(!numberallow);
            }}
          />
          <label className="label">character</label>
          <input
            type="checkbox"
            onClick={() => {
              setcharallow(!charallow);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
