
export interface History {
    role: string;
    text: string;
    img: string | null | undefined | "";
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBlBm9C9ZAT_yStMYlCaKa8feNjDNsY9IM`;

export const postNewText = async (history: History[]) => {
    let history_ = history.map((item) => {
        return {
            role: item.role,
            parts: [{ text: item.text }],
        };
    });
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contents: history_ }),
        });
        return response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};
// imageCaptionAPI.ts
export const captionImageFromFile = (file?: File | undefined | null, message?: string, history?: History[]): Promise<string> => {
    if (!file) return Promise.resolve("No image or message provided");
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = async () => {
            try {
                const base64Image = reader.result?.toString().split(",")[1]; // Remove prefix
                if (!base64Image) return reject("Failed to read image data");

                const body = {
                    contents: [
                        {
                            parts: [
                                {
                                    inline_data: {
                                        mime_type: file.type,
                                        data: base64Image,
                                    },
                                },
                                { text: message },
                            ],
                        },
                    ],
                };

                const response = await fetch(
                    API_URL,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body),
                    }
                );

                const result = await response.json();
                resolve(result || "No found.");
            } catch (err) {
                reject("Failed to generate caption.");
            }
        };

        reader.onerror = () => reject("File reading error.");
        reader.readAsDataURL(file);
    });
};

export const genImageAndText = async (history: History[]) => {
    const history_ = history.map((item) => {
        const parts: any[] = [];

        if (item.text) {
            parts.push({ text: item.text });
        }

        if (item.img) {
            // Clean base64 string (remove prefix if any)
            const matches = item.img.match(/^data:(.+);base64,(.+)$/);
            let mime_type = "image/png";
            let base64Data = item.img;

            if (matches) {
                mime_type = matches[1];
                base64Data = matches[2];
            }

            parts.push({
                inline_data: {
                    mime_type,
                    data: base64Data,
                },
            });
        }

        return {
            role: item.role,
            parts,
        };
    });

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contents: history_ }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`❌ API error: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error calling genImageAndText:", error);
        throw error;
    }
};
