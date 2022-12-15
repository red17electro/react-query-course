import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import {useState} from "react";
export default function Issues() {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const filterLabels = (labelId) => {
    if (selectedLabels.includes(labelId)) {
      setSelectedLabels(selectedLabels.filter((id) => id !== labelId));
    }
    else {
      setSelectedLabels([...selectedLabels, labelId]);
    }
  };
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList selectedLabels={selectedLabels} />
        </section>
        <aside>
          <LabelList selectedLabels={selectedLabels} toggle={(labelId) => filterLabels(labelId)} />
        </aside>
      </main>
    </div>
  );
}
