const express = require("express");
const bodyParser = require("body-parser");
const client = require("./gobgpClient");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// ... (keep all your existing routes as-is, but fix the Add Route endpoint below)
// 1. Get Global BGP config
app.get("/bgp", (req, res) => {
  client.GetBgp({}, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response);
  });
});

// 2. Add a BGP neighbor
app.post("/neighbor", (req, res) => {
  const { neighbor_address, peer_as } = req.body;
  const peer = {
    conf: { neighbor_address, peer_asn: peer_as },
    afi_safis: [{ config: { family: { afi: 1, safi: 1 } } }],
  };
  client.AddPeer({ peer }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Neighbor added", response });
  });
});

// 3. Delete a neighbor
app.delete("/neighbor/:address", (req, res) => {
  client.DeletePeer(
    { address: req.params.address },
    (err, response) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Neighbor deleted" });
    }
  );
});

// 4. List all neighbors
app.get("/neighbors", (req, res) => {
  client.ListPeer({}, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response.peers);
  });
});

// 5. Get neighbor state
app.get("/neighbor/:address", (req, res) => {
  client.GetPeer({ address: req.params.address }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response.peer);
  });
});
// 6. Add a route - FIXED
app.post("/route", (req, res) => {
    const { prefix, next_hop } = req.body;
    const destination = {
        family: { afi: 1, safi: 1 },
        nlri: { prefix },
        pattrs: [{
            type_url: "type.googleapis.com/apipb.NextHopAttribute",
            value: Buffer.from(next_hop) // Fixed Buffer creation
        }],
    };
    client.AddPath({ table_type: 0, path: destination }, (err, response) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Route added", response });
    });
});
// 7. Delete a route
app.delete("/route", (req, res) => {
  const { prefix } = req.body;
  const destination = {
    family: { afi: 1, safi: 1 },
    nlri: { prefix },
  };
  client.DeletePath({ table_type: 0, path: destination }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Route deleted" });
  });
});

// 8. Get all RIB routes
app.get("/routes", (req, res) => {
  client.ListPath({ table_type: 0, family: { afi: 1, safi: 1 } }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response);
  });
});

// 9. Get Adj-In routes from a neighbor
app.get("/neighbor/:address/adj-in", (req, res) => {
  client.ListPath({ name: req.params.address, table_type: 1 }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response);
  });
});

// 10. Get Adj-Out routes to a neighbor
app.get("/neighbor/:address/adj-out", (req, res) => {
  client.ListPath({ name: req.params.address, table_type: 2 }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.json(response);
  });
});
app.listen(PORT, () => {
    console.log(`GoBGP REST API server running at http://localhost:${PORT}`);
});
