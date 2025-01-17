"use client"
import Link from "next/link";
import { Row ,Col} from "react-bootstrap";
import IconifyIcon from "@/components/wrapper/IconifyIcon";
import Dropdown  from "./dropdown";


const Pagination = ({ meta }) => {
  const currentPage = parseInt(meta.current_page);
  const lastPage = parseInt(meta.last_page);
  return (
    <Row className="pt-2">
      <Col>
        {meta.per_page} Row from {meta.total}
      </Col>
      <Col className="flex">
    
      <nav style={{display:"flex",alignItems:"center",gap:"5px",justifyContent:"end"}} aria-label="Page flex navigation example">
         <Dropdown/>
        <ul className="pagination mb-0">
          {/* First Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <Link
              className="page-link"
              href={`/features/list?page=1`}
              aria-label="Previous"
            >
              <span aria-hidden="true">«</span>
            </Link>
          </li>
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <Link
              className="page-link"
              href={`/features/list?page=${currentPage - 1}`}
              aria-label="Previous"
            >
              <span aria-hidden="true">
              <IconifyIcon icon="bx:chevron-left" height={16} width={16} />
              </span>
            </Link>
          </li>

          {/* First Page */}
          {currentPage > 2 && (
            <li className="page-item">
              <Link className="page-link" href={`/features/list?page=1`}>
                1
              </Link>
            </li>
          )}

          {/* Previous Page (if not first) */}
          {currentPage > 2 && (
            <li className="page-item">
              <Link className="page-link" href={`/features/list?page=${currentPage - 1}`}>
                {currentPage - 1}
              </Link>
            </li>
          )}

          {/* Current Page */}
          <li className="page-item active">
            <span className="page-link">{currentPage}</span>
          </li>

          {/* Next Page (if not last) */}
          {currentPage < lastPage - 1 && (
            <li className="page-item">
              <Link className="page-link" href={`/features/list?page=${currentPage + 1}`}>
                {currentPage + 1}
              </Link>
            </li>
          )}

          {/* Last Page */}
          {currentPage < lastPage - 1 && (
            <li className="page-item">
              <Link className="page-link" href={`/features/list?page=${lastPage}`}>
                {lastPage}
              </Link>
            </li>
          )}

          {/* Next Button */}
          <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
            <Link
              className="page-link"
              href={`/features/list?page=${currentPage + 1}`}
              aria-label="Next"
            >
              <span aria-hidden="true">
              <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
              </span>
            </Link>
          </li>
          {/* First Button */}
          <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
            <Link
              className="page-link"
              href={`/features/list?page=${lastPage}`}
              aria-label="Previous"
            >
              <span aria-hidden="true">»</span>
            </Link>
          </li>
        </ul>
      </nav>
      </Col>
     
      
    </Row>
  );
};

export default Pagination;