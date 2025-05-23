import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ManageBrokers from "../../components/dashboard-admin/manage-brokers";

const index = () => {
  return (
    <>
      <Seo pageTitle="Manage Brokers" />
      <ManageBrokers />
    </>
  );
};

export default index;
// export default dynamic(() => Promise.resolve(index), { ssr: false });
