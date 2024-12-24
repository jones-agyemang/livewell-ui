import React, { useState } from "react";
import {
  CssBaseline,
  Box,
  Typography,
  Input,
  Button,
  Select,
  MenuItem,
  Textarea,
} from "@mui/joy";

const PropertyInterestForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    additionalInfo: "",
  });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

  const handleChange = (e) => {
    const { name, value } = e.target; // This works for normal inputs like TextField and Input
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your interest!");
  };

  return (
    <CssBaseline>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "background.body",
        }}
      >
        <Typography level="h2" sx={{ marginBottom: "1rem", textAlign: "center" }}>
          Express Your Interest
        </Typography>

        <Input
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          sx={{ marginBottom: "1rem" }}
        />

        <Input
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          sx={{ marginBottom: "1rem" }}
        />

        <Input
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ marginBottom: "1rem" }}
        />

        <Input
          placeholder="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          sx={{ marginBottom: "1rem" }}
        />

        <Select
          name="propertyType"
          value={formData.propertyType}
          onChange={(e) => handleChange({ target: { name: "propertyType", value: e.target.value } })}
          required
          sx={{ marginBottom: "1rem" }}
        >
          <MenuItem value="">Select Property Type...</MenuItem>
          <MenuItem value="Apartment">Apartment</MenuItem>
          <MenuItem value="House">House</MenuItem>
          <MenuItem value="Condo">Condo</MenuItem>
        </Select>

        <Input
          placeholder="Budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
          sx={{ marginBottom: "1rem" }}
        />

        <Textarea
          placeholder="Additional Information"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          minRows={3}
          sx={{ marginBottom: "1.5rem" }}
        />

        <Button type="submit" sx={{ width: "100%" }}>
          Submit
        </Button>
      </Box>
    </CssBaseline>
  );
};

export default PropertyInterestForm;