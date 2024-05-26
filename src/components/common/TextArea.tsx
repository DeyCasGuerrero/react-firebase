import { TextAreaProps } from "../../types/TypesProps";

const TextArea: React.FC<TextAreaProps> = ({ label, name, bgColor, row, placeholder, onChange ,value}) => {

    const TxtAreaAttributes = {
        name: name,
        label: label,
        bgColor: bgColor,
        row: row,
        placeholder: placeholder,
        onChange: onChange,
        value:value,
    }

    return (
        <div className=" bg-black flex flex-col items-center w-full justify-center mt-4 p-4 rounded-md">
            <label className="font-pixel text-white text-2xl">{TxtAreaAttributes.label}</label>
            <div className="w-full max-w-md p-4 ">
                <textarea
                    className="w-full h-32 bg-transparent text-white placeholder-gray-400 border border-gray-400
                        rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-gray-300"
                    placeholder={TxtAreaAttributes.placeholder}
                    name={TxtAreaAttributes.name}
                    rows={TxtAreaAttributes.row}
                    onChange={TxtAreaAttributes.onChange}
                    value={TxtAreaAttributes.value}

                >

                </textarea>
            </div>
        </div>
    )
}

export default TextArea;