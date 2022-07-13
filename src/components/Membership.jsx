import React, { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { getArrangeMembershipStatus, getArrangeStatus, getArrangeUserStatus } from "../hooks/useDashboard";
import Loading from "./Loading";
import Status from "./Status";

function Membership() {
  const [meetings, setMemberships] = useState(null);
  const [loading, setLoading] = useState(false);
  const { config } = useAuth();
  const [pricingPlan, setPricingPlan] = useState(
    config && Object.keys(config.pricingPlan)
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getArrangeMembershipStatus();
      setMemberships(data);
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, []);
  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <div className="py-10 px-10">
      <div className="flex flex-wrap gap-2 justify-between ">

        {
          pricingPlan &&  pricingPlan.map((plan, index) => 
                 (
                    <Status
                    key={index}
                    value={meetings && meetings[plan]}
                    title={plan}
                    size={true}
                    />
                ))  
      }
      </div>




    </div>
  );
}

export default Membership;

