import React from "react";
import CartImage from "../asset/resource/cart.png";
import WhiteCartImage from "../asset/resource/cart_w.png";
export default function CartIcon({ className, color }: any) {
    return (
        // <div className={`w-10 h-10 cursor-pointer ${className}`}>
        <img src={color === 'white' ? WhiteCartImage : CartImage} alt="cart" className={className} />
        // </div>
    )
}