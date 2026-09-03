export const dashboardData = {
  stats: {
    total: 245,
    serviceable: 218,
    unserviceable: 12,
    repair: 15,
    inventoryValue: 4850000,
  },

  categories: [
    { category: 'Desktop Computer', total: 85 },
    { category: 'Laptop', total: 62 },
    { category: 'Printer', total: 35 },
    { category: 'Network Equipment', total: 28 },
    { category: 'Projector', total: 18 },
    { category: 'UPS', total: 17 },
  ],

  departments: [
    { department: 'ICT Office', total: 35 },
    { department: 'Registrar', total: 28 },
    { department: 'Accounting', total: 24 },
    { department: 'College of Education', total: 21 },
    { department: 'College of Engineering', total: 19 },
    { department: 'Library', total: 17 },
  ],

  recentAssets: [
    {
      id: 1,
      asset_tag: 'ICT-2026-0001',
      item_name: 'Desktop Computer',
      brand: 'Dell',
      model: 'OptiPlex 7010',
      status: 'serviceable',
    },
    {
      id: 2,
      asset_tag: 'ICT-2026-0002',
      item_name: 'Laptop',
      brand: 'Lenovo',
      model: 'ThinkPad E14',
      status: 'serviceable',
    },
    {
      id: 3,
      asset_tag: 'ICT-2026-0003',
      item_name: 'Printer',
      brand: 'Epson',
      model: 'L5290',
      status: 'repair',
    },
    {
      id: 4,
      asset_tag: 'ICT-2026-0004',
      item_name: 'Projector',
      brand: 'Epson',
      model: 'EB-X06',
      status: 'serviceable',
    },
    {
      id: 5,
      asset_tag: 'ICT-2026-0005',
      item_name: 'Desktop Computer',
      brand: 'HP',
      model: 'ProDesk 400',
      status: 'unserviceable',
    },
  ],

  maintenance: [
    {
      id: 1,
      asset_tag: 'ICT-2026-0003',
      description: 'Printer paper feed problem',
      date: 'Sep 2, 2026',
    },
    {
      id: 2,
      asset_tag: 'ICT-2026-0015',
      description: 'Desktop computer RAM replacement',
      date: 'Sep 1, 2026',
    },
    {
      id: 3,
      asset_tag: 'ICT-2026-0021',
      description: 'Laptop OS reinstallation',
      date: 'Aug 30, 2026',
    },
    {
      id: 4,
      asset_tag: 'ICT-2026-0032',
      description: 'Network switch configuration',
      date: 'Aug 28, 2026',
    },
  ],
}