const AllStatistics = ({
  totalBids,
  acceptedBids,
  totalBidsCount,
  totalCompletedBidsCount,
  totalAcceptBidsCount,
  totalPendingBidsCount,
}) => {
  console.log(totalBids, acceptedBids, totalBidsCount);
  const allStatistics = [
    {
      id: 1,
      blockStyle: "stylecardnew1",
      icon: "fa fa-user",
      timer: totalBids,
      name: "Total Appraisers",
    },
    {
      id: 2,
      blockStyle: "stylecardnew2",
      icon: "fa fa-users",
      timer: acceptedBids,
      name: "Total Active Appraisers",
    },
    {
      id: 3,
      blockStyle: "stylecardnew3",
      icon: "fa fa-file",
      timer: totalBidsCount,
      name: "Total Quotes Provided",
    },
    {
      id: 4,
      blockStyle: "stylecardnew4",
      icon: "fa fa-check",
      timer: totalAcceptBidsCount,
      name: "Total Quotes Accepted",
    },
    {
      id: 5,
      blockStyle: "stylecardnew5",
      icon: "fa fa-edit",
      timer: totalPendingBidsCount,
      name: " Total Quotes Pending",
    },
    {
      id: 6,
      blockStyle: "stylecardnew6",
      icon: "fa fa-check-circle",
      timer: totalCompletedBidsCount,
      name: "Total Completed Quotes",
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        // <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
        <div className="col-lg-6" key={item.id}>
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
