import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { friendSelector } from '../../redux/selectors/user-selector';
import fetchGetUserByNick from '../../redux/thunks/get-user-by-nick';
import TodoFriend from '../../components/TodoFriend';
import icon from '../../public/assets/img/men.png';

function FriendPage() {
  const { asPath } = useRouter();
  const [userNick, setUserNick] = useState('');
  const friend = useAppSelector(friendSelector);
  const dispatchApi = useAppDispatch();

  useEffect(() => {
    setUserNick(asPath.slice(7));
  }, []);

  useEffect(() => {
    const getFriend = async () => {
      await dispatchApi(fetchGetUserByNick(userNick));
    };
    if (userNick) getFriend();
  }, [userNick]);

  return (
    <Layout title="Дела друга">
      <main>
        <section className="py-[20px] px-10">
          <h4 className="text-xl font-bold text-blue-950 text-center">Добрые дела моего друга</h4>
          <div className="flex justify-center mb-3 mt-2 items-end">
            <img className="w-7 h-7 mr-2" src={icon.src} alt="icon" />
            <p className=" text-[16px] self-end font-bold text-blue-900 text-center mb-0">{friend.nickName}</p>
          </div>
          {friend.name && <TodoFriend friendTodo={friend.tasks} />}
        </section>
      </main>
    </Layout>
  );
}

export default FriendPage;
