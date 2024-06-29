class NodeError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default NodeError;