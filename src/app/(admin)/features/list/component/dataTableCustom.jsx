"use client"
import DataTable from "@/components/dataTable/dataTable"
function DataTableCustom({data}) {
  const bufferToString = (buffer) => {
    return new TextDecoder().decode(new Uint8Array(buffer));
};  
 const columns = [
  { accessorKey: "id", header: "ID" },
  // {
  //   accessorKey: "file",
  //   header: "Photo",
  //   cell: ({ row }) => (<div dangerouslySetInnerHTML={{ __html: bufferToString(row.original.file.data)}} />
  //   ),
  // },
  { accessorKey: "name_en", header: "Name In English" },
  { accessorKey: "name_ar", header: "Name In Arabic" },
  { accessorKey: "description_en", header: "Description In English" },
  { accessorKey: "description_ar", header: "Description In Arabic" },
  { accessorKey: "subFeatures", header: "Sub Features" },
  { accessorKey: "addedBy", header: "Added By" },
  
];
   
    return ( <>
    <DataTable data={data} columns={columns} />
    
    
    </> );
}

export default DataTableCustom;
