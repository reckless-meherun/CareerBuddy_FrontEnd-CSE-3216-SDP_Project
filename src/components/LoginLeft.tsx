
function LoginLeft() {
    return (
        <div className={`hidden md:flex md:w-1/2 bg-red-50 items-center justify-center p-10`}>
            <div className="text-center">
                <img
                    src="/image.png" // replace this with the path to your illustration
                    alt="Illustration"
                    className="mx-auto w-2/3"
                />
                <h2 className={`text-2xl font-semibold mt-6 text-gray-900`}>
                    The career you want is waiting
                </h2>
                <p className={`mt-4 text-gray-700`}>
                Start your search today with us because your skills deserve the best opportunities
                </p>
            </div>
        </div>
    )

}
export default LoginLeft;