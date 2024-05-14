import React from "react";
import "./css/invoiceTemplate.css";
//import { usePDF } from "react-to-pdf";
import { useRef } from "react";
import generatePDF from "react-to-pdf";

//the ones in comments are for a version using react-to-pdf hooks. The one's that aren't are using default function

function InvoiceTemplate(props) {
  //const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });
  const targetRef = useRef();
  return (
    <div className="invoice-faq7 thq-section-padding">
      <div className="invoice-max-width thq-section-max-width" ref={targetRef}>
        <div className="invoice-container">
          <span className="invoice-text">Invoice No:</span>
          <span className="invoice-text01">Invoice Date:</span>
          <span className="invoice-date-time"></span>
          <span className="invoice-text02">Invoice To:</span>
          <span className="invoice-text03">Invoice From:</span>
          <h1 className="invoice-text04">INVOICE</h1>
          <img
            src={props.imageSrc}
            alt={props.imageAlt}
            className="invoice-image"
          />
        </div>
        <div className="invoice-container01">
          <div className="invoice-container02">
            <div className="invoice-container03">
              <span className="invoice-text05">TASK NAME / DESCRIPTION</span>
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
          <div className="invoice-container04">
            <div className="invoice-container05">
              <span className="invoice-text09">QUANTITY</span>
            </div>
            <ul className="list">
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
            <ul className="list">
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
            <ul className="list">
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
          <div className="invoice-container14">
            <div className="invoice-container15">
              <h1 className="invoice-text25">TOTAL</h1>
            </div>
            <div className="invoice-container16"></div>
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
