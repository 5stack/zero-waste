import { Meteor } from 'meteor/meteor';
import { Customers } from '../../api/customer/Customer';
import { Containers } from '../../api/container/Container';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Customers.collection.insert(data);
};

const contAddData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Containers.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Customers.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultOrders.forEach(data => addData(data));
  }
}

if (Containers.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultOrders.forEach(data => contAddData(data));
  }
}
