const AllStatistics = ({ dashboardCount }) => {
  const allStatistics = [
    // New cards for Plans
    {
      id: 9,
      blockStyle: "stylecardnew9",
      icon: "fa fa-star",
      timer: dashboardCount?.ultimatePlan, // Ultimate Plan count
      name: "Ultimate Plans",
    },
    {
      id: 8,
      blockStyle: "stylecardnew8",
      icon: "fa fa-star-half",
      timer: dashboardCount?.proPlan, // Pro Plan count
      name: "Pro Plans",
    },
    {
      id: 7,
      blockStyle: "stylecardnew7",
      icon: "fa fa-star-o",
      timer: dashboardCount?.litePlan, // Lite Plan count
      name: "Lite Plans",
    },
    {
      id: 1,
      blockStyle: "stylecardnew1",
      icon: "fa fa-user",
      timer: dashboardCount?.totalAppraisers,
      name: "Total Appraisers",
    },
    {
      id: 2,
      blockStyle: "stylecardnew2",
      icon: "fa fa-users",
      timer: dashboardCount?.totalActiveAppraisers,
      name: "Total Active Appraisers",
    },
    {
      id: 3,
      blockStyle: "stylecardnew3",
      icon: "fa fa-file",
      timer: dashboardCount?.totalQuotesProvided,
      name: "Total Quotes Provided",
    },
    {
      id: 4,
      blockStyle: "stylecardnew3",
      icon: "fa fa-file",
      timer: dashboardCount?.totalQuotesAccepted,
      name: "Total Quotes Accepted",
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
      timer: dashboardCount?.totalQuotesInprogress,
      name: " Total Quotes in Progress",
    },
    {
      id: 10,
      blockStyle: "stylecardnew6",
      icon: "fa fa-pause",
      timer: dashboardCount?.totalQuotesOnHold,
      name: "Total Quotes On Hold",
    },
    {
      id: 11,
      blockStyle: "stylecardnew5",
      icon: "fa fa-times-circle",
      timer: dashboardCount?.totalQuotesCancelled,
      name: " Total Quotes Cancelled",
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
