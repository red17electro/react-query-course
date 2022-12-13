import {useQuery} from "react-query";
import {IssueItem} from "./IssueItem";

export default function IssuesList() {
    const {data, isLoading } = useQuery(["issues"], () =>
        fetch("/api/issues").then((res) => res.json())
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Issues List</h1>
            <ul className="issues-list">
                {data.map((issue) => (
                    <IssueItem
                        key={issue.id}
                        title={issue.title}
                        number={issue.number}
                        assignee={issue.assignee}
                        commentCount={issue?.comments?.length}
                        createdBy={issue.createdBy}
                        createdDate={issue.createdDate}
                        labels={issue.labels}
                        status={issue.status}></IssueItem>
                ))}
            </ul>
        </div>
    );
}
