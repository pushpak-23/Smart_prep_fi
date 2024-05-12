const RedirectButton = ({ url, text }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 mb-4 px-2">
      <button
        onClick={handleClick}
        className={`w-full h-20 flex items-center justify-center rounded-lg p-4 drop-shadow-lg hover:drop-shadow-xl border-t-2 
        border-b-2 border-purple-500 bg-whiteBg2 dark:bg-darkBg `}
      >
        <span
          className={`text-xl font-semibold dark:text-fuchsia-300 text-fuchsia-700  dark:hover:text-fuchsia-700 hover:text-fuchsia-300 rounded-md p-2`}
        >
          {text}
        </span>
      </button>
    </div>
  );
};

export default RedirectButton;
