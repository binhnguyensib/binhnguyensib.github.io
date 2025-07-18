import React from "react";

function formatText(text: string): string {
    // Replace **bold**
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Replace *italic*
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Replace newlines with <br />
    text = text.replace(/\n/g, "<br />");

    return text;
}

export default function MessCard({ text, className, img }: { text: string, className?: string, img?: string }) {
    const formatted = formatText(text);

    return (
        <div className="max-w-3/4 flex flex-col">
            {img && <img src={"data:image/jpeg;base64," + img} alt="Selected" className="w-32 mb-2 h-auto rounded shadow border border-gray-500" />}
            <div
                className={`w-full text-sm text-black rounded-lg px-4 py-2 border border-gray-500 shadow-md whitespace-pre-wrap ${className}`}
                dangerouslySetInnerHTML={{ __html: formatted }}
            />
        </div>
    );
}
