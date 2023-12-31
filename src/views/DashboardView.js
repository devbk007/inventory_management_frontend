import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import LocationModal from "../components/LocationModal";

const DashboardView = () => {
  const [locationData, setLocationData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dashboardKey, setDashboardKey] = useState(0); // Key to trigger re-render

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDashboardKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("http://127.0.0.1:5000/location_balance") // Update the URL with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error({
          content: "Error fetching data. Please try again.",
          duration: 2, // Duration in seconds
        });
      });
  }, [dashboardKey]); // Empty dependency array means this effect runs once when the component mounts

  const columns = [
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Warehouse",
      dataIndex: "location_name",
      key: "location_name",
    },
    {
      title: "Balance Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <div style={{ margin: "20px", padding: "100px" }}>
      <h2 style={{ textAlign: "center" }}>Inventory Management Web App</h2>
      <Table
        dataSource={locationData}
        columns={columns}
        bordered
        pagination={{
          pageSize: 5,
        }}
      />
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Button type="primary" onClick={handleOpenModal}>
          Move Product
        </Button>
        {isModalOpen && (
          <LocationModal onClose={handleCloseModal} isOpen={isModalOpen} />
        )}
      </div>
    </div>
  );
};

export default DashboardView;
