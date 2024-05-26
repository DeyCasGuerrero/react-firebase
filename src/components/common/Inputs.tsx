import { InputProps } from "../../types/TypesProps";

const Inputs: React.FC<InputProps> = ({ bgColor, label, name, onChange, placeholder, type ,value}) => {

    const inputAttributes = {
        bgColor: bgColor || 'bg-black',
        label: label,
        name: name,
        onChange: onChange,
        placeholder: placeholder,
        type: type || 'text',
        value:value,
    };

    return (
        <div className={`${inputAttributes.bgColor} p-4 rounded-xl mt-4`}>
            <div>
                <label className="text-white font-pixel text-2xl">{inputAttributes.label}</label>
            </div>
            <div className="mt-2">
                <input
                    type={inputAttributes.type}
                    name={inputAttributes.name}
                    placeholder={inputAttributes.placeholder}
                    onChange={inputAttributes.onChange}
                    value={inputAttributes.value}
                    className="w-full rounded-md p-1 py-1.5 px-2 font-pixel text-lg ring-inset ring-gray-400 focus:text-gray-800 focus:outline-none focus:ring-0"
                />
            </div>
        </div>
    )

}
export default Inputs;