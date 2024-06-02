import { SVGProps } from "react";

export interface InputProps{
    label: string;
    type: string;
    name:string;
    bgColor?:string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string;

}

export interface TextAreaProps{
    label: string;
    name:string;
    bgColor?:string;
    row : number;
    placeholder:string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
}

export interface SvgIconsProps extends SVGProps<SVGSVGElement> {
    size?: number;
    color?: string;
}