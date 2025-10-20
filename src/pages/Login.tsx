// src/pages/Login.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../components/FireBase";
import { useAuth } from "../components/AuthContext";

export const Login = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(t("login-page.loginError"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-bg-dark text-text-main min-h-screen flex flex-col items-center justify-center">
      <div className="bg-bg-card border border-bg-border rounded-lg shadow-lg p-8 max-w-md w-full">
        {!user ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
              {t("login-page.login-title")}
            </h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder={t("login-page.email") || "Email"}
                className="w-full p-2 rounded-md border border-bg-border bg-bg-dark text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder={t("login-page.password") || "Password"}
                className="w-full p-2 rounded-md border border-bg-border bg-bg-dark text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 mt-2 rounded-md bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
              >
                {loading ? t("login-page.loggingIn") || "Logging in..." : t("login-page.login-title")}
              </button>
            </form>

            {error && <p className="text-red-400 mt-4">{error}</p>}
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">
              {t("login-page.welcomeBack")}, {user.email}
            </h1>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
            >
              {t("login-page.logout")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
