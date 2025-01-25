import React, { useContext, useEffect, useState } from "react";
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    HtmlButton,
    Separator,
    Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "./ui/button";
import { Brain } from "lucide-react";
import { ResumeInfoContext } from "./ResumeComponents/ResumeInfoContext";
import { AIChatSession } from "@/service/AIModel";
import { toast } from "sonner";
import DOMPurify from "dompurify"; // Import DOMPurify to sanitize HTML

const PROMPT =
    "position title: {positionTitle}, Based on the position title, give me 5-7 bullet points for my experience in a resume. Please return the result in proper HTML bullet points (using <ul> and <li> tags).";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

        

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div>
            <div className="flex justify-between my-2">
                <label className="text-xs">Summary</label>

                    
            </div>
            <EditorProvider>
                <Editor
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onRichTextEditorChange(e);
                    }}
                >
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <HtmlButton />
                        <Separator />
                        <BtnStyles />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
