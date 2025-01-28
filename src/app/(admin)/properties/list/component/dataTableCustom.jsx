"use client"
import DataTable from "@/components/dataTable/dataTable"
import { useRouter } from "next/navigation";
function DataTableCustom({data}) {
  const router = useRouter()
 const columns = [
  { accessorKey: "id", header: "ID" },
  
  {
    accessorKey: "file",
    header: "Photo",
    cell: ({ row }) => (<img
      src={row.original.file}
      alt="Property"
      style={{
        width: 40,
        height: 40,
        borderRadius: "12px",
        objectFit: "cover",
      }}
    />
    ),
  },
  { accessorKey: "name_en", header: "Name In English" ,
    cell: ({ row }) => (<div
      style={{
        width: 200,
      }}
    > {row.original.name_en}</div>
     ), 
  },
  { accessorKey: "name_ar", header: "Name In Arabic",
    cell: ({ row }) => (<div
      style={{
        width: 200,
      }}
    > {row.original.name_ar}</div>
     ),
    },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "bathrooms", header: "Bathrooms" },
  { accessorKey: "bedrooms", header: "Bedrooms" },
  { accessorKey: "beds", header: "Beds" },
  { accessorKey: "guests", header: "Guests" },
  { accessorKey: "registration_number", header: "Registeration Number" ,
    cell: ({ row }) => (<div
      style={{
        width: 150,
      }}
    > {row.original.registration_number}</div>
     ),
  },
  { accessorKey: "features", header: "Features" },
  { accessorKey: "ready", header: "Ready",
    cell: ({ row }) => (
      <span className={row.original.ready  ?"badge bg-success me-1" : "badge bg-danger me-1"}>{row.original.ready ? "Yes" : "No"}</span>
  ), },
  { accessorKey: "furnishing", header: "Furnishing",
    cell: ({ row }) => (
      <span className={row.original.furnishing ?"badge bg-success me-1" : "badge bg-danger me-1"}>{row.original.furnishing ? "Yes" : "No"}</span>
  ), },
  { accessorKey: "owner", header: "Owner" },
  { accessorKey: "addedBy", header: "Added By" },
  { accessorKey: "action", header: "Action",
    cell: ({ row }) => (<div className="d-flex gap-2">
      <button onClick={()=>router.push(`/properties/edit/${row.original.id_basic}`)} className="btn btn-sm btn-warning rounded-pill">Edit</button>
      <button className="btn btn-sm btn-danger rounded-pill">Delete</button>
    </div>
    ),
   },
];
   
    return ( <>

    <DataTable data={data} columns={columns} />
    
    
    </> );
}

export default DataTableCustom;
