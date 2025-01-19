"use client"
import DataTable from "@/components/dataTable/dataTable"
function DataTableCustom({data}) {
  const bufferToString = (buffer) => {
    return new TextDecoder().decode(new Uint8Array(buffer));
};   const columns = [
  { accessorKey: "id", header: "ID" },
  // {
  //   accessorKey: "file",
  //   header: "Photo",
  //   cell: ({ row }) => (<div dangerouslySetInnerHTML={{ __html: bufferToString(row.original.file.data)}} />
  //   ),
  // },
  { accessorKey: "name_en", header: "Name In English" },
  { accessorKey: "name_ar", header: "Name In Arabic" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "bathrooms", header: "Bathrooms" },
  { accessorKey: "bedrooms", header: "Bedrooms" },
  { accessorKey: "beds", header: "Beds" },
  { accessorKey: "guests", header: "Guests" },
  { accessorKey: "registration_number", header: "Registeration Number" },
  { accessorKey: "features", header: "Features" },
  { accessorKey: "ready", header: "Ready",
    cell: ({ row }) => (
    <span
      style={{
        padding: "5px 10px",
        borderRadius: "10px",
        color: "#fff",
        backgroundColor: row.original.ready ? "green" : "red",
      }}
    >
      {row.original.ready ? "Yes" : "No"}
    </span>
  ), },
  { accessorKey: "furnishing", header: "Furnishing",
    cell: ({ row }) => (
    <span
      style={{
        padding: "5px 10px",
        borderRadius: "10px",
        color: "#fff",
        backgroundColor: row.original.furnishing ? "green" : "red",
      }}
    >
      {row.original.furnishing ? "Yes" : "No"}
    </span>
  ), },
  { accessorKey: "addedBy", header: "Added By" },
  
];
   
    return ( <>

    <DataTable data={data} columns={columns} />
    
    
    </> );
}

export default DataTableCustom;
