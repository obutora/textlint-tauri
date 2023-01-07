import { useState } from "react";
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
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <button
        onClick={async () => {
          // const res = await fetch("http://localhost:1420/api/lint");
          // const result = await res.json();
          // console.log(result);

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
        <LexicalComposer initialConfig={editorConfig}>
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
        </LexicalComposer>
      </div>

      <p>Click on the Tauri, Next, and React logos to learn more.</p>

      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
        </div>
      </div>

      <p>{greetMsg}</p>
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
