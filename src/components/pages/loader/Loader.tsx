
import "./Loader.css";

const LoaderComponent = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="loader">
                <div data-glitch="Loading..." className="glitch">Loading...</div>
            </div>
        </div>
    )
}

export default LoaderComponent;