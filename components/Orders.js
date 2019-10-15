import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';
import User from './User';
import OrderItemStyles from './styles/OrderItemStyles';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;

const Orders = props => (
  <Query query={USER_ORDERS_QUERY}>
    {({ data: { orders }, loading, error }) => {
      if (error) return <Error error={error} />;
      if (loading) return <p>Loading...</p>;

      console.log(orders);
      return (
        <div>
          <h2>You have {orders.length} orders</h2>
          <OrderUl>
            {orders.map(order => (
              <OrderItemStyles key={order.id}>
                <Link
                  href={{
                    pathname: '/order',
                    query: { id: order.id },
                  }}
                >
                  <a>
                    <div className="order-meta">
                      <p>{order.items.reduce((a, b) => a + b.quantity, 0)} items</p>
                      <p>{order.items.length} products</p>
                      <p>{formatDistance(new Date(order.createdAt), new Date())}</p>
                      <p>{formatMoney(order.total)}</p>
                    </div>
                    <div className="images">
                      {order.items.map(item => (
                        <img src={item.image} key={item.id} alt={item.title} />
                      ))}
                    </div>
                  </a>
                </Link>
              </OrderItemStyles>
            ))}
          </OrderUl>
        </div>
      );
    }}
  </Query>
);

export default Orders;
