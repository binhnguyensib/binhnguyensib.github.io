import React, { useEffect, useRef, useState } from "react";
import { captionImageFromFile, genImageAndText, History, postNewText } from "../../apis/aiAPI";
import MessCard from "./components/messCard";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Robot from "../../asset/resource/robot2.png";
import i18n from "../../i18n";
declare global {
    interface Window {
        botpressWebChat?: {
            sendEvent: (event: { type: string }) => void;
            configure?: (config: Record<string, any>) => void;
        };
    }
}

const handleMess = (mess: string): string => {
    return mess.replace(/<[^>]*>?/gm, '');
}

export default function Assistant() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [typingText, setTypingText] = useState("");
    const [paused, setPaused] = useState(false);
    const pausedRef = useRef(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [history, setHistory] = useState<History[]>([
        {
            role: "user",
            text: "Đối với các câu hỏi về thực đơn hay cách làm chỉ trả lời về nguyên liệu và số lượng",
            img: null
        },
        {
            role: "model",
            text: "Đã rõ. Tôi sẽ chỉ cung cấp thông tin về nguyên liệu và số lượng cho các câu hỏi liên quan đến thực đơn hoặc cách làm.",
            img: null
        },
        {
            role: "user",
            text:"Đối với các tin nhắn như \"xin chào\", hay đại khái là lời chào thì bạn hãy trả lời bằng câu này nhé: Dạ em chào cô chú anh chị nhaaaa 🥰 em có thể giúp được gì cho mọi người ạ?.",
            img: null
        },
        {
            role: "model",
            text: "Dạ rõ, em đã hiểu rồi ạaaaa",
            img: null
        },
        {
            role: "user",
            text:"Khi trả lời các câu hỏi, em hãy thêm các icon để thể hiện sự lễ phép và để câu trả lời thêm sinh động hơn nhé!",
            img: null
        },
        {
            role: "model",
            text: "Dạ rõ, em đã hiểu rồi ạaaaa🥰",
            img: null
        },
        {
            role: "user",
            text:"Em hãy đặt bản thân mình là một trợ lý mua sắm cho khách hàng tham quan, mua sắm ở các Aeon Mall nhé!",
            img: null
        },
        {
            role: "model",
            text: "Dạ rõ, Emon đã hiểu rồi ạaaaa🥰",
            img: null
        },
        {
            role: "user",
            text:"Khi khách hàng đặt câu hỏi bằng tiếng Anh, em hãy trả lời bằng tiếng Anh nhé!",
            img: null
        },
        {
            role: "model",
            text: "Dạ rõ, Emon đã hiểu rồi ạaaaa🥰",
            img: null
        }


    ]);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, typingText, loading]);

    const togglePaused = () => {
        pausedRef.current = true;
        setPaused(true);
        setLoading(false);
    };

    const handleSendMessage = async (message: string) => {
        if (!message.trim()) return;
        const newHistory = [...history, { role: "user", text: message, img: imagePreview }];
        setHistory(prev => [...prev, { role: "user", text: message, img: imagePreview }]);
        setImagePreview(null);
        setText("");
        setLoading(true);
        setTypingText("");
        setPaused(false);
        pausedRef.current = false;
        const isImage = imageFile != null;
        try {

            setHistory(prev => [...prev, { role: "model", text: "Loading...", img: null }]);

            let res = null;
            if (!isImage) {
                res = await postNewText(newHistory);
            } else {
                res = await genImageAndText(newHistory);
                // res = await captionImageFromFile(imageFile, message);
            }
            const fullText = res.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi không hiểu yêu cầu.";
            // Remove "Loading..."
            setHistory(prev => prev.filter(msg => !(msg.role === "model" && msg.text === "Loading...")));

            let current = "";
            for (let i = 0; i < fullText.length; i++) {
                if (pausedRef.current) {
                    setTypingText("");
                    setHistory(prev => [...prev, { role: "model", text: current, img: null }]);
                    setLoading(false);
                    setImagePreview(null);
                    setImageFile(null);
                    return;
                }
                current += fullText[i];
                setTypingText(current);
                await new Promise(resolve => setTimeout(resolve, 5));
            }

            setTypingText("");
            setHistory(prev => [...prev, { role: "model", text: fullText, img: null }]);
        } catch (err) {
            setHistory(prev => [...prev, { role: "model", text: "❌ Đã xảy ra lỗi khi gửi yêu cầu.", img: null }]);
        } finally {
            setTypingText("");
            setLoading(false);
            pausedRef.current = false;
            setPaused(false);
        }
    };
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = (reader.result as string).split(",")[1];
                setImagePreview(base64);
            };
            reader.readAsDataURL(file); // ✅ this line was missing
        }
    };
    const handleSendOrPause = () => {
        if (loading && typingText) {
            togglePaused();
        } else {
            handleSendMessage(text);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-around">
            <div className="w-3/4">

                <p className="text-lg font-bold py-2 flex flex-row justify-around items-center gap-2"><div></div>{i18n.t("assistant.header")} <img src={Robot} alt="Robot" width={40} height={40} /></p>
                <hr className="border-gray-500 w-3/4 px-0 py-0 my-0 w-full" />
            </div>
            {/* {history.length === 0 && <p className="text-sm text-gray-500">Bạn cần hỗ trợ gì hôm nay?</p>} */}

            <div className="flex flex-col w-full mx-3 px-3 min-h-3/5 max-h-18/20 overflow-y-auto">
                {history.filter((_, idx) => idx > 9).map((item, index) => (
                    <div
                        key={index}
                        className={`w-full my-2 flex flex-row ${item.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <MessCard
                            img={item.img || ""}
                            text={item.text}
                            className={item.role === "user" ? "bg-gray-300" : "bg-white"}
                        />
                    </div>
                ))}

                {/* Typing simulation */}
                {typingText && (
                    <div className="w-full my-2 flex flex-row justify-start">
                        <MessCard text={typingText} className="bg-white" />
                    </div>
                )}

                <div ref={bottomRef}></div>
            </div>
            {imagePreview && <img
                src={imagePreview ? `data:image/jpeg;base64,${imagePreview}` : ""}
                alt="Selected"
                className="w-32 h-auto rounded shadow"
            />}
            <div className="flex flex-row items-center justify-center mt-4 w-full">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendOrPause();
                    }}
                    className="mx-2 w-8/10 px-3 py-2 rounded-full border border-gray-500 outline-none flex justify-center items-center"
                    placeholder={i18n.t("assistant.body.placeholder")}
                    disabled={loading && typingText !== ""}
                />
                <label htmlFor="nscnnkam" className="cursor-pointer mr-2">
                    <Button
                        component="span" // Important when wrapping file inputs
                        variant="outlined"
                        sx={{
                            minWidth: 0,
                            width: 40,
                            height: 40,
                            padding: 0,
                            borderRadius: "50%",
                            borderColor: "#888",
                            color: "#666",
                            "&:hover": {
                                borderColor: "#555",
                                color: "#333"
                            }
                        }}
                    >
                        📷
                    </Button>
                </label>

                <input
                    id="nscnnkam"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                />
                <Button
                    onClick={handleSendOrPause}
                    variant="contained"
                    sx={{
                        bgcolor: paused ? "#1976d2" : loading ? "#999" : "#e464bc",
                        minWidth: 0,
                        width: 40,
                        height: 40,
                        padding: 0,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                            bgcolor: paused ? "#1565c0" : loading ? "#888" : "#c3399a",
                        },
                        "&:focus": {
                            bgcolor: paused ? "#0d47a1" : "#b63383",
                        },
                    }}
                >
                    {loading && typingText !== "" ? "⏸" : <SendIcon fontSize="small" />}
                </Button>
            </div>
        </div>
    );
}
