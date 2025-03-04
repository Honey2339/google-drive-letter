const GoogleCard = () => {
  const handleClick = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  return (
    <div className="w-80 mx-auto bg-zinc-800 rounded-xl shadow-lg overflow-hidden border border-zinc-600">
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">Welcome</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue to the application
          </p>
        </div>

        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-white/70 cursor-pointer border border-gray-700 rounded-lg py-3 px-4 text-black  transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="#EA4335"
              d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
            />
            <path
              fill="#34A853"
              d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
            />
            <path
              fill="#4A90E2"
              d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
            />
            <path
              fill="#FBBC05"
              d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
            />
          </svg>
          <span className="font-medium">Sign in with Google</span>
        </button>

        <p className="text-center text-xs text-gray-500 mt-2">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default GoogleCard;
