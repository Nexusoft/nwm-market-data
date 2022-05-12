import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Highcharts from 'highcharts';

import { refreshOrderBook } from 'actions/market';

const Container = styled.div({
  height: 360,
});

export default function DepthChart({ pairID }) {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ui.market.orderBook[pairID]);
  const theme = useTheme();

  useEffect(() => {
    // TODO: Batch
    dispatch(refreshOrderBook(pairID));
  }, []);

  useEffect(() => {
    if (data) {
      Highcharts.chart(containerRef.current, {
        chart: {
          type: 'area',
          zoomType: 'xy',
          backgroundColor: theme.lower(theme.background, 0.15),
          borderWidth: 0,
        },
        title: {
          text: null,
        },
        xAxis: {
          minPadding: 0,
          maxPadding: 0,
          gridLineColor: theme.mixer(0.125),
          gridLineWidth: 1,
          labels: {
            style: {
              color: theme.mixer(0.75),
            },
          },
          title: {
            text: 'Price',
            style: {
              color: theme.mixer(0.75),
            },
          },
        },
        yAxis: [
          {
            lineWidth: 1,
            gridLineWidth: 0,
            title: null,
            labels: {
              align: 'left',
              x: 8,
              style: {
                color: theme.mixer(0.75),
              },
            },
          },
          {
            opposite: true,
            linkedTo: 0,
            lineWidth: 1,
            gridLineColor: theme.mixer(0.125),
            gridLineWidth: 1,
            title: null,
            labels: {
              align: 'right',
              x: -8,
              style: {
                color: theme.mixer(0.75),
              },
            },
          },
        ],
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillOpacity: 0.25,
            lineWidth: 1,
            step: 'center',
          },
        },
        tooltip: {
          headerFormat: '<span>Price: {point.key}</span><br>',
          valueDecimals: 2,
        },
        series: [
          {
            name: 'Bids',
            color: theme.primary,
            data: data.bids,
          },
          {
            name: 'Asks',
            color: theme.danger,
            data: data.asks,
          },
        ],
      });
    }
  }, [data]);

  return <Container ref={containerRef} />;
}
