import axios from "axios";
import CryptoJS from "crypto-js";

async function handler(request, response) {
  const domain = process.env.BACKEND_DOMAIN;

  try {
    const body = request.body;

    if (!body) {
      return response.status(403).json({ error: "Not a verified Data" });
    }

    const {
      id,
      token,
      firstName,
      middleName,
      lastName,
      companyName,
      lenderListUrl,
      city,
      cellNumber,
      province,
      postalCode,
      phoneNumber,
      streetName,
      streetNumber,
      profileImage,
      maxNumberOfAssignedOrders,
      designation,
      commissionRate,
      emailId,
      apartmentNo,
      smsNotification,
      emailNotification
    } = body;

    const formData = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      companyName: companyName,
      city: city,
      province: province,
      postalCode: postalCode,
      area: "",
      lenderListUrl: lenderListUrl,
      apartmentNo: apartmentNo,
      CellNumber: cellNumber,
      streetName: streetName,
      streetNumber: streetNumber,
      phoneNumber: phoneNumber,
      commissionRate: Number(commissionRate),
      maxNumberOfAssignedOrders: Number(maxNumberOfAssignedOrders),
      designation: designation,
      profileImage: profileImage,
      emailId: emailId,
      getSms : smsNotification ? 1 : 0,
      getEmail : emailNotification ? 1 : 0
    };

    const userResponse = await axios.put(
      `${domain}/com.appraisalland.AppraiserIndividual/updateAppraiserProfile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          AppraiserId: id,
        },
      }
    );
    const user = userResponse.data;

    if (!user) {
      return response.status(404).json({ error: "User Not Found" });
    }
    return response
      .status(200)
      .json({ msg: "Successfully updated", userData: user });
  } catch (err) {
    console.log({err});
    if (err.response) {
      // If the error is from an axios request (e.g., HTTP 4xx or 5xx error)
      const axiosError = err.response.data;
      const statusCode = err.response.status;
      console.error(statusCode, axiosError.message); // Log the error for debugging

      return response.status(statusCode).json({ error: axiosError.message });
    } else {
      // Handle other types of errors
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default handler;
