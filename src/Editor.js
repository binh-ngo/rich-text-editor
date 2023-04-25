import React from "react";
import clsx from "clsx";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { mergeRegister } from "@lexical/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import editorConfig from "./editorConfig";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";

function onChange(state) {
  state.read(() => {
    const root = $getRoot();
    const selection = $getSelection();

    console.log(selection);
  });
}

export const Editor = (readOnly, onChange, children) => {
  const config = {
    ...editorConfig,
    readOnly,
    editorState: (editor) => {
      if (children) {
        const editorState = editor.parseEditorState(JSON.stringify(children));
        editor.setEditorState(editorState);
    }
  }
  }
  return (
<>
      <LexicalComposer initialConfig={config} children={children}>
        <div className="editor-container">
          {!readOnly && <ToolbarPlugin />}
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input" readOnly={readOnly} />
              }
              placeholder={
                <div className="editor-placeholder">Enter some text...</div>
              }
            />
            <HistoryPlugin />
            {!readOnly && <TreeViewPlugin />}
            <AutoFocusPlugin />
            <LinkPlugin />
            <ListPlugin />
            <AutoLinkPlugin />
            <CodeHighlightPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <OnChangePlugin onChange={onChange} />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
};

// const Toolbar = () => {
//   const [editor] = useLexicalComposerContext();
//   const [isBold, setIsBold] = React.useState(false);
//   const [isItalic, setIsItalic] = React.useState(false);
//   const [isStrikethrough, setIsStrikethrough] = React.useState(false);
//   const [isUnderline, setIsUnderline] = React.useState(false);

//   const updateToolbar = React.useCallback(() => {
//     const selection = $getSelection();

//     if ($isRangeSelection(selection)) {
//       setIsBold(selection.hasFormat("bold"));
//       setIsItalic(selection.hasFormat("italic"));
//       setIsStrikethrough(selection.hasFormat("strikethrough"));
//       setIsUnderline(selection.hasFormat("underline"));
//     }
//   }, [editor]);

//   React.useEffect(() => {
//     return mergeRegister(
//       editor.registerUpdateListener(({ editorState }) => {
//         editorState.read(() => {
//           updateToolbar();
//         });
//       })
//     );
//   }, [updateToolbar, editor]);

//   return (
//     // Toolbar
//     <div className="fixed z-20 shadow left-1/2 -translate-x-1/2 min-w-52 h-10 px-2 bg-[#1b2733] space-x-2 flex items-center">
//       <button
//         className={clsx(
//           "px-1 hover:bg-gray-700 transition-colors duration-100 ease-in",
//           isBold ? "bg-gray-700" : "bg-transparent"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-bold"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>
//       <button
//         className={clsx(
//           "px-1 hover:bg-gray-700 transition-colors duration-100 ease-in",
//           isStrikethrough ? "bg-gray-700" : "bg-transparent"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-strikethrough"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>
//       <button
//         className={clsx(
//           "px-1 hover:bg-gray-700 transition-colors duration-100 ease-in",
//           isItalic ? "bg-gray-700" : "bg-transparent"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-italic"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>
//       <button
//         className={clsx(
//           "px-1 hover:bg-gray-700 transition-colors duration-100 ease-in",
//           isUnderline ? "bg-gray-700" : "bg-transparent"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-underline"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>

//       <span className="w-[1px] bg-gray-600 block h-full"></span>

//       <button
//         className={clsx(
//           "px-1 bg-transparent hover:bg-gray-700 transition-colors duration-100 ease-in"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-align-left"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>
//       <button
//         className={clsx(
//           "px-1 bg-transparent hover:bg-gray-700 transition-colors duration-100 ease-in"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-align-center"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>
//       <button
//         className={clsx(
//           "px-1 bg-transparent hover:bg-gray-700 transition-colors duration-100 ease-in"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-align-right"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>
//       <button
//         className={clsx(
//           "px-1 bg-transparent hover:bg-gray-700 transition-colors duration-100 ease-in"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-align-justify"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>

//       <span className="w-[1px] bg-gray-600 block h-full"></span>

//       <button
//         className={clsx(
//           "px-1 bg-transparent hover:bg-gray-700 transition-colors duration-100 ease-in"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(UNDO_COMMAND);
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-rotate-left"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>
//       <button
//         className={clsx(
//           "px-1 bg-transparent hover:bg-gray-700 transition-colors duration-100 ease-in"
//         )}
//         onClick={() => {
//           editor.dispatchCommand(REDO_COMMAND);
//         }}
//       >
//         <FontAwesomeIcon
//           icon="fa-solid fa-rotate-right"
//           className="text-white w-3.5 h-3.5"
//         />
//       </button>
//     </div>
//   );
// };
