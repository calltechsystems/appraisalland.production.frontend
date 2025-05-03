import Header from "../../common/header/dashboard/HeaderAdmin";
import SidebarMenu from "../../common/header/dashboard/SidebarMenuAdmin";
import MobileMenu from "../../common/header/MobileMenuAdmin";
import Filtering from "./Filtering";
import AllStatistics from "./AllStatistics";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CommonLoader from "../../common/CommonLoader/page";

const Index = () => {
  const [FilteringType, setFilteringType] = useState(1000);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardCount, setDashboardCount] = useState(null);

  useEffect(() => {
    const func = () => {
      const data = JSON.parse(localStorage.getItem("user"));
      if (!data) return;
      setIsLoading(true);

      axios
        .get("/api/getAdminDashboardIndividualAppraiserStatistics", {
          headers: {
            Authorization: `Bearer ${data?.token}`,
            "Content-Type": "application/json",
          },
          params: {
            noOfDays: FilteringType,
          },
        })
        .then((res) => {
          const dashboardData = res.data.data;
          console.log("data", dashboardData);
          setDashboardCount(dashboardData);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Dashboard fetch failed");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    func();
  }, [FilteringType, refresh]);

  const closeBrokerModal = () => {
    setOpenBrokerModal(false);
  };

  const closeStatusUpdateHandler = () => {
    setSelectedUser(-1);
    setOpenEditModal(false);
  };

  const refreshHandler = () => {
    setRefresh(true);
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      {isLoading && <CommonLoader />}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 text-center">
                  <h2 className="heading-forms">Appraiser</h2>
                </div>
                <div className="d-flex justify-content-end mb-2">
                  <Filtering
                    setRefresh={setRefresh}
                    setFilteringType={setFilteringType}
                    FilteringType={FilteringType}
                  />
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <AllStatistics dashboardCount={dashboardCount} />
                  </div>
                </div>
                {/* <div className="col-lg-5">
                    <div className="application_statics">
                      <h4 className="" style={{ color: "#97d700" }}>
                        Active Plan Wise Appraisers Company
                      </h4>
                      <StatisticsPieChart planData={planCount} />
                    </div>
                  </div> */}
              </div>

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget-dashboard text-center">
                    <p>
                      &copy; {new Date().getFullYear()} Appraisal Land. All
                      Rights Reserved.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .col */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
