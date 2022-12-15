import {useLabelsData} from "../helpers/useLabelsData";

export const Label = ({label}) => {
    const labelsData = useLabelsData();
    if (labelsData.isLoading) {
        return null;
    }

    const labelObj = labelsData?.data?.find((labelObj) => labelObj.id === label);

    if (!labelObj) {
        return null;
    }
    return (
        <span className={`label ${labelObj.color}`}>
              {labelObj.name}
            </span>
    )
}
