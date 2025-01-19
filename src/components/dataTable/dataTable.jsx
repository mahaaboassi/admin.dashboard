"use client";
import React from "react";
import Image from 'next/image';
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { sanitize } from "dompurify";

export default function DataTable( {data, columns}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Row className="pt-2">
        <nav aria-label="Page navigation example">
              <ul className="pagination mb-0">
                <li className="page-item">
                  <Link className="page-link" href={`/user/list?page=${parseInt(meta.current_page) - 1}`} aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </Link>
                </li>
                { meta.current_page >1 && <li className="page-item active">
                  <Link className="page-link" href={`/user/list?page=${1}`}>
                    1
                  </Link>
                </li>}
                
                <li className="page-item">
                  <Link className="page-link" href="">
                    {meta.current_page}
                  </Link>
                </li>
                {meta.last_page > 1 && <li className="page-item">
                  <Link className="page-link" href="">
                    {meta.last_page}
                  </Link>
                </li> }
                
                <li className="page-item">
                  <Link className="page-link" href={`/user/list?page=${parseInt(meta.current_page) - 1}`} aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </Link>
                </li>
              </ul>
            </nav>
       
        </Row> */}

      <style jsx>{`
        .table-container {
          width: 100%;
          overflow-x: auto;
          margin-top: 20px;
        }
        .custom-table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
}