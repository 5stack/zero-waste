import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ContainerCollection. It encapsulates state and variable values for stuff.
 */
class ContainerCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ContainerCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      amount: Number,
      owner: String,
      size: {
        type: String,
        allowedValues: ['small', 'medium', 'large'],
        defaultValue: 'medium',
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ContainerCollection.
 * @type {ContainerCollection}
 */
export const Containers = new ContainerCollection();
