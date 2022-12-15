import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList({selectedLabels}) {
  const issuesQuery = useQuery(["issues", selectedLabels], () => {
    const queryStr = selectedLabels.length > 0 ? `labels[]=${selectedLabels.join("&")}` : "";
    return fetch(`/api/issues?${queryStr}`).then((res) => res.json());
    }
  );
  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesQuery?.data?.map((issue) => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              status={issue.status}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
