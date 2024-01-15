// JobCardList.js
import React from "react";
import JobCard from "./JobCard";
import "./JobCard.css";

function JobCardList({ jobs }) {
  console.debug("JobCardList", "jobs=", jobs);

  return (
    <div className="JobCardList">
      {jobs.map((j) => (
        <JobCard
          key={j.id}
          id={j.id}
          title={j.title}
          salary={j.salary}
          equity={j.equity}
          companyName={j.companyName}
        />
      ))}
    </div>
  );
}

export default JobCardList;
