import { createRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import LintResult from "../interface/LintResult";

import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [lintResult, setLintResult] = useState<LintResult[]>([]);
  const [lineNum, setLineNum] = useState([1]);

  // const numRef = useRef(null);
  const lineNumRef = useRef(null);
  const editorRef = useRef(null);

  const numRefList = useRef([]);

  //エディタとLinuNumberのスクロールを連動させる
  useEffect(() => {
    editorRef.current.addEventListener("scroll", () => {
      lineNumRef.current.scrollTop = editorRef.current.scrollTop;
    });
  }, []);

  //サーバーを起動する
  useEffect(() => {
    invoke("run_server").then(console.log).catch(console.error);
  }, []);

  function getHitLintLineNumberList() {
    const hitLintLineNumberList = lintResult.map((lint) => lint.line);
    return hitLintLineNumberList;
  }

  return (
    <div className="container">
      {/* <button
        onClick={async () => {
          invoke("run_server").then(console.log).catch(console.error);
        }}
      >
        post
      </button> */}

      <div className="relative mx-auto mt-8 h-96 w-full">
        <textarea
          className="col-span-9 h-full w-full resize-none rounded-md p-4 pl-20 pb-4 outline-1 outline-indigo-500 focus:border-indigo-400"
          wrap="off"
          ref={editorRef}
          onChange={async (e) => {
            const lines = e.currentTarget.value.split(/\n/).length;
            const lineNumArray = Array.from(
              Array(lines),
              // (_, index) => index + 1 + `\n`
              (_, index) => index + 1
            );
            // setLineNum(lineNumArray.join(""));
            setLineNum(lineNumArray);

            lineNumArray.forEach((num, index) => {
              numRefList.current[index] = createRef();
            });

            //create ref

            // const res = await axios.post("http://localhost:1420/api/lint", {
            //   inputText: e.currentTarget.value,
            // });
            const res = await axios.post("http://localhost:4237/", {
              lint: e.currentTarget.value,
            });

            console.log(res.data);

            const result = res.data as LintResult[];
            // console.log(result);
            setLintResult(result);
          }}
        ></textarea>
        <div
          className="absolute top-0 left-0 h-[100%] w-16 resize-none overflow-hidden rounded-l-md bg-indigo-50 p-4 text-right font-mono font-semibold text-neutral-500 outline-none"
          // contentEditable={false}
          ref={lineNumRef}
          // value={lineNum}
          // onChange={() => {}}
        >
          {lineNum.map((num, _) => {
            return (
              <div>
                {getHitLintLineNumberList().includes(num) ? (
                  <div
                    key={num + "line number" + "hit"}
                    ref={numRefList.current[num]}
                    className={
                      "font-bold text-teal-600 underline underline-offset-2"
                    }
                  >
                    {num}
                  </div>
                ) : (
                  <p key={num + "line number"} ref={numRefList.current[num]}>
                    {num}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="lint-card grid w-full grid-cols-3 gap-4">
          {lintResult != undefined ? (
            lintResult.map((lint, index) => {
              return (
                <div
                  key={
                    lint.column.toString() +
                    lint.index.toString() +
                    index.toString()
                  }
                  className={
                    "flex items-center rounded-lg border border-indigo-200 bg-white shadow-md shadow-indigo-50"
                  }
                >
                  <div className="mb-2 p-2">
                    <p className="mb-1 rounded-sm bg-indigo-50 p-1 text-sm text-indigo-700">{`${lint.line}行目`}</p>
                    <p className="rounded-sm bg-indigo-50 p-1 text-sm text-indigo-700">{`${lint.index}-${lint.column}文字目`}</p>
                  </div>
                  <p className="ml-2 text-sm">{lint.message}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
