// src/pages/Register.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/FireBase";
import { doc, setDoc } from "firebase/firestore";

export const Register = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        badges: [],
        progress: {},
        createdAt: new Date(),
      });

      setSuccess(true);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(t("register-page.registerError") || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-bg-dark text-text-main min-h-screen flex flex-col items-center justify-center">
      <div className="bg-bg-card border border-bg-border rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
          {t("register-page.register")}
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder={t("register-page.email") || "Email"}
            className="w-full p-2 rounded-md border border-bg-border bg-bg-dark text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder={t("register-page.password") || "Password"}
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
            {loading ? t("register-page.creatingAccount") || "Creating..." : t("register-page.register")}
          </button>
        </form>

        {error && <p className="text-red-400 mt-4">{error}</p>}
        {success && <p className="text-green-400 mt-4">{t("register-page.registerSuccess") || "✅ Account created!"}</p>}
      </div>
    </div>
  );
};
