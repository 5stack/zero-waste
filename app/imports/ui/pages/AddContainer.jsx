import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Containers } from '../../api/container/Container';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  amount: String,
  type: {
    type: String,
    allowedValues: ['Large', 'Medium', 'Small'],
    defaultValue: 'Medium',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddContainer = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { type, amount } = data;
    const owner = Meteor.user().username;
    Containers.collection.insert(
      { type, amount, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Container</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <SelectField name="type" />
                <NumField name="amount" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddContainer;
