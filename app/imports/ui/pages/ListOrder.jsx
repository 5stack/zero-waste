import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Customers } from '../../api/customer/Customer';
import StuffItem from '../components/StuffItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListOrder = () => {
  // allows for search to change dynamically
  const [searchTerm, setSearchTerm] = useState('');
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, customers } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Customers.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const custoItems = Customers.collection.find({}).fetch();
    return {
      customers: custoItems,
      ready: rdy,
    };
  }, []);

  const getFilteredCustomers = () => {
    const regex = new RegExp(`^${searchTerm}`, 'i');
    return customers.filter(customer => regex.test(customer.name));
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Orders</h2>
          </Col>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Search..."
              id="searchInput"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredCustomers().map(customer => <StuffItem key={customer._id} stuff={customer} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListOrder;
