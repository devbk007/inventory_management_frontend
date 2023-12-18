import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import axios from "axios";

const LocationModal = ({ isOpen, onClose }) => {
  const [productID, setProductID] = useState("");
  const [fromLocationID, setFromLocationID] = useState("");
  const [toLocationID, setToLocationID] = useState("");
  const [qty, setQty] = useState(0);

  const handleProductIDChange = (value) => {
    setProductID(value);
  };

  const handleFromLocationChange = (value) => {
    setFromLocationID(value);
  };

  const handleToLocationChange = (value) => {
    setToLocationID(value);
  };

  const handleQtyChange = (value) => {
    setQty(value);
  };

  const handleSubmit = async () => {
    try {
      // const parsedProductID = parseInt(productID, 10);
      // const parsedFromLocationID = parseInt(fromLocationID, 10);
      // const parsedToLocationID = parseInt(toLocationID, 10);
      // const parsedQty = parseInt(qty, 10);

      const response = await axios.post(
        "http://127.0.0.1:5000/product_movements",
        {
          product_id: productID,
          from_location_id: fromLocationID,
          to_location_id: toLocationID,
          qty: qty,
        }
      );

      // Check the response data for success
      if (response.data.product_movement_id) {
        // Handle success, e.g., close the modal
        console.log("API response:", response.data);
        onClose();
      } else {
        // Show error message using Ant Design message component
        message.error({
          content: "Submit failed. Please try again.",
          duration: 2, // Duration in seconds
        });
      }
    } catch (error) {
      // Handle error
      console.error("API error:", error);
      // Show error message using Ant Design message component
      message.error({
        content: error.message,
        duration: 2, // Duration in seconds2
      });
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Move Product"
      centered
      className="Modal-container"
    >
      <div>
        <label>
          Product ID:
          <Input
            type="number"
            value={productID}
            onChange={(e) => handleProductIDChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          From Location ID:
          <Input
            type="number"
            value={fromLocationID}
            onChange={(e) => handleFromLocationChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          To Location ID:
          <Input
            type="number"
            value={toLocationID}
            onChange={(e) => handleToLocationChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Quantity:
          <Input
            type="number"
            value={qty}
            onChange={(e) => handleQtyChange(e.target.value)}
          />
        </label>
        <br />
        <Button style={{marginTop:'20px'}} type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default LocationModal;
