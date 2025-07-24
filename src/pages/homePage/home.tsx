import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../asset/resource/AEON_MALL_corporate_logo.png";
import CartIcon from "../../components/cartIcon";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useListItemStore } from "../../zustand/listItemStore";
import i18n from "../../i18n";
export default function Home() {
    const navigate = useNavigate();
    const { changeLanguage, language } = useListItemStore();
    const handleLanguage = (language: string) => {
        changeLanguage(language);
        i18n.changeLanguage(language);
    };
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="mb-5 -top-5">
                <img src={Logo} alt="logo" width={300} height={300} />
            </div>
            <Button
                variant="contained"
                onClick={() => navigate("/create")}
                className="!mt-5 !px-4 !py-2 !rounded-lg !shadow-sm !flex !items-center !justify-center !bg-pink-400 !text-white hover:!bg-pink-500 transition border border-gray-400"
                startIcon={<CartIcon className="w-6 h-6" color="white" />}
            >
                {i18n.t("home.buyButton")}
            </Button>
            <FormControl
                className="!mt-5 !rounded-lg !shadow-sm !border !border-gray-400"
                sx={{
                    backgroundColor: '#ffc0cb', // màu hồng nhạt
                    color: 'black',
                    '& .MuiInputLabel-root': { color: 'black', fontWeight: 600 },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                }}
            >
                <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={language || ""}
                    displayEmpty
                    renderValue={(selected) => {
                        if (!selected) {
                            return <span style={{ color: "#555" }}>{i18n.t("home.language")}</span>;
                        }
                        return selected === "vi" ? i18n.t("home.option1") : i18n.t("home.option2");
                    }}
                    onChange={(e) => handleLanguage(e.target.value)}
                    sx={{
                        backgroundColor: '#ffc0cb',
                        '& .MuiSelect-icon': { color: 'black' }
                    }}
                >
                    <MenuItem disabled value="">
                        {i18n.t("home.language")}
                    </MenuItem>
                    <MenuItem value="vi">
                        <input
                            type="radio"
                            checked={language === 'vi'}
                            readOnly
                            style={{ marginRight: 8 }}
                        />
                        {i18n.t("home.option1")}
                    </MenuItem>
                    <MenuItem value="en">
                        <input
                            type="radio"
                            checked={language === 'en'}
                            readOnly
                            style={{ marginRight: 8 }}
                        />
                        {i18n.t("home.option2")}
                    </MenuItem>
                </Select>
            </FormControl>

        </div>
    )
}