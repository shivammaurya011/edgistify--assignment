import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAppDispatch } from "../app/hooks";
import { clearError, registerUser } from "../features/authSlice";
import { useEffect } from "react";
import { useToast } from "../components/ToastContext";

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  const handleRegister = async (name: string, phone: string, email: string, password: string) => {
    const result = await dispatch(registerUser({ name, phone, email, password }));

    if (registerUser.fulfilled.match(result)) {
      addToast("Registration successful! Please log in.", "success");
      const redirectTo = location.state?.from?.pathname || "/login";
      navigate(redirectTo);
    } else {
      addToast("Registration failed. Please try again.", "error");
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

        {/* Branding */}
        <div className="md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-10 md:py-0">
            <h1 className="text-5xl font-extrabold mb-4">Edgistify</h1>
            <p className="text-lg text-center max-w-md leading-relaxed">
                Your one-stop online store for the best deals on quality products.  
                Shop smarter, shop better, only on Edgistify.
            </p>
        </div>

      {/* Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 px-6">
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
      
    </div>
  );
}

export default Register;