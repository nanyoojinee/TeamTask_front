import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getResourceChartData } from '../../features/resourceChart/resourceChartSlice';
import { RootState, AppDispatch } from '../../app/store';

const ResourceChartPage: React.FC = () => {
  // Use AppDispatch to type the dispatch function
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector((state: RootState) => state.resourceChart);

  useEffect(() => {
    dispatch(getResourceChartData());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Resource Chart</h2>
      {/* Render chart or visualize data here */}
    </div>
  );
};

export default ResourceChartPage;
