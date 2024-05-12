const Newsletter = () => {
  return (
    <div className="w-full py-16 text-white px-4 ">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl dark:text-textW text-textB font-bold py-2">
            Want tips & tricks to prepare better
          </h1>
          <p className="text-purple-700">
            Sign up to our newsletter and stay up to date.
          </p>
        </div>
        <div className="my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <input
              className="p-3 flex w-full rounded-md text-black border-2 border-purple-500"
              type="email"
              placeholder="Enter Email"
            />
            <button className="bg-purple-400 hover:bg-purple-600 hover:text-textW text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3">
              Notify Me
            </button>
          </div>
          <p className="dark:text-textW text-textB">
            We care about your placement worries. Read our{" "}
            <span className="text-purple-500">Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
