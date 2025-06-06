import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SVGArrowDown from "./icons/SVGArrowDown";
import SVGArrowUp from "./icons/SVGArrowUp";
import SVGChevronLeft from "./icons/SVGChevronLeft";
import SVGChevronRight from "./icons/SVGChevronRight";
import { FaDownload, FaInfoCircle, FaRedo } from "react-icons/fa";
import * as XLSX from "xlsx";
import SearchUser from "./SearchUser";
import toast from "react-hot-toast";
import NoDataFound from "../../common/NoDataFound";
import LoadingSpinner from "../../common/LoadingSpinner";
import { getTheDownloadView } from "../../common/UserViewPDFDownload";

function SmartTable(props) {
  const [loading, setLoading] = useState(false);
  const [sortDesc, setSortDesc] = useState({});
  const [tableWidth, setTableWidth] = useState(1000);
  const [data, setData] = useState(props.data);
  const componentRef = useRef();
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage ?? 10);
  const [rowsPerPageOptions] = useState(
    props.rowsPerPageOptions ?? [5, 10, 25, 50]
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(props.total ?? 0);
  const fetchData = useCallback(
    async (queryString) => {
      setLoading(true);

      try {
        const response = await fetch(
          props.url + (queryString ? queryString : ""),
          {
            method: "get",
          }
        );
        const data = await response.json();
        if (data && data.data) {
          setData(data.data.result ?? []);
          setTotal(data.data.total, 0);
        }
      } catch (e) {}
      setLoading(false);
    },
    [props.url]
  );

  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    if (props?.dataFetched && props?.properties?.length === 0) {
      const timer = setTimeout(() => {
        setShowNoData(true);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [props.dataFetched, props.properties]);

  const handlePrint = async () => {
    const headers = [
      ["sno", "S. No"],
      ["broker", "Broker Name"],
      ["currentsubscription", "Plan Name"],
      ["expirydateofsubscirption", "Validity"],
      ["submitted_properties", "Properties Submitted"],
      ["accepted_properties", "Accepted Properties"],
      ["progress_properties", "Properties Inprogress"],
      ["completed_properties", "Completed Properties"],
      ["status", "Status"],
    ];
    getTheDownloadView(
      "broker_Details",
      props.properties,
      "Mortgage Broker",
      headers
    )
      .then((message) => {
        toast.success(message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const tableWidthFunc = useCallback(() => {
    let tempTableWidth = 0;
    props.headCells.map((cell) => (tempTableWidth += cell.width));

    if (tempTableWidth) setTableWidth(tempTableWidth);
  }, [props.headCells]);

  useEffect(() => {
    tableWidthFunc();
    if (props.url && !props.data)
      fetchData(`?limit=${props.rowsPerPage ?? 10}`);
  }, [
    props.url,
    props.data,
    props.rowsPerPage,
    props.headCells,
    tableWidthFunc,
    fetchData,
  ]);
  // console.log(props.data);

  const buildQueryString = (search, page, rowsPerPage) => {
    const queries = [];

    if (page) queries.push((page = `${page}`));
    if (rowsPerPage) queries.push(`limit=${rowsPerPage}`);
    if (search) queries.push(`search=${search.toLowerCase()}`);

    const queryString = queries.join("&");

    return queryString ? `?${queryString}` : "";
  };

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const extractTextContent = (cellValue) => {
    if (typeof cellValue === "string") {
      return cellValue; // If it's a string, return it as is
    } else if (typeof cellValue === "object" && cellValue.$$typeof) {
      // If it's a React element, extract text content recursively from children
      return extractTextContent(cellValue.props.children);
    } else {
      return String(cellValue); // Convert other types to string and return
    }
  };

  const extractTextContentFromDate = (value) => {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  };

  const extractNumericValue = (str) => {
    const numericStr = str.replace(/[^0-9]/g, "");
    const numericValue = parseInt(numericStr, 10);

    return numericValue;
  };

  const sortableColumns = [
    // "expiryDateOfSubscirption",
    // "quote_required_by",
    // "estimated_value",
    "broker",
    "status",
    "currentsubscription",
    "sno",
  ]; // Add allowed columns

  const sortData = (cell) => {
    // Allow sorting only if the column is in the sortable list
    if (!sortableColumns.includes(cell)) {
      return; // Do nothing if the column is not sortable
    }

    let tempData = [...props.properties];

    // Toggle sorting order for the current column
    setSortDesc((prevSortDesc) => ({
      ...prevSortDesc,
      [cell]: !prevSortDesc[cell],
    }));

    const newSortDesc = !sortDesc[cell];

    // Define a function to extract sortable values
    const getSortableValue = (item) => {
      if (cell === "date" || cell === "quote_required_by") {
        return new Date(extractTextContentFromDate(item[cell])).getTime() || 0;
      }
      if (cell === "estimated_value") {
        return extractNumericValue(item[cell]) || 0;
      }
      // For text fields like appraiser company
      return (extractTextContent(item[cell]) || "").trim().toLowerCase();
    };

    // Sort the data
    tempData.sort((a, b) => {
      let valueA = getSortableValue(a);
      let valueB = getSortableValue(b);

      return newSortDesc
        ? valueB > valueA
          ? 1
          : -1
        : valueA > valueB
        ? 1
        : -1;
    });

    // Update state with sorted data
    setData(tempData);
  };

  return (
    <div className="col-12 p-0">
      <div className="smartTable-container row">
        <div className="col-12">
          <div className="col-lg-12" style={{ marginTop: "10px" }}>
            <div
              className="mb-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <div className="d-flex">
                <SearchUser
                  searchInput={props.searchInput}
                  setSearchInput={props.setSearchInput}
                />
                <button
                  className="btn btn-color m-1"
                  onClick={() => handlePrint()}
                  title="Download Pdf"
                >
                  <FaDownload />
                </button>
                <button
                  className="btn btn-color m-1"
                  onClick={() => props.refreshHandler()}
                  title="Refresh"
                >
                  <FaRedo />
                </button>
              </div>
            </div>
          </div>
          {props?.data?.length > 0 ? (
            <div className="row mt-3">
              <div className="smartTable-tableContainer" id="table-container">
                <table
                  className={"smartTable-table table table-striped border"}
                  style={{ minWidth: tableWidth }}
                >
                  <thead className="smartTable-thead">
                    <tr>
                      {props?.headCells.map((headCell) => {
                        const isSortable =
                          sortableColumns.includes(headCell.id) &&
                          headCell.id !== "address";
                        const isSorted = sortDesc[headCell.id] !== undefined;

                        return (
                          <th
                            id={headCell.id}
                            key={headCell.id}
                            scope="col"
                            style={{
                              // width: headCell.width,
                              backgroundColor: "#2e008b",
                              color: "white",
                            }}
                            className={isSortable ? "smartTable-pointer" : ""}
                            onClick={() => isSortable && sortData(headCell.id)}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center", // Center horizontally
                                gap: "6px",
                                minHeight: "24px", // optional: to keep row height consistent
                              }}
                            >
                              {headCell.label}

                              {/* Info icon only for sortable columns */}
                              {isSortable && (
                                <span
                                  title="This column is sortable. Click to sort ascending/descending."
                                  style={{ cursor: "", fontSize: "14px" }}
                                >
                                  <FaInfoCircle />
                                </span>
                              )}

                              {/* Sort direction icon */}
                              {isSorted &&
                                (sortDesc[headCell.id] ? (
                                  <span>🔽</span> // Replace with <SVGArrowDown /> if needed
                                ) : (
                                  <span>🔼</span> // Replace with <SVGArrowUp /> if needed
                                ))}
                            </span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0
                      ? data.map((row, idx) => {
                          // if (idx >= props.start && idx <= props.end) {
                          return (
                            <tr key={"tr_" + idx}>
                              {props?.headCells.map((headCell, idxx) => {
                                return (
                                  <td key={"td_" + idx + "_" + idxx}>
                                    {headCell.render
                                      ? headCell.render(row)
                                      : row[headCell.id]}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                          // } else {
                          //   return null; // Skip rendering rows that don't meet the condition
                          // }
                        })
                      : props?.data.map((row, idx) => {
                          // if (idx >= props.start && idx <= props.end) {
                          return (
                            <tr key={"tr_" + idx}>
                              {props?.headCells.map((headCell, idxx) => {
                                return (
                                  <td key={"td_" + idx + "_" + idxx}>
                                    {headCell.render
                                      ? headCell.render(row)
                                      : row[headCell.id]}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                          // } else {
                          //   return null; // Skip rendering rows that don't meet the condition
                          // }
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="row">
              <div
                className="smartTable-noDataFound col-12"
                style={{ marginTop: "100px", marginBottom: "40px" }}
              >
                {props?.dataFetched && props?.properties?.length === 0 ? (
                  showNoData ? (
                    <NoDataFound />
                  ) : (
                    <LoadingSpinner />
                  )
                ) : (
                  <LoadingSpinner />
                )}
              </div>
            </div>
          )}
          {props?.noPagination || data?.length === 0 || !props?.url ? (
            <div className="row">
              <div className="col-12 text-end p-3">
                {props?.data?.length > 0 ? props?.data?.length : 0} Records
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12 text-end p-3">
                <span>
                  Rows per page:{" "}
                  <select
                    name="rowsPerPage"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(e.target.value);
                      fetchData(buildQueryString(search, page, e.target.value));
                    }}
                  >
                    {rowsPerPageOptions.map((nbr, idx) => {
                      return (
                        <option key={"rowsPerPageOptions_" + idx} value={nbr}>
                          {nbr}
                        </option>
                      );
                    })}
                  </select>
                </span>
                <span className="ms-4">
                  {(page - 1) * rowsPerPage + 1}-
                  {(page - 1) * rowsPerPage + data.length} of {total}
                </span>
                <span
                  className={page === 1 ? "ms-4" : "smartTable-pointer ms-4"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (page === 1) return;
                    setPage(page - 1);
                    fetchData(buildQueryString(search, page - 1, rowsPerPage));
                  }}
                >
                  <SVGChevronLeft
                    color={page === 1 ? "lightgray" : undefined}
                  />
                </span>
                <span
                  className={
                    page * rowsPerPage >= total
                      ? "ms-4"
                      : "smartTable-pointer ms-4"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if ((page - 1) * rowsPerPage > total) return;
                    setPage(page + 1);
                    fetchData(buildQueryString(search, page + 1, rowsPerPage));
                  }}
                >
                  <SVGChevronRight
                    color={
                      page * rowsPerPage >= total ? "lightgray" : undefined
                    }
                  />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

SmartTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.Object),
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  total: PropTypes.number,
  url: PropTypes.string,
  headCells: PropTypes.arrayOf(
    //means Object
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number, //px
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ),
};

export default SmartTable;
