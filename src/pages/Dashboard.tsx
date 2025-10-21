import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../components/FireBase";
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
        {t('dashboard-page.welcome')} {user?.displayName || user?.email}!
      </h1>
      <p className="text-text-secondary mb-6">{t('dashboard-page.message')}</p>
      <button
        onClick={handleLogout}
        className="py-2 px-4 rounded-md bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
      >
        {t('dashboard-page.logout')}
      </button>
    </div>
  );
};
