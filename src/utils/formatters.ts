export {
  formatter,
  percentFormatter,
  costKmFormatter,
  cpdFormatter,
  formatterExtra,
};

const formatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 3,
  minimumFractionDigits: 0,
});

const formatterExtra = new Intl.NumberFormat("en", {
  maximumFractionDigits: 5,
  minimumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const costKmFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 4,
  minimumFractionDigits: 4,
});

const cpdFormatter = new Intl.NumberFormat("en", {
  minimumFractionDigits: 4,
});
