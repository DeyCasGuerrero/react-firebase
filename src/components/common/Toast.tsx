import { toast } from 'sonner';

const Toast = () => {
    return (
        toast(
            <div className='p-2 text-green-500 font-bold '>
                Envio Correctamente
            </div>,
            {
                position: 'top-right',
                duration: 3000,
            },

        )
    )
}

export default Toast