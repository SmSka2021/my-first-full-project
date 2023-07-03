import { useEffect } from 'react';
import Layout from '../../components/Layout';
import ListUsers from '../../components/ListUsers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import fetchGetAllUsers from '../../redux/thunks/get-all-users';
import { isJwt } from '../../utils/utilites/decoder-jwt';
import { allUserSelector } from '../../redux/selectors/user-selector';
import { textUsers, titleUsers } from '../../utils/constants/message';
import NotFound from '../../components/NotFound';

function AllUsers() {
  const dispatchApi = useAppDispatch();
  const users = useAppSelector(allUserSelector);

  useEffect(() => {
    const fething = async () => {
      if (isJwt()) {
        await dispatchApi(fetchGetAllUsers());
      }
    };
    fething();
  }, []);

  return (
    <Layout title="Все пользователи">
      <main>
        <section className="px-10 py-5 w-full">
          <h4 className="text-xl font-bold text-blue-950 text-center">Все пользователи</h4>
          <p className="text-xm font-bold text-blue-700 text-center">* Чтобы посмотреть добрые дела, надо добавить пователя в свои друзья. </p>
          {users.length === 0 && <NotFound title={titleUsers} text={textUsers} />}
          {users.length > 0 && <ListUsers items={users} /> }
        </section>
      </main>

    </Layout>
  );
}

export default AllUsers;
