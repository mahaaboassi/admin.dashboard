"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormSelect } from "react-bootstrap";

const Dropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLimit = searchParams.get("limit") || 5;

  const handleChange = (event) => {
    const newLimit = event.target.value;
    router.push(`/features/list?page=1&limit=${newLimit}`);
  };

  return (
    <div style={{ width: '200px' }} >
        <FormSelect  defaultValue={currentLimit} onChange={handleChange} id="example-select">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="All">All</option>
        </FormSelect>
    </div>
  );
};

export default Dropdown;