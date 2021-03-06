'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const PeopleModel = require('./people.schema.js');

exports.handler = async (event) => {
  try {
    // first, we get the data from the req.body
    const parse = JSON.parse(event);
    const {name, phone} = parse.body; // object destructuring

    // make a unique id for this record
    const id = uuid();

    // make the record, based on our dynamoose schema
    const record = new PeopleModel({ id, name, phone });
    // save the record to the DB (DynamoDB)
    const data = await record.save();
    console.log('DATA', data);

    // return the newly saved record and a status code of 200
    console.log('EVENT', event);
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (e) {
    console.log('ERROR', e);
    return {
      statusCode: 500,
      response: e.message
    }
  }
}