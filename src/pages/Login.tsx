// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../components/FireBase";
import { useAuth } from "../components/AuthContext";

export const Login = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-bg-dark text-text-main min-h-screen flex flex-col items-center justify-center">
      <div className="bg-bg-card border border-bg-border rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
          {t('login-page.login-title')}
        </h1>
        {error && <p className="text-error mb-3">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={t('login-page.email')}
            className="w-full mb-4 p-2 border rounded-md text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={t('login-page.password')}
            className="w-full mb-4 p-2 border rounded-md text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 rounded-md bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
            disabled={loading}
          >
            {loading ? t('login-page.loggingIn') : t('login-page.login-title')}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 px-4 mt-4 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
        >
          {t('login-page.google')}
        </button>

        <p className="text-text-secondary mt-4 text-center">
          {t('login-page.hint')}{" "}
          <Link to="/register" className="text-primary hover:underline">
            {t('login-page.create_account')}
          </Link>
        </p>
      </div>
    </div>
  );
};
