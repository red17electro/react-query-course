import {useLabelsData} from "../helpers/useLabelsData";

export default function LabelList({selectedLabels, toggle}) {
  const labelsQuery = useLabelsData();

  if (labelsQuery.isLoading) {
    return null;
  }

  return <>
    <h3>Labels</h3>
    <div className="labels">
        {labelsQuery?.data?.map(label => (
            <button onClick={() => toggle(label.id)} key={label.id} className={`label ${label.color} ${selectedLabels.includes(label.id) ? 'selected' : ''}`}>
                {label.name}
            </button>
        ))}
    </div>
  </>;
}
