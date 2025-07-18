import React, { useEffect, useRef, useState } from "react";
import {
    Html5Qrcode,
    Html5QrcodeScannerState,
    CameraDevice,
} from "html5-qrcode";
import { useListItemStore } from "../../../zustand/listItemStore";
import { getItemById, getItemList } from "../../../apis/itemAPI";

export interface BarcodeScannerProps {
    onScan?: boolean;
    setOnScan?: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

const BarcodeScanner = ({
    onScan,
    setOnScan,
    className = "",
}: BarcodeScannerProps) => {
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const isTransitioningRef = useRef(false);
    const [cameras, setCameras] = useState<CameraDevice[]>([]);
    const [currentCameraId, setCurrentCameraId] = useState<string | null>(null);
    const qrCodeRegionId = "reader";
    const [isOnScan, setIsOnScan] = useState(onScan || false);
    const lastScannedAt = useRef<number>(0);

    const startScanner = async (cameraId: string) => {
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;

        try {
            if (!html5QrCodeRef.current) {
                html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);
            } else {
                const state = html5QrCodeRef.current.getState();
                if (
                    state === Html5QrcodeScannerState.SCANNING ||
                    state === Html5QrcodeScannerState.PAUSED
                ) {
                    await html5QrCodeRef.current.stop();
                }
            }

            await html5QrCodeRef.current.start(
                cameraId,
                {
                    fps: 10,
                    qrbox: { width: 300, height: 300 },
                },
                async (decodedText) => {
                    const now = Date.now();
                    if (now - lastScannedAt.current < 1200) return;
                    lastScannedAt.current = now;

                    const item = await getItemById(decodedText);
                    if (!item) {
                        alert("Không tìm thấy sản phẩm");
                        return;
                    }

                    useListItemStore.getState().addItem({
                        id: decodedText,
                        name: item.name || "không tìm thấy",
                        brand: item.brand || "Không rõ",
                        price: item.price || 0,
                        image:
                            item.image ||
                            "https://product.hstatic.net/1000205116/product/37403542_2080234622240138_7694883310392049664_n_1024x1024.jpg",
                        category: 1,
                    });

                    setIsOnScan(false);
                    setOnScan?.(false);
                },
                () => {
                    // Silent fail
                }
            );

            setCurrentCameraId(cameraId);
        } catch (error) {
            console.error("🚫 Lỗi khi khởi động máy quét:", error);
        } finally {
            isTransitioningRef.current = false;
        }
    };

    const switchCamera = () => {
        if (cameras.length < 2 || !currentCameraId) return;

        const currentIdx = cameras.findIndex((c) => c.id === currentCameraId);
        const isFrontCamera = cameras[currentIdx]?.label.toLowerCase().includes("front");

        const nextCamera = cameras.find((cam) =>
            isFrontCamera
                ? cam.label.toLowerCase().includes("back")
                : cam.label.toLowerCase().includes("front")
        ) || cameras[(currentIdx + 1) % cameras.length];

        if (nextCamera) startScanner(nextCamera.id);
    };

    useEffect(() => {
        if (!isOnScan) return;

        Html5Qrcode.getCameras()
            .then((devices) => {
                setCameras(devices);
                if (devices.length > 0) {
                    let backCam = devices.find(
                        (d) =>
                            d.label.toLowerCase().includes("back") ||
                            d.label.toLowerCase().includes("environment")
                    );

                    if (!backCam) {
                        if (devices.length > 1) {
                            backCam = devices[devices.length - 1];
                        } else {
                            backCam = devices[0];
                        }
                    }
                    startScanner(backCam.id);
                } else {
                    alert("Không tìm thấy camera.");
                }
            })
            .catch((err) => {
                console.error("🚫 Không thể lấy danh sách camera:", err);
                alert("Không thể truy cập camera.");
            });

        return () => {
            html5QrCodeRef.current?.stop().finally(() => {
                html5QrCodeRef.current = null;
            });
        };
    }, [isOnScan]);

    return (
        <div className={`w-full h-full ${className}`}>
            {isOnScan ? (
                <div className="flex flex-col items-center justify-center w-full h-full relative">
                    <div id={qrCodeRegionId} className="relative w-full h-full rounded-lg overflow-hidden border border-gray-300">
                        {/* 4 white corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white" />
                    </div>

                    {/* Buttons */}
                    {cameras.length > 1 && (
                        <button
                            onClick={switchCamera}
                            className="absolute top-4 right-4 z-10 px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                        >
                            🔄 Đổi Camera
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setIsOnScan(false);
                            setOnScan?.(false);
                        }}
                        className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-gray-800 text-white rounded shadow hover:bg-red-600 transition"
                    >
                        ✖ Đóng
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <h2 className="text-base font-semibold mb-4 text-center">
                        Đưa mã sản phẩm vào khung hình để quét
                    </h2>
                    <div className="relative w-19/20 h-34 mt-5">
                        {/* The button */}
                        <button
                            onClick={() => {
                                setIsOnScan(true);
                                setOnScan?.(true);
                            }}
                            className="w-full h-full bg-gray-700 text-white rounded-lg flex items-center justify-center text-xl hover:bg-green-600 transition"
                        >
                            Bắt đầu quét
                        </button>

                        {/* 4 white barcode-style corners */}
                        {/* Top-left */}
                        <div className="absolute top-2 left-2 w-5 h-1 bg-white" />
                        <div className="absolute top-2 left-2 w-1 h-5 bg-white" />

                        {/* Top-2ight */}
                        <div className="absolute top-2 right-2 w-5 h-1 bg-white" />
                        <div className="absolute top-2 right-2 w-1 h-5 bg-white" />

                        {/* Bottom-left 2*/}
                        <div className="absolute bottom-2 left-2 w-5 h-1 bg-white" />
                        <div className="absolute bottom-2 left-2 w-1 h-5 bg-white" />

                        {/* Bottom-2ight */}
                        <div className="absolute bottom-2 right-2 w-5 h-1 bg-white" />
                        <div className="absolute bottom-2 right-2 w-1 h-5 bg-white" />
                    </div>

                </div>
            )}
        </div>
    );
};

export default BarcodeScanner;
