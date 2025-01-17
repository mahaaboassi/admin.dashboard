"use client";
import React from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";



export default function DataTable( {data,page,columns}) {
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
      <div>
        
        <button disabled={page === 1} onClick={() => window.location.href = `/user/list?page=${page - 1}`}>
            Prev
        </button>
        <span> Page {page} </span>
        <button onClick={() => window.location.href = `/user/list?page=${parseInt(page) + 1}`}>
            Next
        </button>
        </div>

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