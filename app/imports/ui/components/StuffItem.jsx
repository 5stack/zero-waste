import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Trash} from "react-bootstrap-icons";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StuffItem = ({ stuff, collection }) => {
    const removeItem = (docID) => {
        console.log(`The item to remove is ${docID}`);
        collection.remove(docID);
    };
  return (
      <tr>
        <td>{stuff.name}</td>
        <td>{stuff.quantity}</td>
        <td>{stuff.condition}</td>
        <td>
          <Link to={`/edit/${stuff._id}`}>Edit</Link>
        </td>
        <td><Button onClick={() => removeItem(stuff._id)}><Trash/></Button></td>
      </tr>
  );
};

// Require a document to be passed to this component.
StuffItem.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
    collection: PropTypes.object.isRequired,
};

export default StuffItem;
