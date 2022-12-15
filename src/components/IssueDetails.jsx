import { useParams } from "react-router-dom";
import {useQuery} from "react-query";
import {IssueHeader} from "./IssueHeader";
import {useUserData} from "../helpers/useUserData";
import {relativeDate} from "../helpers/relativeDate";

const useIssueData = (issueNumber) => {
  return useQuery(["issue", issueNumber], () =>
      fetch(`/api/issues/${issueNumber}`).then((res) => res.json())
    );
};

const useIssueComments = (issueNumber) => {
    return useQuery(["issues", issueNumber, "comments"], () =>
        fetch(`/api/issues/${issueNumber}/comments`).then((res) => res.json())
        );
}

const Comment = ({
    comment, createdBy, createdDate
                 }) => {

  const userQuery = useUserData(createdBy);

  if (userQuery.isLoading) return <div className="comment">
    <div>
      <div className="comment-header">Loading...</div>
    </div>
  </div>;

    return (
        <div className="comment">
          <img src={userQuery.data.profilePictureUrl} alt="Commenter's avatar" />
            <div>
              <div className="comment-header">
                <span>{userQuery.data.name}</span> commented {" "}
                <span>{relativeDate(createdDate)}</span>
              </div>
              <div className="comment-body">{comment}</div>
            </div>
        </div>
    );
}

export default function IssueDetails() {
  const { number } = useParams();
  const { data: issue, isLoading } = useIssueData(number);
  const { data: comments, isLoading: commentsLoading } = useIssueComments(number);

  return <div className="issue-details">
    {isLoading ? <p>Loading issue...</p> : (
        <div>
          <IssueHeader {...issue}/>
          <main>
            <section>
              {isLoading ? <p>Loading comments...</p> : (
                  comments?.map((comment) => (
                      <Comment key={comment.id} {...comment}/>
                  ))
              )}
            </section>
            <aside>

            </aside>
          </main>
        </div>
      )}
  </div>;
}
