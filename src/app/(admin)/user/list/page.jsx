import { getUsers } from "@/lib/user/getUsers";
import DataTable from "./dataTable";

// Server-side fetching of users with pagination
export default async function UserPage({ searchParams }) {
  const page = searchParams.page || 1; // Default to page 1 if no page is specified
  const limit = searchParams.limit || 5; // Default to page 1 if no page is specified
  const result = await getUsers(page,limit);

  if (!result.success) {
    return <p>Error: {result.message}</p>;
  }

  const data = result.data.data.map((user, index) => ({
    id: index + 1,
    name: user.name || "",
    email: user.email || "",
    role: user.role || "",
    country_dial: user.country_dial || "",
    phone_number: user.phone_number || "",
    active: user.active || false,
    file: user.file?.url || "https://via.placeholder.com/40",
  }));

  return (
    <div>
      <h1>User List (SSR with Pagination)</h1>
      <DataTable data={data} page={parseInt(page)} />
      
    
    </div>
  );
}