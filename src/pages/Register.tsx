import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../components/FireBase";
import { useTranslation } from "react-i18next";

export const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
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
          {t('register-page.register')}
        </h1>
        {error && <p className="text-error mb-3">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder={t('register-page.name')}
            className="w-full mb-4 p-2 border rounded-md text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder={t('register-page.email')}
            className="w-full mb-4 p-2 border rounded-md text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={t('register-page.password')}
            className="w-full mb-4 p-2 border rounded-md text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 rounded-md bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
            disabled={loading}
          >
            {loading ? t('register-page.creatingAccount') : t('register-page.register')}
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full py-2 px-4 mt-4 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
        >
          {t('register-page.google')}
        </button>

        <p className="text-text-secondary mt-4 text-center">
          {t('register-page.hint')}{" "}
          <Link to="/login" className="text-primary hover:underline">
            {t('register-page.login')}
          </Link>
        </p>
      </div>
    </div>
  );
};
