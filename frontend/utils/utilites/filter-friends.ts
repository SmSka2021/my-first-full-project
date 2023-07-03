/* eslint-disable max-len */
import { UserFull } from '../../interfaces/interfaces';
import { getIdUser } from './decoder-jwt';

const filterFriends = (arrAllUsers: UserFull[]) => arrAllUsers.filter((user) => user.friends.includes(getIdUser()));
export default filterFriends;
