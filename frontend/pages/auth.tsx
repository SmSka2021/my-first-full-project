import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import {
  isAuthSelector,
  isShowAuthSelector,
} from '../redux/selectors/user-selector';
import { USER } from '../utils/constants/path';
import Layout from '../components/Layout';
import { isAuth } from '../utils/utilites/decoder-jwt';
import Auth from '../components/Auth';
import Registration from '../components/Registration';

function PageAuth() {
  const isAuthState = useAppSelector(isAuthSelector);
  const isShowAuth = useAppSelector(isShowAuthSelector);
  const isAuthUser = isAuthState || isAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthUser) router.push(USER);
  }, [isAuthUser]);

  return (
    <Layout title="Регистрация">
      <main className="main-auth flex justify-center items-center fone-auth">
        <div className="w-80 mx-auto my-0">
          {isShowAuth ? <Auth /> : <Registration type="create" closeForm={() => {}} />}
        </div>
      </main>
    </Layout>
  );
}

export default PageAuth;
