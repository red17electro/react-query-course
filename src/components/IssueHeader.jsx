import {possibleStatus} from "../helpers/defaultData";
import {useUserData} from "../helpers/useUserData";
import {GoIssueClosed, GoIssueOpened} from "react-icons/go";
import {relativeDate} from "../helpers/relativeDate";

export const IssueHeader = ({
                         title,
                         number,
                         comments,
                         createdBy,
                         createdDate,
                         status = "todo",
                     }) => {
    const statusObject = possibleStatus.find((status) => status.id === status);
    const createdByUser = useUserData(createdBy);
    return (
        <header>
            <h2>
                {title} <span>#{number}</span>
            </h2>
            <div>
          <span className={status === "done" || status === "cancelled" ? "closed" : "open"}>
          {status === "done" || status === "cancelled" ? (
                  <GoIssueClosed/>
              ) :
              (
                  <GoIssueOpened />
              )}
              {statusObject?.label}
          </span>
                <span className="created-by">
            {createdByUser.isLoading ? "..." : createdByUser?.data?.name}
          </span>{" "}
                opened this issue {relativeDate(createdDate)} · {comments.length} comments
            </div>
        </header>
    );
}
