import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import axios from "axios";

const LocationModal = ({ isOpen, onClose }) => {
  const [productID, setProductID] = useState(0);
  const [fromLocationID, setFromLocationID] = useState(0);
  const [toLocationID, setToLocationID] = useState(0);
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
      const parsedProductID = parseInt(productID, 10);
      const parsedFromLocationID = parseInt(fromLocationID, 10);
      const parsedToLocationID = parseInt(toLocationID, 10);
      const parsedQty = parseInt(qty, 10);

      const response = await axios.post("http://127.0.0.1:5000/product_movements", {
        product_id: parsedProductID,
        from_location_id: parsedFromLocationID,
        to_location_id: parsedToLocationID,
        qty: parsedQty,
      });
  
      // Handle success, e.g., close the modal
      console.log("API response:", response.data);
      onClose();
    } catch (error) {
      // Handle error
      console.error("API error:", error);
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
      <form onSubmit={handleSubmit}>
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default LocationModal;
