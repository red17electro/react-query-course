import {useLabelsData} from "../helpers/useLabelsData";
import {useState} from "react";
import {GoGear} from "react-icons/all";
import {useMutation, useQueryClient} from "react-query";

export const IssueLabels = ({labels, issueNumber}) => {
    const labelsQuery = useLabelsData();
    const [menuOpen, setMenuOpen] = useState(false);

    const queryClient = useQueryClient();
    const setLabels = useMutation((labelId) => {
        const newLabels = labels.includes(labelId) ? labels.filter((label) => label !== labelId) : [...labels, labelId];
        return fetch(`/api/issues/${issueNumber}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({labels: newLabels})
        }).then(res => res.json());
    }, {
        onMutate: (labelId) => {
            const oldLabels = queryClient.getQueryData(["issues", issueNumber]).labels;
            const newLabels = oldLabels.includes(labelId) ? oldLabels.filter((label) => label !== labelId) : [...oldLabels, labelId];
            queryClient.setQueryData(["issues", issueNumber], (data) => {
                return {...data, labels: newLabels};
            });

            return function rollback() {
                queryClient.setQueryData(["issues", issueNumber], (data) => {
                    const rollbackLabels = oldLabels.includes(labelId)? [...data.labels, labelId] : data.labels.filter((label) => label !== labelId);
                    return {...data, labels: rollbackLabels};
                });
            }
        },
        onError: (error, variables, rollback) => {
            rollback();
        },
        onSettled: () => {
            queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
        }});

    return (
        <div className="issue-options">
            <div>
                <span>Labels</span>
                {labelsQuery.isLoading ? null :
                    labels.map(label => {
                        const labelObject = labelsQuery.data.find(l => l.id === label);
                        if (!labelObject) return null;
                        return <span key={label} className={`label ${labelObject.color}`}>{
                            labelObject.name
                        }</span>;
                    })
                }
            </div>
            <GoGear onClick={() => !labelsQuery.isLoading && setMenuOpen(open => !open)}/>
            {menuOpen && <div className="picker-menu labels">
                {labelsQuery.data?.map(label => {
                    const selected = labels.includes(label.id);
                    return <div onClick={()=>setLabels.mutate(labels.id)} key={label.id} className={selected ? 'selected' : ""}>
                        <span className="label-dot" style={{backgroundColor: label.color}}>{label.name}</span>
                    </div>
                })}
            </div>}
        </div>
    );
}
