module.exports.healthCheck = async () => {
  await connectToDatabase();
  console.log('Connection successful.');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Connection successful' }),
  };
};

module.exports.create = async event => {
  try {
    const { Note } = await connectToDatabase();
    const note = await Note.create(JSON.parse(event.body));
    return {
      statuscode: 200,
      body: JSON.stringify(note),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the note.',
    };
  }
};

module.exports.getOne = async event => {
  try {
    const { Note } = await connectToDatabase();
    const note = await Note.findById(event.pathParameters.id);
    if (!note) {
      throw new HTTPErrror(
        404,
        `Note with id: ${event.pathParameters.id} was not found`,
      );
    }
    return {
      statusCode: 200,
      body: JSON.stringify(note),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the notes',
    };
  }
};
