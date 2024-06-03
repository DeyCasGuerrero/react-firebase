import { ButtonProps } from "../../types/TypesProps";

const Button: React.FC<ButtonProps> = ({ text, bgColor, color, onClick }) => {

    const buttonAttributes = {
        bgColor: bgColor || 'bg-black',
        text: text,
        color: color || 'text-white',
    };


    return (
        <div className="flex justify-center">
            <button
                onClick={onClick}
                className={`${buttonAttributes.color} ${buttonAttributes.bgColor}  text-lg rounded-lg px-6 py-3 mt-4 hover:bg-gray-950 hover:text-pink-600 font-pixel font-bold tracking-widest`}>
                {buttonAttributes.text}
            </button>
        </div>
    )
}

export default Button;