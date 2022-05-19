import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panel, HorizontalTab } from 'nexus-module';

import * as TYPE from 'actions/types';
import { refreshStatuses } from 'actions/market';

import RefreshButton from './RefreshButton';
import Summary from './Summary';
import PriceAction from './PriceAction';
import MarketDepth from './MarketDepth';

export default function Main() {
  const activeTab = useSelector((state) => state.ui.activeTab);
  const dispatch = useDispatch();
  const switchTab = (tab) => {
    dispatch({
      type: TYPE.SWITCH_TAB,
      payload: tab,
    });
  };

  useEffect(() => {
    dispatch(refreshStatuses());
  }, []);

  return (
    <Panel
      controls={<RefreshButton />}
      icon={{ url: 'icons/chart.svg', id: 'icon' }}
      title={'Market Data'}
    >
      <HorizontalTab.TabBar>
        <HorizontalTab
          active={activeTab === 'summary'}
          onClick={() => {
            switchTab('summary');
          }}
        >
          24hr Summary
        </HorizontalTab>
        <HorizontalTab
          active={activeTab === 'price'}
          onClick={() => {
            switchTab('price');
          }}
        >
          Price Chart
        </HorizontalTab>
        <HorizontalTab
          active={activeTab === 'depth'}
          onClick={() => {
            switchTab('depth');
          }}
        >
          Market Depth
        </HorizontalTab>
      </HorizontalTab.TabBar>

      <div>{activeTab === 'summary' && <Summary />}</div>
      <div>{activeTab === 'price' && <PriceAction />}</div>
      <div>{activeTab === 'depth' && <MarketDepth />}</div>
    </Panel>
  );
}
