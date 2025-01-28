"use client"
import { useEffect, useState } from "react";
import { getProperties } from "@/lib/property/getProperties";
import DataTableCustom from "./dataTableCustom";
import Pagination from "@/components/dataTable/pagination";
import { Card, CardBody} from "react-bootstrap";
import { useSearchParams } from 'next/navigation';

export default function CatchData() {

  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch initial data on the server-side (SSR-like)
  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const limit =   parseInt(searchParams.get('limit')) || 5;
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getProperties(page, limit);
        if (!result.success) {
          // Handle error (you can set an error state and show it)
          console.error("Error fetching data:", result.message);
        } else {
          const formattedData = result.data.data.map((element, index) => ({
            id: index + 1,
            id_basic : element._id,
            name_en: element.name_en || "",
            name_ar: element.name_ar || "",
            registration_number: element.registration_number || "-",
            type: element.type?.name_en || "-",
            bathrooms: element.bathrooms || "",
            bedrooms: element.bedrooms || "",
            beds: element.beds || "",
            guests: element.guests || "",
            features: element.features?.length || "",
            furnishing: element.furnishing || "",
            ready: element.ready || "",
            file: element.files[0].url || "",
            addedBy: element.added_by.email || "",
            owner: element.owner.email || ""
          }));

          setData(formattedData);
          setMeta(result.data.meta);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]); // Re-fetch when page or limit changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card>
        <CardBody>
          <DataTableCustom data={data} />
          {meta && <Pagination name={"properties"} meta={meta} />}
        </CardBody>
      </Card>
    </>
  );
}