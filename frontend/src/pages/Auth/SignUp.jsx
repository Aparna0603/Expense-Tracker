﻿import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        {error && (
          <div className="text-sm text-red-600 mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Your Full Name"
              type="text"
            />
            <Input 
              value={email}
              onChange={({ target }) => setEmail(target.value)} 
              label="Email Address"  
              placeholder="john@example.com"
              type="text"
            />
            <Input 
              value={password}
              onChange={({ target }) => setPassword(target.value)} 
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Sign Up
          </button>

          <p className="text-sm mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 underline">Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;