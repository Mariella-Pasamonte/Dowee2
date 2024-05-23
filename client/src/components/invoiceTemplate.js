import React, { useState, useRef } from "react";
import "./css/invoiceTemplate.css";
//import { usePDF } from "react-to-pdf";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import addimage from "./css/add_image.png";
import { useLocation } from "react-router-dom";

//the ones in comments are for a version using react-to-pdf hooks. The one's that aren't are using default function

function InvoiceTemplate(props) {
  //const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });
  const targetRef = useRef();
  const [imageSrc, setImageSrc] = useState(addimage);
  const fileUploadRef = useRef();
  const [totalAmount, setTotalAmount] = useState(0);

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };

  const location = useLocation();

  const {invoices, projects, tasks, user, hourlog} = location.state || {};  
  
  const uploadImageDisplay = () => {
    try {
      const uploadedFile = fileUploadRef.current.files[0];
      const cachedImageUrl = URL.createObjectURL(uploadedFile);
      setImageSrc(cachedImageUrl);
    } catch (error) {
      console.log(error);
    }
  }

  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const convertToDecimalHours = (hours, minutes, seconds) => {
    // console.log(hours, minutes, seconds);
    const hoursFromMinutes = minutes / 60;
    const hoursFromSeconds = seconds / 3600;
    return hours + hoursFromMinutes + hoursFromSeconds;
  };
  const addTotalAmount = (amount) => {
    setTotalAmount(totalAmount + amount);
  };

  const calculateTotal = (hourlog) => {
    return hourlog.reduce((acc, hl) => acc+parseFloat(hl.pendingamount),0).toFixed(2);
  };

  const validHourlog = Array.isArray(props.hourlog) && props.hourlog.length > 0 ? props.hourlog : [];
  const hourlogMain = validHourlog.filter(hourlog => hourlog.taskid === tasks.id)
  console.log("tasks", tasks);
  const total = calculateTotal(hourlog);
  console.log("hourlog", hourlog);


  return (
    <div className="invoice-faq7 thq-section-padding scroll-smooth">
      <div className="invoice-max-width" ref={targetRef}>
        <div className="invoice-container ">
          <span className="invoice-text font-normal">Invoice No: {invoices.invoice_number}</span>
          <span className="invoice-text01 font-normal">Invoice Date: {formattedDate}</span>
          <span className="invoice-text02 font-normal">Invoice To: {projects.clientname}</span>
          <span className="invoice-text03 font-normal">Invoice From: {user.lname}, {user.fname}</span>
          <h1 className="invoice-text04">INVOICE</h1>
          <button type="submit" className="invoice-image" onClick={handleImageUpload}>
          <img
            src={imageSrc}
            className="img-size"
          /></button >
          <input
            type="file"
            id="image"
            accept="image/*"
            ref={fileUploadRef}
            onChange={uploadImageDisplay}
            hidden />
        </div>
        <div className="invoice-container01">
          <div className="invoice-container02">
            <div className="invoice-container03">
              <span className="invoice-text05">TASK NAME / DESCRIPTION</span>
            </div>
            <ul className="invoice-ul list">
              {tasks.map((task) => (
              <li>
                <span>{task.name}</span>
              </li>
            ))}
            </ul>
          </div>
          <div className="invoice-container04">
            <div className="invoice-container05">
              <span className="invoice-text09">QUANTITY</span>
            </div>
            <ul className="invoice-ul list">
            {tasks.map((task) => (
              <li>
                <span>{task.paymenttype === false ? 1 : hourlog.pendingamount}</span>
              </li>
            ))}
            </ul>
          </div>
          <div className="invoice-container06">
            <div className="invoice-container07">
              <span className="invoice-text13">PRICE</span>
            </div>
            <ul className="invoice-ul list">
              {hourlog.map((hourlog) => (
                <li>
                  <span>{hourlog.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="invoice-container08">
            <div className="invoice-container09">
              <span className="invoice-text17">AMOUNT</span>
            </div>
            <ul className="invoice-ul list">
            {hourlog.map((hourlog) => (
                <li>
                  <span>{hourlog.pendingamount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="invoice-container10">
          <div className="invoice-container11">
            <div className="invoice-container12">
              <h1 className="invoice-text21">NOTES</h1>
            </div>
            <div className="invoice-container13">
              <ul className="list">
                <li className="list-item">
                  <span>Thank you for your work {invoices.notes}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="invoice-container14">
            <div className="invoice-container15">
              <h1 className="invoice-text25">TOTAL</h1>
            </div>
            <div className="invoice-container16">
              <h1 className="invoice-text25">{total}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="invoice-container17">
        {/* <button
          onClick={() => toPDF()}
          type="button"
          className="invoice-button button">
          DOWNLOAD
        </button> */}
        <button
          onClick={() => generatePDF(targetRef, { filename: "invoice.pdf" })}
          type="button"
          className="invoice-button button">
          DOWNLOAD
        </button>
      </div>
    </div>
  );
}

export default InvoiceTemplate;
