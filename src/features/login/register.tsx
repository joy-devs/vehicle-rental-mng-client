
import { useForm, SubmitHandler } from "react-hook-form";
import loginApi from "../login/loginApi";
import { useNavigate } from "react-router-dom";

interface RegisterFormInputs {
  username:string;
  fullName: string;
  email: string;
  contactPhone: string;
  password: string;
  address: string;
}

const RegisterComponent = () => {
  const { register, handleSubmit, reset } = useForm<RegisterFormInputs>();
  const [registerUser, { isLoading }] = loginApi.useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data:RegisterFormInputs) => {
    try {
      await registerUser(data).unwrap();
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex flex-col min-h-full items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium leading-5 text-gray-900">
              Full Name
            </label>
            <input
              id="fullName"
              {...register("fullName", { required: true })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium leading-5 text-gray-900">
              Contact Phone
            </label>
            <input
              id="contactPhone"
              type="tel"
              {...register("contactPhone", { required: true })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium leading-5 text-gray-900">
              Address
            </label>
            <input
              id="address"
              {...register("address", { required: true })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;