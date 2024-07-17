export const sortOptions = [
  {
    value: 'priceUp',
    filter: {
      $sort: {
        price: 1
      }
    }
  },
  {
    value: 'priceDown',
    filter: {
      $sort: {
        price: -1
      }
    }
  },
  {
    value: 'alphabetically',
    filter: {
      $sort: {
        name: 1
      }
    }
  },
];