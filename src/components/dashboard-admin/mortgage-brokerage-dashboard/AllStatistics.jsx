const AllStatistics = ({ dashboardCount }) => {
  const allStatistics = [
    // New cards for Plans
    {
      id: 9,
      blockStyle: "stylecardnew9",
      icon: "fa fa-star",
      timer: dashboardCount?.ultimatePlan, // Ultimate Plan count
      name: "Ultimate Plan",
    },
    {
      id: 8,
      blockStyle: "stylecardnew8",
      icon: "fa fa-star-half",
      timer: dashboardCount?.proPlan, // Pro Plan count
      name: "Pro Plan",
    },
    {
      id: 7,
      blockStyle: "stylecardnew7",
      icon: "fa fa-star-o",
      timer: dashboardCount?.litePlan, // Lite Plan count
      name: "Lite Plan",
    },
    {
      id: 1,
      blockStyle: "stylecardnew1",
      icon: "fa fa-user",
      timer: dashboardCount?.totalBroker,
      name: "Total Brokers",
    },
    {
      id: 2,
      blockStyle: "stylecardnew2",
      icon: "fa fa-users",
      timer: dashboardCount?.totalActiveBrokers,
      name: "Total Active Mortgage Brokerage",
    },
    {
      id: 3,
      blockStyle: "stylecardnew3",
      icon: "fa fa-file",
      timer: dashboardCount?.totalPropertiesSubmitted,
      name: "Total Properties Submitted",
    },
    {
      id: 4,
      blockStyle: "stylecardnew4",
      icon: "fa fa-check",
      timer: dashboardCount?.totalQuotesReceived,
      name: "Total Quotes Received",
    },
    {
      id: 6,
      blockStyle: "stylecardnew6",
      icon: "fa fa-check-circle",
      timer: dashboardCount?.totalQuotesCompleted,
      name: "Total Quotes Completed",
    },
    {
      id: 5,
      blockStyle: "stylecardnew5",
      icon: "fa fa-edit",
      timer: dashboardCount?.totalquotesinprogress,
      name: " Total Quotes in Progress",
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        // <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
        <div className="col-lg-4" key={item.id}>
          <div key={item.id} className={`ff_one ${item.blockStyle}`}>
            <div className="details">
              <div className="timer">{item.name}</div>
              <p>{item.timer}</p>
            </div>
            <div className="icon">
              <i className={item.icon}></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
