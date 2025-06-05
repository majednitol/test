const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "proto", "gobgp.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [path.join(__dirname, "proto")]
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const api = protoDescriptor.api;

const client = new api.GoBgpService(
    "gobgp:50051", // Changed from localhost to Docker service name
    grpc.credentials.createInsecure()
);

module.exports = client;
