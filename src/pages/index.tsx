import { createRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import LintResult from "../interface/LintResult";

import { invoke } from "@tauri-apps/api/tauri";
import { Tooltip } from "@nextui-org/react";
import {
  getHitLintLineNumberList,
  getHitLintResultByLineNum,
} from "../usecase/LintResultUsecase";
import LintResultCard from "../component/LintResultCard";

function App() {
  const [lintResult, setLintResult] = useState<LintResult[]>([]);
  const [lineNum, setLineNum] = useState([1]);

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

  return (
    <div className="h-screen">
      {/* <button
        onClick={async () => {
          invoke("run_server").then(console.log).catch(console.error);
        }}
      >
        post
      </button> */}

      <div className="flex h-[36px] bg-indigo-50">
        {/* <button onClick={async () => {}}>tetete</button> */}
      </div>

      <div className="relative mx-auto h-[calc(100%-42px)] w-full">
        <textarea
          className="col-span-9 h-full w-full resize-none rounded-md p-8 pl-20 pb-4 
          font-sans text-lg tracking-wider text-neutral-600 antialiased
           outline-1 outline-indigo-500 focus:border-indigo-400"
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
          className="absolute top-0 left-0 h-[100%] w-16 resize-none overflow-hidden rounded-l-md bg-indigo-50 p-4 pt-8 text-right font-semibold text-neutral-500 outline-none"
          // contentEditable={false}
          ref={lineNumRef}
          // value={lineNum}
          // onChange={() => {}}
        >
          {lineNum.map((num, _) => {
            return (
              <div
                key={num.toString() + "linenum Selector"}
                className={"flex h-[28px] w-auto items-center justify-center"}
              >
                {getHitLintLineNumberList(lintResult).includes(num) ? (
                  <div
                    key={num + "line number" + "hit"}
                    ref={numRefList.current[num]}
                    className={
                      "relative rounded-xl bg-indigo-200 pr-1 font-mono hover:bg-indigo-300"
                    }
                  >
                    <Tooltip
                      content={
                        <>
                          {getHitLintResultByLineNum(lintResult, num).map(
                            (lint, index) => (
                              <LintResultCard
                                key={
                                  num.toString() +
                                  index.toString() +
                                  "lintResultCard"
                                }
                                lintResult={lint}
                              />
                            )
                          )}
                        </>
                      }
                      style={{
                        margin: "0",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "1.125rem",
                        lineHeight: "1.75rem",
                      }}
                      placement="bottomStart"
                    >
                      <p className="my-2 rounded-xl bg-indigo-200 px-1 py-0.5 text-base font-bold text-indigo-700">
                        {num}
                      </p>
                    </Tooltip>
                  </div>
                ) : (
                  <p
                    key={num + "line number"}
                    ref={numRefList.current[num]}
                    className={"text-center font-mono text-lg "}
                  >
                    {num}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
