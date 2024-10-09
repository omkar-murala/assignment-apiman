"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Page() {
  const [email, setEmail] = useState<string>(""); 
  const [error, setError] = useState<string>(""); 
  const [success, setSuccess] = useState<boolean>(false); 

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasComDomain = email.endsWith(".com");
    
    return regex.test(email) && hasComDomain;
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email ID with a .com domain.");
      return;
    }


    setError("");
    setSuccess(true);
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader className="text-center font-bold">Log In</CardHeader>
        <CardContent>
          <label>
            <span className="font-extralight text-sm">Enter Your Email</span>
            <Input
              placeholder="Email"
              type="email"
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="font-extralight text-sm"> Enter OTP</label>
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <div className="mt-4 text-green-500">
              Welcome {email}! You have successfully logged in.
              <div className="flex justify-center mt-2">
                <Button onClick={() => setSuccess(false)}>OK</Button>
              </div>
            </div>
          )}
          {!success && (
            <Button className="block mx-auto mt-4" onClick={handleLogin}>
              Log In
            </Button>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-center">
          <Link
            className="text-center text-red-500 font-medium"
            href={"/signup"}
          >
            Don&apos; have an account?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
