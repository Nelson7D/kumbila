import React from "react";
import OwnerStatCards from "./OwnerStatCards";
import OwnerSpacesSection from "./OwnerSpacesSection";
import OwnerReservationsSection from "./OwnerReservationsSection";
import OwnerReportsSection from "./OwnerReportsSection";

export default function OwnerDashboardMain(props) {
  const {
    activeTab,
    loading,
    spaces,
    reservations,
    stats,
    setActiveTab,
    timeframe,
    setTimeframe,
    onViewReservationDetails,
  } = props;

  if (activeTab === "dashboard") {
    return (
      <>
        <OwnerStatCards {...props} />
      </>
    );
  }
  if (activeTab === "spaces") {
    return (
      <OwnerSpacesSection
        loading={loading}
        spaces={spaces}
        setActiveTab={setActiveTab}
      />
    );
  }
  if (activeTab === "reservations") {
    return (
      <OwnerReservationsSection
        loading={loading}
        reservations={reservations}
        onViewReservationDetails={onViewReservationDetails}
      />
    );
  }
  if (activeTab === "reports") {
    return (
      <OwnerReportsSection
        stats={stats}
        loading={loading}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />
    );
  }
  return null;
}