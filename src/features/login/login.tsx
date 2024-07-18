import React, { useState } from "react";
import { useForm } from "react-hook-form";
import loginApi from "./loginApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Auth/authSlice";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

type FormValues = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = loginApi.useLoginUserMutation();
  const { register, handleSubmit } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await loginUser(data).unwrap();
      console.log("API Response:", response);
      if (response) {
        console.log("response received");
        dispatch(setCredentials({ user: response, token: response.token }));
        toast.success("Logged in successfully");
        console.log("User role:", response.user.role);
        if (response.user.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/userdashboard");
        }
      } else {
        toast.error("Failed to login: Invalid response from server");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      toast.error(
        "Failed to login: " +
          (err.data?.msg || err.error || err.message || String(err))
      );
    } finally {
      setLoading(false);
    }
  };

  // Register the form inputs here, outside of the action dispatch
  const usernameInput = register("username", { required: true });
  const passwordInput = register("password", { required: true });

  return (
    <div className="flex flex-col min-h-screen bg-red-100">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-black font-bold">Login now</h1>
            <p className="py-6 text-black">
              Welcome to Elite Rides Rental Management System. Manage your
              bookings, view vehicle options, and access your account settings
              seamlessly. Please log in to continue.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered"
                  {...usernameInput}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...passwordInput}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? (
                    <ScaleLoader color="#0000ff" loading={true} height={20} />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Elite Rides Rental Management System. All rights reserved.</p>
        <p>Contact us: lilian@example.com | +1234567890</p>
      </footer>
    </div>
  );
};

export default Login;
