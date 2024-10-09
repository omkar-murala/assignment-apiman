"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Page() {
  const router = useRouter(); 
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; date?: string }>({
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  const [showDialog, setShowDialog] = useState(false); 
  const [submittedName, setSubmittedName] = useState(""); 

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      date: "",
    };

    const nameRegex = /^(?!.*  )(?!.*\..*\..*)(?! )[a-zA-Z\s.]+(?<! )$/;

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(name)) {
      newErrors.name = "Name can only contain letters, a single dot, and cannot have leading, trailing, or consecutive spaces.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!date) {
      newErrors.date = "Date of birth is required.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedName(name); 
      setShowDialog(true); 
    }
  };

  const handleChange = (field: string, value: string | Date | null) => {
    switch (field) {
      case 'name':
        setName(value as string);
        if (errors.name) setErrors(prev => ({ ...prev, name: "" })); 
        break;
      case 'email':
        setEmail(value as string);
        if (errors.email) setErrors(prev => ({ ...prev, email: "" })); 
        break;
      case 'phone':
        const numericValue = (value as string).replace(/[^0-9]/g, '');
        setPhone(numericValue);
        if (errors.phone) setErrors(prev => ({ ...prev, phone: "" })); 
        break;
      case 'date':
        setDate(value as Date);
        if (errors.date) setErrors(prev => ({ ...prev, date: "" })); 
        break;
      default:
        break;
    }
  };

  const handleLoginNow = () => {
    router.push("/login"); 
  };

  const handleExit = () => {
    setShowDialog(false); 
    alert("Let's meet again!"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl lg:text-2xl font-semibold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="">
              <span className="font-extralight text-sm lg:text-base">
                Enter Your Name    
              </span>
              <Input 
                className="mt-1 mb-3 w-full" 
                placeholder="Name" 
                type="text" 
                value={name} 
                onChange={(e) => handleChange('name', e.target.value)} 
              />
              {errors.name && <p className="text-red-500 text-sm lg:text-base">{errors.name}</p>}
            </label>
            <label htmlFor="">
              <span className="font-extralight text-sm lg:text-base">Enter Your Email</span>
              <Input 
                className="mb-3 w-full" 
                placeholder="Email" 
                type="email" 
                value={email} 
                onChange={(e) => handleChange('email', e.target.value)} 
              />
              {errors.email && <p className="text-red-500 text-sm lg:text-base">{errors.email}</p>}
            </label>
            <label htmlFor="">
              <span className="font-extralight text-sm lg:text-base">Enter Your Phone No.</span>
              <Input 
                id="phone" 
                className="mb-3 w-full" 
                placeholder="Phone No." 
                type="tel"  
                inputMode="numeric" 
                pattern="[0-9]*" 
                value={phone} 
                onChange={(e) => handleChange('phone', e.target.value)} 
              />
              {errors.phone && <p className="text-red-500 text-sm lg:text-base">{errors.phone}</p>}
            </label>

            <label htmlFor="">
              <span className="block font-extralight text-sm lg:text-base">Date of Birth</span>
              <DatePicker
                selected={date}
                onChange={(date) => handleChange('date', date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="Select date"
                className="mt-1 mb-3 w-full border rounded px-3 py-2"
              />
              {errors.date && <p className="text-red-500 text-sm lg:text-base">{errors.date}</p>}
            </label>

            <Button className="w-full mt-4" type="submit">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Link className="text-center text-red-500 font-medium mt-2" href={"/login"}>
            Already have an account?
          </Link>
        </CardFooter>
      </Card>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg max-w-md">
            <h2 className="text-xl lg:text-2xl font-semibold">Congratulations, {submittedName}!</h2>
            <p className="text-sm lg:text-base">You have successfully registered. Would you like to login now?</p>
            <div className="flex justify-between mt-4">
              <Button onClick={handleLoginNow} className="mr-2 w-full max-w-[150px]">
                Login Now
              </Button>
              <Button onClick={handleExit} className="w-full max-w-[150px]">
                Exit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
