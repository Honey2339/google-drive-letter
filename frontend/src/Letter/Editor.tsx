import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-100 border-b border-gray-300 shadow-sm sticky top-0 z-10">
      {[
        {
          action: () => editor.chain().focus().toggleBold().run(),
          label: "Bold",
          active: editor.isActive("bold"),
        },
        {
          action: () => editor.chain().focus().toggleItalic().run(),
          label: "Italic",
          active: editor.isActive("italic"),
        },
        {
          action: () => editor.chain().focus().toggleStrike().run(),
          label: "Strike",
          active: editor.isActive("strike"),
        },
        {
          action: () => editor.chain().focus().setParagraph().run(),
          label: "Paragraph",
          active: editor.isActive("paragraph"),
        },
        {
          action: () => editor.chain().focus().toggleOrderedList().run(),
          label: "Ordered List",
          active: editor.isActive("orderedList"),
        },
        {
          action: () => editor.chain().focus().setColor("#958DF1").run(),
          label: "Purple",
          active: editor.isActive("textStyle", { color: "#958DF1" }),
        },
      ].map(({ action, label, active }, index) => (
        <button
          key={index}
          onClick={action}
          className={`px-3 py-1 text-sm font-medium border rounded-md transition-colors ${
            active ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const EditorContent = ({ onContentChange }: any) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        const content = editor.getHTML();
        // console.log("Editor content updated:", content);
        onContentChange(content);
      });
    }

    return () => {
      if (editor) {
        editor.off("update");
      }
    };
  }, [editor, onContentChange]);

  return <div className="p-4 prose max-w-none bg-white rounded-b-md"></div>;
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
];

const initialContent = `<h2>Hi there,</h2><p>Please write your letter</p>`;

export default function Editor({ letter, setLetter }: any) {
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState(initialContent);

  const saveLetter = async () => {
    setLetter(editorContent);
    console.log("Saving content:", editorContent);

    try {
      const response = await fetch("http://localhost:5000/save-letter", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content: editorContent }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Letter saved successfully!");
      } else {
        alert(`Failed to save: ${data.message}`);
      }
    } catch (error) {
      console.error("Error saving letter:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 border bg-white border-gray-300 rounded-md shadow-lg">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={initialContent}
      >
        <EditorContent onContentChange={setEditorContent} />
      </EditorProvider>
      <div className="p-4">
        <input
          type="text"
          placeholder="Enter letter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 px-3 py-2 border rounded w-full"
        />
        <button
          onClick={saveLetter}
          className="bg-blue-500 z-10 transition duration-200 hover:bg-blue-600 ml-2 mb-2 px-5 py-2 rounded-sm text-white font-semibold cursor-pointer"
        >
          Save Letter
        </button>
      </div>
    </div>
  );
}
