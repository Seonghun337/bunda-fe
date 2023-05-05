import { useMemo, useEffect, useState } from "react";
import keyBy from "lodash/keyBy";
import { getCompareRangeTypes, getStatisticsTypes } from 'api/codeApi';

const CODE_API_MAP = {
    "STATISTICS_TYPES": getStatisticsTypes,
    "COMPARE_RANGE_TYPES": getCompareRangeTypes,
}

const EMPTY_CODE = [
   {
     "code": "ERR", "text": "연결실패"
   }
]

export default function useCodes(node, key, options) {
  const [ data, setData ] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        try{
            setData([]);
            const response = await CODE_API_MAP[node]();
            setData(response.data)
        } catch (e) {
            alert("코드를 불러오는데에 실패했습니다.");
        }
    };
    fetchData();
  }, []);

  return useMemo(() => {
    if (!data) return [EMPTY_CODE, EMPTY_CODE[0]];
    const properties = Object.keys(data);
    if (properties.length !== 1) return [data, undefined];
    const array = data[properties[0]];
    if (!key) return [array, undefined];
    return [array, keyBy(array, key)];
  }, [data, key]);
}
