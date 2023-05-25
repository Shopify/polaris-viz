import {SimpleBarChart} from '../../SimpleBarChart';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const DATA1 = [
  {
    data: [
      {
        key: '["!!","!!! Single variant product","!!!123 (Copy)",", (Copy) (Copy)","00 - A car product with Drone that can do amazing things (Copy)","001 another drummer boy (Copy)","1 of the list","AGUA","Rude t-shirt"]',
        value: 727.45,
      },
      {
        key: '["Champagne","Cup"]',
        value: 383.04,
      },
      {
        key: '["Copy of A new product with bells and whistles"]',
        value: 101.48,
      },
      {
        key: '["01 - Test Weight Bug 23"]',
        value: 58.78,
      },
      {
        key: '["Hat","Socks"]',
        value: 26.1,
      },
    ],
  },
];

const DATA2 = [
  {
    data: [
      {
        key: 'Direct',
        value: 819.04,
      },
      {
        key: '',
        value: null,
      },
      {
        key: '',
        value: null,
      },
      {
        key: '',
        value: null,
      },
      {
        key: '',
        value: null,
      },
    ],
  },
];

const DATA3 = [
  {
    data: [
      {
        key: 'Draft Orders',
        value: 383.04,
      },
      {
        key: 'Shopify Mobile for iPhone',
        value: 263.41,
      },
      {
        key: 'Shopify Mobile for Android',
        value: 172.59,
      },
      {
        key: '',
        value: null,
      },
      {
        key: '',
        value: null,
      },
    ],
  },
];

export const Multiple = () => {
  return (
    <div style={{display: 'flex', gap: '20px'}}>
      <div style={{height: 300, width: 300}}>
        <SimpleBarChart data={DATA1} showLegend={false} />
      </div>
      <div style={{height: 300, width: 300}}>
        <SimpleBarChart data={DATA2} showLegend={false} />
      </div>
      <div style={{height: 300, width: 300}}>
        <SimpleBarChart data={DATA3} showLegend={false} />
      </div>
    </div>
  );
};
