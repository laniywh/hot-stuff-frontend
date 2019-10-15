import Link from 'next/link';
import PleaseSignIn from '../components/PleaseSignIn';
import Orders from '../components/Orders';

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <Orders />
    </PleaseSignIn>
  </div>
);

export default OrdersPage;
