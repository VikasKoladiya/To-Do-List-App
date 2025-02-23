import {
  getClients,
  createClients,
  updateClient,
  deleteClient,
  searchClients,
} from "../services/clientServicies.js";

export const getClientsController = async (req, res) => {
  try {
    const clients = await getClients();
    res.status(200).json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClientsController = async (req, res) => {
  try {
    const clientsData = req.body;
    const newClients = await createClients(clientsData);
    res.status(200).json(newClients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClientController = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientsData = req.body;
    const updatedClient = await updateClient(clientId, clientsData);
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(updatedClient);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClientController = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deleted = await deleteClient(clientId);
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).send();
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchClientsController = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const clients = await searchClients(searchTerm);
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error searching clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
