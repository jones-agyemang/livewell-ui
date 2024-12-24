import React, { useState } from "react";
import api from './api';
import Notification from "./components/notification";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
} from "@mui/joy";

const AccommodationForm = () => {
  const [notify, setNotify] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    moveInDate: "",
    durationOfStay: "",
    specialRequirements: "",
    paymentAmount: "",
    paymentMethod: "",
    transactionId: "",
    transactionDate: "",
    comments: "",
  });

  const toggleNotifier = (state) => {
    setNotify(state);
  }

  const entityName = () => {
    return `${formData.firstName} ${formData.middleName} ${formData.lastName}`;
  }

  const resetFormData = () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      phone: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
      moveInDate: '',
      durationOfStay: '',
      specialRequirements: '',
      paymentAmount: '',
      paymentMethod: '',
      transactionId: '',
      transactionDate: '',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      resident: {
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        contact_detail_attributes: {
          email: formData.email,
          mobile_number: formData.phone,
        },
        emergency_contact_attributes: {
          name: formData.emergencyContactName,
          relationship: formData.emergencyContactRelationship,
          mobile_number: formData.emergencyContactPhone,
        },
        stay_detail_attributes: {
          move_in_date: formData.moveInDate,
          duration_of_stay: formData.durationOfStay,
          special_requirements: formData.specialRequirements,
        },
        payments_attributes: [
          {
            unitary_amount: formData.paymentAmount,
            method: formData.paymentMethod,
            transaction_id: formData.transactionId,
            transaction_date: formData.transactionDate,
          },
        ],
      },
    };

    try {
      const response = await api.post('/residents', payload);

      if (response.status === 200) {
        setNotify(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <CssBaseline>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "background.body",
        }}
      >
        <Box sx={{
          display: "flex", 
          justifyContent: "center", 
          marginBottom: "1.5rem",
          width: "auto"
        }}>
          <img src="ken-height-logo-3.png" alt="Logo" style={{ borderRadius: 10, width: "50%" }} />
        </Box>
        <Typography level="h2" sx={{ marginBottom: "1rem", textAlign: "center" }}>
          Accommodation Application
        </Typography>

        {notify && <Notification toggleNotifier={toggleNotifier} name={entityName} resetFormData={resetFormData} />}

        <Typography level="h4" sx={{ marginBottom: "1rem" }}>
          Personal Information
        </Typography>

        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Middle Name</FormLabel>
          <Input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={(_, newValue) => setFormData({ ...formData, gender: newValue })}
            required
            sx={{ marginBottom: "1rem" }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="prefer-not-to-say">Prefer not to say</Option>
            <Option value="other">Other</Option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <Typography level="h4" sx={{ marginBottom: "1rem" }}>
          Emergency Contact
        </Typography>

        <FormControl>
          <FormLabel>Contact Name</FormLabel>
          <Input
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Relationship</FormLabel>
          <Input
            name="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            name="emergencyContactPhone"
            type="tel"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <Typography level="h4" sx={{ marginBottom: "1rem" }}>
          Accommodation Details
        </Typography>

        <FormControl>
          <FormLabel>Move-in Date</FormLabel>
          <Input
            type="date"
            name="moveInDate"
            value={formData.moveInDate}
            onChange={handleChange}
            required
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Duration of Stay</FormLabel>
          <Select
            name="durationOfStay"
            value={formData.durationOfStay}
            onChange={(_, newValue) => setFormData({ ...formData, durationOfStay: newValue })}
            sx={{ marginBottom: "1rem" }}
          >
            <Option value="semester">Semester</Option>
            <Option value="full-year">Full Year</Option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Special Requirements</FormLabel>
          <Textarea
            placeholder="Please specify additional requirements to make your stay more comfortable..."
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            minRows={3}
            sx={{ marginBottom: "1.5rem" }}
          />
        </FormControl>

        <Typography level="h4" sx={{ marginBottom: "1rem" }}>
          Payment Information
        </Typography>

        <FormControl>
          <FormLabel>Payment Amount</FormLabel>
          <Input
            placeholder="Payment Amount"
            name="paymentAmount"
            type="number"
            value={formData.paymentAmount}
            onChange={handleChange}
            required
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Payment Method</FormLabel>
          <Select
            placeholder="Payment Method"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={(_, newValue) => setFormData({ ...formData, paymentMethod: newValue })}
            sx={{ marginBottom: "1rem" }}
          >
            <Option value="bank-transfer">Bank Transfer</Option>
            <Option value="card">Debit/Credit Card</Option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Transaction ID</FormLabel>
          <Input
            placeholder="Transaction ID"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Transaction Date</FormLabel>
          <Input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Additional Comments</FormLabel>
          <Textarea
            placeholder="Additional Comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            minRows={3}
            sx={{ marginBottom: "1.5rem" }}
          />
        </FormControl>

        <Button type="submit" sx={{ width: "100%" }}>
          Submit Application
        </Button>
      </Box>
    </CssBaseline>
  );
};

export default AccommodationForm;
