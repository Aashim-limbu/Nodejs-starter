import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "../utils/apis";
import { FcGoogle } from "react-icons/fc";
import ErrorPage from "./ErrorPage";
import Logo from "../assets/Travel.svg";
export default function SignIn() {
	const navigate = useNavigate();
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			const response = await apis.post("/users/signin", {
				email,
				password,
			});
			// const { role, token } = response.data;
			const { role } = response.data;
			// sessionStorage.setItem("token", token);
			sessionStorage.setItem("auth", role);
			navigate("/dashboard", { replace: true });
		} catch (error) {
			<ErrorPage />;
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<div className="flex justify-center">
						<img src={Logo} alt="logo" width={"80px"} />
					</div>

					<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form className="space-y-6" onSubmit={handleSubmit} method="POST">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										ref={emailRef}
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										ref={passwordRef}
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="text-sm leading-6">
									<a
										href="#"
										className="font-semibold text-indigo-600 hover:text-indigo-500"
									>
										Forgot password?
									</a>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Sign in
								</button>
							</div>
						</form>

						<div>
							<div className="relative mt-10">
								<div
									className="absolute inset-0 flex items-center"
									aria-hidden="true"
								>
									<div className="w-full border-t border-gray-200" />
								</div>
								<div className="relative flex justify-center text-sm font-medium leading-6">
									<span className="bg-white px-6 text-gray-900">
										Or continue with
									</span>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-1 gap-4">
								<a
									href="#"
									className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0]/75 px-3 py-1.5 hover:bg-[#1D9BF0] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
								>
									<FcGoogle />
									<span className="text-sm font-semibold leading-6">
										Sign in With Google
									</span>
								</a>
							</div>
						</div>
					</div>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<a
							href="#"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Sign Up
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
