export function toReais(value: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  }
  
  export function splitThousands(
    number: number,
    decimalPos: number = 2,
    decimalSep: string = ",",
    thousandSep: string = "."
  ): string {
    const parts = number.toFixed(decimalPos).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
    return parts.join(decimalSep);
  }
  
  export default function formatMoney(value: string): string {
    const valueRemoved = value.replace(",", "");
    const sizeSlice = valueRemoved.length - 2;
    const newFormattedValue = [valueRemoved.slice(0, sizeSlice), ".", valueRemoved.slice(sizeSlice)].join("");
    return newFormattedValue;
  }
  