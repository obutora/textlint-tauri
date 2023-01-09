import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import editorConfig from "../editor/editorconfig";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $getSelection } from "lexical";
import ToolbarPlugin from "../editor/plugins/toolbar";
import axios from "axios";

function App() {
  const [name, setName] = useState("");

  const [lineNum, setLineNum] = useState("1");

  const numRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current.addEventListener("scroll", () => {
      numRef.current.scrollTop = editorRef.current.scrollTop;
    });
  }, []);

  return (
    <div className="container">
      <h1 className="text-4xl font-bold">Welcome to Tauri!</h1>
      <button
        onClick={async () => {
          const res = await axios.post("http://localhost:1420/api/lint", {
            inputText: `食べれる\nイカれる\nお寿司たべれる\n彼処に向かうの`,
          });
          console.log(res.data);
        }}
      >
        post
      </button>

      <u>underline</u>

      <div>
        {/* <LexicalComposer initialConfig={editorConfig}>
          <div className="editor-container">
            <ToolbarPlugin />
            <div className="editor-inner">
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <OnChangePlugin onChange={onChange} />
              <HistoryPlugin />
            </div>
          </div>
        </LexicalComposer> */}
      </div>

      <div className="relative mx-auto h-96 w-9/12">
        <textarea
          className="h-full w-full resize-none rounded-md p-4 pl-16 pb-4 outline-1 outline-indigo-500 focus:border-indigo-400"
          wrap="off"
          ref={editorRef}
          onChange={(e) => {
            const lines = e.currentTarget.value.split(/\n/).length;
            const lineNumArray = Array.from(
              Array(lines),
              (_, index) => index + 1 + `\n`
            );
            setLineNum(lineNumArray.join(""));
          }}
        ></textarea>
        <textarea
          className="absolute top-0 left-0 h-[100%] w-12 resize-none overflow-hidden rounded-l-md bg-indigo-50 p-4 pl-0 pb-4 text-right font-mono font-semibold text-neutral-500 outline-none"
          contentEditable={false}
          ref={numRef}
          value={lineNum}
        ></textarea>
      </div>

      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
        </div>
      </div>
    </div>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}

async function onChange(editorState) {
  editorState.read(async () => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    // const selection = $getSelection();

    // console.log(root, selection);
    console.log(root.__cachedText);

    const res = await axios.post("http://localhost:1420/api/lint", {
      inputText: root.__cachedText,
    });
    console.log(res.data);
  });

  const json = editorState.toJSON();
  console.log(json.root.children);
}

export default App;
