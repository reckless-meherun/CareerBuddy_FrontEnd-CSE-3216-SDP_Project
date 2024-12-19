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
    const [experinceList, setExperinceList] = useState([])
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const [AIWorkSummary, setAIWorkSummary] = useState("");

    const GenerateSummaryFromAI = async () => {
        console.log("Clicked AI");
        if (!resumeInfo?.experience[index]?.title) {
            toast("Please Add Position Title");
            return;
        }
        setLoading(true);
        console.log("Response loading...");
        const prompt = PROMPT.replace(
            "{positionTitle}",
            resumeInfo.experience[index].title
        );

        try {
            const result = await AIChatSession.sendMessage(prompt);
            const rawResponse = await result.response.text();
            console.log("Raw Response:", rawResponse);

            let html = "";

            // Remove the prefix '{"bulletPoints": ' and the suffix '}'
            const trimmedResponse = rawResponse
                .replace(/^{"bulletPoints": "\s*/, "") // Remove prefix
                .replace(/"}$/, ""); // Remove suffix

            // Split into individual bullet points
            const bulletPoints = trimmedResponse
                .split("\n") // Split by line breaks
                .map((point) => point.trim()) // Trim whitespace
                .filter((point) => point); // Remove empty lines

            // Create an HTML list
            html = `<ul>${bulletPoints.map((point) => `<li>${point}</li>`).join("")}</ul>`;

            // Sanitize the HTML
            const sanitizedHtml = DOMPurify.sanitize(html);
            console.log("Sanitized HTML:", sanitizedHtml);

            // Update editor value
            setValue(sanitizedHtml);
            onRichTextEditorChange({ target: { value: sanitizedHtml } }, index);

        } catch (error) {
            console.error("Error generating AI summary:", error);
            toast("Failed to generate summary. Please try again.");
        } finally {
            setLoading(false);
            console.log("Response loaded");
        }
    };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div>
            <div className="flex justify-between my-2">
                <label className="text-xs">Summary</label>
                <Button
                    onClick={GenerateSummaryFromAI}
                    variant="outline"
                    size="sm"
                    className="flex gap-2 border-primary text-primary"
                >
                    <Brain className="h-4 w-4" />
                    Generate from AI
                </Button>
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
