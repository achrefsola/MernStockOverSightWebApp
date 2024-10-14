import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddOrder.css";
import toast from "react-hot-toast";
import { useManager } from "./ManagerContext";
import { FaTrashAlt, FaFileInvoiceDollar } from "react-icons/fa";
import SwitchButton from "./SwitchButton";
import TextField from "@mui/material/TextField";
import noImage from "../img/No_Image_Available.jpg";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function AddOrder(props) {
  const { ProductData, fetchOrderData } = useManager();
  const [oldQuantities, setOldQuantities] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    products: [],
    customerContact: "",
    totalPrice: 0,
    isCompany: false,
    fiscalNumber: "",
    status: "pending",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (props.trigger && props.mode === "edit" && props.orderId) {
      fetchSelectedOrderData();
    }
  }, [props.trigger, props.mode, props.orderId]);

  useEffect(() => {
    if (!props.trigger) {
      resetFormData();
    }
  }, [props.trigger]);
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleProductNumberInput = (productId, value) => {
    setFormData((prevState) => {
      const updatedProducts = prevState.products.map((product, index) => {
        if (product._id === productId) {
          // Get the previously ordered quantity
          const previousQuantity = oldQuantities[index] || 0;

          // Calculate total available stock (current stock + previous ordered quantity)
          const totalAvailableStock = product.stock + previousQuantity;

          // Ensure the new quantity is between 1 and the total available stock
          const newQuantity = Math.max(1, Math.min(value, totalAvailableStock));

          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      const updatedTotalPrice = handlePriceCalculation(updatedProducts);
      return {
        ...prevState,
        products: updatedProducts,
        totalPrice: updatedTotalPrice,
      };
    });
  };

  const transformedData = {
    customerName: formData.customerName,
    products: formData.products.map((product) => ({
      productId: product._id, // Ensure this is the ObjectId of the product
      product: product.product, // Product name
      quantity: product.quantity,
      price: product.price,
    })),
    customerContact: formData.customerContact,
    totalPrice: formData.totalPrice,
    isCompany: formData.isCompany,
    fiscalNumber: formData.fiscalNumber,
    status: formData.status,
    address: formData.address,
    email: formData.email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (props.mode === "create") {
        console.log("Order data sent:", transformedData);
        await axios.post(
          "http://localhost:5000/api/order/create",
          transformedData
        );
        await Promise.all(
          formData.products.map(async (product) => {
            await axios.patch(
              `http://localhost:5000/api/product/${product._id}`,
              {
                stock: product.stock - product.quantity,
              }
            );
          })
        );

        toast.success("Order created successfully");
      } else if (props.mode === "edit") {
        await axios.patch(
          `http://localhost:5000/api/order/${props.orderId}`,
          transformedData
        );

        await Promise.all(
          formData.products.map(async (product, index) => {
            const oldQuantity = oldQuantities[index];
            const newStock = product.stock + (oldQuantity - product.quantity);

            await axios.patch(
              `http://localhost:5000/api/product/${product._id}`,
              {
                stock: newStock,
              }
            );
          })
        );
        toast.success("Order updated successfully");
      }
      props.setTrigger(false);
      resetFormData();
      fetchOrderData();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const fetchSelectedOrderData = async () => {
    try {
      setFormData((prevState) => ({ ...prevState, products: [] }));
      const response = await axios.get(
        `http://localhost:5000/api/order/${props.orderId}`
      );
      const orderData = response.data;
      console.log(
        "Quantity",
        orderData.products.map((product) => ({ quantity: product.quantity }))
      );
      console.log("-----orderdata", orderData);
      const productDetailsPromises = orderData.products.map((product) =>
        axios
          .get(`http://localhost:5000/api/product/${product.productId}`)
          .catch((error) => ({ error }))
      );

      const productResponses = await Promise.allSettled(productDetailsPromises);

      const products = productResponses
        .filter(
          (result) => result.status === "fulfilled" && !result.value.error
        )
        .map((result) => ({
          ...result.value.data,
          quantity: orderData.products.find(
            (p) => p.productId === result.value.data._id
          ).quantity,
        }));

      const missingProducts = productResponses.filter(
        (result) => result.status === "rejected" || result.value?.error
      );
      if (missingProducts.length > 0) {
        toast.error("Some products could not be fetched");
      }

      setFormData({
        customerName: orderData?.customerName || "",
        customerContact: orderData?.customerContact || "",
        products: products || [],
        totalPrice: orderData?.totalPrice || 0,
        status: orderData?.status || "pending",
        fiscalNumber: orderData?.fiscalNumber || "",
        email: orderData?.email || "",
        isCompany: orderData?.isCompany || false,
        address: orderData?.address || "",
      });
      console.log("Products", products);
      setOldQuantities(orderData.products.map((product) => product.quantity));
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      customerName: "",
      products: [],
      customerContact: "",
      totalPrice: 0,
      isCompany: false,
      fiscalNumber: "",
      status: "pending",
      address: "",
      email: "",
    });
  };

  const handleSelectProduct = (event, newValue) => {
    const selectedProduct = ProductData.find(
      (product) => product.product === newValue
    );
    if (
      selectedProduct &&
      !formData.products.some((product) => product._id === selectedProduct._id)
    ) {
      const updatedProducts = [
        ...formData.products,
        { ...selectedProduct, quantity: 1 },
      ];
      const updatedTotalPrice = handlePriceCalculation(updatedProducts);
      setFormData({
        ...formData,
        products: updatedProducts,
        totalPrice: updatedTotalPrice,
      });
    }
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = formData.products.filter(
      (product) => product._id !== productId
    );
    const updatedTotalPrice = handlePriceCalculation(updatedProducts);
    setFormData({
      ...formData,
      products: updatedProducts,
      totalPrice: updatedTotalPrice,
    });
  };

  const handleToggleSwitch = () => {
    setFormData((prevState) => ({
      ...prevState,
      isCompany: !prevState.isCompany,
    }));
  };
  const handlePriceCalculation = (products) => {
    return products.reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0
    );
  };

  return props.trigger ? (
    <div className="popup_order">
      <div className="popup-inner_order">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <label>Individual</label>&nbsp;
          <SwitchButton
            isChecked={formData.isCompany}
            onChange={handleToggleSwitch}
          />
          &nbsp;
          <label>Company</label>
          {formData.isCompany && (
            <div className="col-md-offset-4 col-md-5">
              <div className="form-control-sm w-50">
                <label htmlFor="fiscalNumber" className="form-label">
                  Fiscal number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fiscalNumber"
                  name="fiscalNumber"
                  placeholder="XXXXXXX/X/X/X/XXX"
                  value={formData.fiscalNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="right-left-flex-fields">
            <div className="left-order-popup-fields">
              <div className="order-popup-fields">
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">
                    Customer name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customerContact" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="customerContact"
                    name="customerContact"
                    value={formData.customerContact}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="order-popup-fields">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="paid">paid</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="right-inner-flex">
              <div className="mb-3">
                <div className="search">
                  <Stack spacing={0} sx={{ width: 300 }}>
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      options={ProductData.map((product) => product.product)}
                      onChange={handleSelectProduct}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search for products"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                    />
                  </Stack>
                </div>
                <div className="selected-products mt-3">
                  <h5>Selected Products:</h5>
                  <ul className="list-group">
                    {formData.products.map((product, index) => {
                      // This is the previous quantity (before modification)
                      const previousQuantity = oldQuantities[index] || 0;

                      // The actual available stock including the previously ordered quantity
                      const totalAvailableStock =
                        product.stock + previousQuantity;
                        console.log("previous ", previousQuantity);

                      // The remaining stock dynamically calculated based on the current quantity
                      const remainingStock =
                        totalAvailableStock - (product.quantity || 0);

                      return (
                        <div key={product._id} className="product-container">
                          <li className="list-group-item">
                            <div className="product-info">
                              {product.image ? (
                                <img
                                  src={`http://localhost:5000/${product.image}`}
                                  className="small-image"
                                  alt="Product"
                                />
                              ) : (
                                <img
                                  src={noImage}
                                  className="small-image"
                                  alt="No available"
                                />
                              )}

                              <td>
                                <div class="tooltip-container">
                                  <div class="product-name">
                                    {product.product}
                                  </div>
                                  <div class="tooltip-text">
                                    {product.product}
                                  </div>
                                </div>
                              </td>

                              <span className="product-details">
                                <div class="tooltip-container">
                                  {product.price} TND
                                </div>
                                <FaTrashAlt
                                  className="deleteicon"
                                  onClick={() =>
                                    handleRemoveProduct(product._id)
                                  }
                                />
                                <div className="text-field-container">
                                  <label
                                    htmlFor={`product-${product._id}`}
                                    className="form-label"
                                  ></label>
                                  <input
                                    type="number"
                                    className="form-control custom-arrows"
                                    id={`product-${product._id}`}
                                    value={product.quantity || previousQuantity} // Show previous quantity initially
                                    onChange={(e) =>
                                      handleProductNumberInput(
                                        product._id,
                                        Math.min(
                                          e.target.value,
                                          totalAvailableStock
                                        )
                                      )
                                    }
                                  />
                                </div>
                                <div className="stock-info">
                                  Remaining Stock:{" "}
                                  {remainingStock > 0
                                    ?(
                                      remainingStock
                                    ) : (
                                      <span style={{ color: "red", fontWeight: "bold" }}>Out of stock</span>
                                    )}
                                </div>
                              </span>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <div className="total-price-container">
                  <div className="form-control custom-width">
                    <label htmlFor="totalPrice" className="form-label">
                      Total Price (TND)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="totalPrice"
                      name="totalPrice"
                      value={formData.totalPrice}
                      readOnly
                    />
                  </div>
                </div>
                <div className="create-order-button">
                  <button type="submit" className="btn btn-success mt-3">
                    {props.mode === "create" ? "Create Order" : "Update Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
