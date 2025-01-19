"use client"
import DataTable from "@/components/dataTable/dataTable"
function DataTableCustom({data}) {
  const columns = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "file",
      header: "Photo",
      cell: ({ row }) => (
        <img
          src={row.original.file}
          alt="User"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "country_dial", header: "Country Dial" },
    { accessorKey: "phone_number", header: "Phone Number" },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "10px",
            color: "#fff",
            backgroundColor: row.original.active ? "green" : "red",
          }}
        >
          {row.original.active ? "Active" : "Inactive"}
        </span>
      ),
    },
    
  ];
    return ( <>
    <DataTable data={data} columns={columns} />
    
    
    </> );
}

export default DataTableCustom;