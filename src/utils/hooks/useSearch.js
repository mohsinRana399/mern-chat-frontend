import { useEffect, useState } from "react";

const useSearch = (searchQuery, allData, filterProp) => {
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    if (searchQuery?.length > 0)
      setFilteredData(
        allData?.filter((elem) =>
          elem?.[filterProp]?.toLowerCase()?.includes(searchQuery)
        )
      );
    else setFilteredData(allData);
    // eslint-disable-next-line
  }, [searchQuery, allData]);
  return filteredData;
};

export default useSearch;
