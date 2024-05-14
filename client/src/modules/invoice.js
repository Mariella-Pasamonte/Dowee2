import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InvoiceTemplate } from "../components";

function Invoice({ invoices, projectId }) {
  return (
    <>
      <div>
        <div className="flex flex-row w-96 py-2">
          <div className="text-xl mb-2 mr-4 w-fit font-medium text-white">
            Project Invoice
          </div>
          <div className="relative flex flex-col justify-center h-full mr-2 text-white font-thin">
            <button className="font-Inter text-sm py-1 px-3 rounded-md bg-[#212628]/50">
              Sort by
            </button>
          </div>
          <div className="relative flex flex-col justify-center h-full ml-2 text-white font-thin">
            <button className="font-Inter text-sm py-1 px-3 rounded-md bg-[#212628]/50">
              Select
            </button>
          </div>
        </div>
        <div>
          {invoices && (
            <div className="flex flex-row">
              {invoices.map(
                (invoice) =>
                  invoice.projId === projectId && (
                    <div
                      key={invoice.id}
                      className="rounded-md bg-[#4F8FA8]/50 h-28 w-48 p-3">
                      <div className="font-Inter text-white text-lg">
                        {invoice.name}
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
          <InvoiceTemplate />
        </div>
      </div>
    </>
  );
}

export default Invoice;
