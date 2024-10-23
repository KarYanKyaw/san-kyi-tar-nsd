import React, { useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const nav = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
      setEmail("");
      setPassword("");
      localStorage.setItem("auth_passed", await account.get());
      setError(false);
      nav("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth_passed")) nav("/dashboard");
    setIsLoading(false);
  }, [loggedInUser, localStorage.getItem("auth_passed")]);

  return (
    <div className=" w-[50%] min-h-screen flex justify-center items-center mx-auto">
      <div className="">
        <div className="text-start mb-3">
          <p className="text-3xl mb-1.5 tracking-wider font-semibold">NSD</p>
          <p className="text-base tracking-wider font-medium">
            Welcome Back!
            <span className="font-normal opacity-75">
              {" "}
              Please enter details
            </span>
          </p>
        </div>
        {error && (
          <p className=" pb-3 text-red-500">
            Login Failed! Check gmail and password and try again!
          </p>
        )}
        <form disabled={isLoading} onSubmit={handleLogin}>
          <div className="space-y-6">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <Button disabled={isLoading} type="submit" className="block w-full">
              Login to account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
