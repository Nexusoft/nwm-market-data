import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { createChart } from 'lightweight-charts';

import { refreshCandles } from 'actions/market';

const Container = styled.div({
  height: 500,
});

export default function CandlestickChart({ pairID }) {
  const containerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ui.market.candlestick[pairID]);

  useEffect(() => {
    // TODO: Batch
    dispatch(refreshCandles(pairID));
  }, []);

  useEffect(() => {
    if (data && !chartRef.current) {
      const chart = createChart(containerRef.current);
      seriesRef.current = chart.addCandlestickSeries();
      seriesRef.current.setData(data);
      chartRef.current = chart;
    }
  }, [data, chartRef.current]);

  return <Container ref={containerRef} />;
}
