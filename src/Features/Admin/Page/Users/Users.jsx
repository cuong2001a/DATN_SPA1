import { lazy, Fragment } from 'react';
const ListUser = lazy(() => import('./ListUser.jsx'));

const Users = () => {
  return (
    <Fragment>
      <ListUser />
    </Fragment>
  );
};

export default Users;
