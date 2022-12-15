import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { useState } from "react";

export default function Issues() {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList status={status} labels={labels} />
        </section>
        <aside>
          <LabelList
            selected={labels}
            toggle={(label) =>
              setLabels((currentLabels) =>
                currentLabels.includes(label)
                  ? currentLabels.filter(
                      (currentLabel) => currentLabel !== label
                    )
                  : currentLabels.concat(label)
              )
            }
          />
          <h3>Status</h3>
          <StatusSelect value={status} onChange={(event)=>{setStatus(event.target.value)}} />
        </aside>
      </main>
    </div>
  );
}

const possibleStatuses = [
    {id: "backlog", label: "Backlog"},
    {id: "todo", label: "To do"},
    {id: "inProgress", label: "In Progress"},
    {id: "done", label: "Done"},
    {id: "cancelled", label: "Cancelled"},
];
const StatusSelect = ({value, onChange}) => {
    return (
        <select className="status-select" value={value} onChange={onChange}>
            <option value="">Select the status to filter</option>
            {
                possibleStatuses.map((status) => (
                    <option key={status.id} value={status.id}>{status.label}</option>
                ))
            }
        </select>
    );
}
