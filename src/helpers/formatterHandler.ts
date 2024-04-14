const locale = 'es-CO';

export const dateFormatter = (date: string) => {  
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}

export const currencyFormatter = (value: number) => {
  return `$${new Intl.NumberFormat(locale).format(value)}`;
}