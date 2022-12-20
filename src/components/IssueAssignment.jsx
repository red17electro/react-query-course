import {useUserData} from "../helpers/useUserData";
import {GoGear} from "react-icons/all";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";

export const IssueAssignment = (({assignee, issueNumber}) => {
  const user = useUserData(assignee);
  const [menuOpen, setMenuOpen] = useState(false);
  const usersQuery = useQuery(["users"], ({signal}) => {
    return fetch(`/api/users`, {signal}).then((res) => res.json());
  });

    const queryClient = useQueryClient();
    const setAssignment = useMutation((assignee) => {
        return fetch(`/api/issues/${issueNumber}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({assignee})
        }).then(res => res.json());
    }, {
        onMutate: (assignee) => {
            const oldAssignee = queryClient.getQueryData(["issues", issueNumber]).assignee;
            queryClient.setQueryData(["issues", issueNumber], (data) => {
                return {...data, assignee: assignee};
            });

            return function rollback() {
                queryClient.setQueryData(["issues", issueNumber], (data) => {
                    return {...data, assignee: oldAssignee};
                });
            }
        },
        onError: (error, variables, rollback) => {
            rollback();
        },
        onSettled: () => {
            queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
        }
    });

    return <div className="issue-options">
      <div>
          <span>Assignment</span>
          {
              user.isSuccess && <div>
                    <img src={user.data.profilePictureUrl} alt="Assignee Avatar" />
                  {user.data.name}
              </div>
          }
      </div>
    <GoGear onClick={() => !usersQuery.isLoading && setMenuOpen(() => !open)}/>
        {menuOpen && <div className="menu">
            {usersQuery.data?.map((user) => {
                return <div key={user.id} onClick={()=>setAssignment.mutate(user.id)}>
                    <img src={user.profilePictureUrl}/>
                    {user.name}
                </div>
            })}
        </div>}
  </div>
});
