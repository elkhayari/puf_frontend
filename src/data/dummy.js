import { BiDevices } from 'react-icons/bi';
import { TbTruckLoading } from 'react-icons/tb';

export const boards = ['STM32F429-Disc'];
export const memories = ['FRAM_CH6', 'FRAM_CH3', 'FRAM_R2'];

export const testTypes = [
  {
    field: 'Reliability',
    name: 'Reliability test'
  },
  {
    field: 'readLatency',
    name: 'Read latency test'
  },
  {
    field: 'writeLatency',
    name: 'Write latency test'
  },
  {
    field: 'rowHammering',
    name: 'Row Hammering test'
  }
];
export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Devices',
        path: 'Devices',
        icon: <BiDevices />
      }
    ]
  },

  {
    title: 'Tests',
    links: [
      {
        name: 'tests',
        path: 'tests',
        icon: <TbTruckLoading />
      },
      {
        name: 'Waiting',
        path: 'tests/waiting',
        icon: <TbTruckLoading />
      },
      {
        name: 'Running',
        path: 'tests/running',
        icon: <TbTruckLoading />
      },
      {
        name: 'Comleted',
        path: 'tests/completed',
        icon: <TbTruckLoading />
      }
    ]
  },
  {
    title: 'Evaluations',
    links: [
      {
        name: 'Evaluation',
        path: 'evaluation',
        icon: <TbTruckLoading />
      },
      {
        name: 'My Experiments',
        path: 'evaluation/experiments',
        icon: <TbTruckLoading />
      }
    ]
  }
];

export const ordersData = [
  {
    OrderID: 10248,
    CustomerName: 'Vinet',

    TotalAmount: 32.38,
    OrderItems: 'Fresh Tomato',
    Location: 'USA',
    Status: 'pending',
    StatusBg: '#FB9678'
  }
];

export const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage'
];

export const ordersGrid = [
  {
    headerText: 'Image',
    template: gridOrderImage,
    textAlign: 'Center',
    width: '120'
  },
  {
    field: 'OrderItems',
    headerText: 'Item',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center'
  },
  {
    field: 'CustomerName',
    headerText: 'Customer Name',
    width: '150',
    textAlign: 'Center'
  },
  {
    field: 'TotalAmount',
    headerText: 'Total Amount',
    format: 'C2',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150'
  },
  {
    headerText: 'Status',
    template: gridOrderStatus,
    field: 'OrderItems',
    textAlign: 'Center',
    width: '120'
  },
  {
    field: 'OrderID',
    headerText: 'Order ID',
    width: '120',
    textAlign: 'Center'
  },

  {
    field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center'
  }
];

export const startStopMarks = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 100,
    label: '100'
  },
  {
    value: 50,
    label: '50'
  }
];

export const tempMarks = [
  {
    value: -50,
    label: '-50°C'
  },
  {
    value: -25,
    label: '-25°C'
  },
  {
    value: 0,
    label: '0°C'
  },
  {
    value: 25,
    label: '25°C'
  },
  {
    value: 50,
    label: '50°C'
  }
];

export const voltMarks = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 6,
    label: '6'
  },
  {
    value: 12,
    label: '12'
  }
];
