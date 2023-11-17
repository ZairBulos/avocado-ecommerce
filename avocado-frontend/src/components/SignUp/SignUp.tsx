import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md sm:lg-80 lg:w-96 rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <input type="email" name="email" id="email" placeholder="email@example.com" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <input type="password" name="password" id="password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-brown-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brown-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign Up</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link to="/sign-in" className="ms-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
