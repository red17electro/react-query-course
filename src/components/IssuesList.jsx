import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";
import {useState} from "react";

export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(["issues", { labels, status }], () => {
    const statusString = status ? `&status=${status}` : "";
    const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
    return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
      res.json()
    );
  }, {
      staleTime: 1000 * 60 * 1, // 1 minute
  });

  const [search, setSearch] = useState("");

  const searchQuery = useQuery(["issues", { search }], () => {
    return fetch(`/api/search/issues?q=${search}`).then((res) =>
      res.json()
    );
  }, { enabled: search.length > 0 });

  return (
    <div>
      <form onSubmit={(event) => {
          event.preventDefault();
          setSearch(event.target.elements.search.value);
        }
      }>
        <label htmlFor="search">Search Issues</label>
        <input type="text" id="search" name="search" placeholder="Search" onChange={(event) => {
             event.preventDefault();
             if (event.target.value.length === 0) {
               setSearch("");
             }
        }
        } />
      </form>
        <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : searchQuery.fetchStatus === 'idle' && searchQuery.isLoading === true ?
          (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
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
      ) : <>
              <h2>Search Results: </h2>
              {
                  searchQuery.isLoading? (
                      <p>Loading...</p>
                  ): (
                      <>
                        <p>{searchQuery.data.count} Results</p>
                          <ul className="issues-list">
                               {searchQuery.data.items.map((issue) => (
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
                      </>
                  )
              }
          </>
      }
    </div>
  );
}
