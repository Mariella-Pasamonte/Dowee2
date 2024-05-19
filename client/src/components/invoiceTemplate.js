import React, { useState, useRef } from "react";
import "./css/invoiceTemplate.css";
//import { usePDF } from "react-to-pdf";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import addimage from "./css/add_image.png";

//the ones in comments are for a version using react-to-pdf hooks. The one's that aren't are using default function

function InvoiceTemplate(props) {
  //const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });
  const targetRef = useRef();
  const [imageSrc, setImageSrc] = useState(addimage);
  const fileUploadRef = useRef();

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = () => {
    try {
    const uploadedFile = fileUploadRef.current.files[0];
    const cachedImageUrl = URL.createObjectURL(uploadedFile);
    setImageSrc(cachedImageUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="invoice-faq7 thq-section-padding scroll-smooth">
      <div className="invoice-max-width" ref={targetRef}>
        <div className="invoice-container">
          <span className="invoice-text">Invoice No: #{props.id}</span>
          <span className="invoice-text01">Invoice Date:</span>
          <span className="invoice-date-time"></span>
          <span className="invoice-text02">Invoice To:</span>
          <span className="invoice-text03">Invoice From:</span>
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
              <li>
                <span>Text</span>
              </li>
              <li>
                <span>Text</span>
              </li>
              <li>
                <span>Text</span>
              </li>
            </ul>
          </div>
          <div className="invoice-container04">
            <div className="invoice-container05">
              <span className="invoice-text09">QUANTITY</span>
            </div>
            <ul className="invoice-ul list">
              <li className="list-item">
                <span>Text</span>
              </li>
              <li className="list-item">
                <span>Text</span>
              </li>
              <li className="list-item">
                <span>Text</span>
              </li>
            </ul>
          </div>
          <div className="invoice-container06">
            <div className="invoice-container07">
              <span className="invoice-text13">PRICE</span>
            </div>
            <ul className="invoice-ul list">
              <li className="list-item">
                <span>Text</span>
              </li>
              <li className="list-item">
                <span>Text</span>
              </li>
              <li className="list-item">
                <span>Text</span>
              </li>
            </ul>
          </div>
          <div className="invoice-container08">
            <div className="invoice-container09">
              <span className="invoice-text17">AMOUNT</span>
            </div>
            <ul className="invoice-ul list">
              <li className="list-item">
                <span>Text</span>
              </li>
              <li className="list-item">
                <span>Text</span>
              </li>
              <li className="list-item">
                <span>Text</span>
              </li>
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
                  <span>Thank you for your work</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="invoice-container14">
            <div className="invoice-container15">
              <h1 className="invoice-text25">TOTAL</h1>
            </div>
            <div className="invoice-container16">
              <h1 className="invoice-text25">demo 25000</h1>
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
