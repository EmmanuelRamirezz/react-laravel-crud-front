import { Link } from "react-router-dom";

const Error = () => {
    return(
        <div className="bg-white 0 w-6/12 mx-auto mt-20 p-12 drop-shadow-xl max-md:w-11/12">
            <h2 className="text-center text-3xl">Error 404</h2>
            <p className="my-8 text-lg text-center">The page that you requested has not been found</p>
            <Link to="/" className="bg-create w-32 text-center p-2 mx-auto my-4 block rounded-lg text-white">Return to the App</Link>
        </div>
    )
}
export default Error;