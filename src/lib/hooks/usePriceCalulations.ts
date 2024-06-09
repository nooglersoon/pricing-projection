import type { FormValues } from "../models/FormValues";

export const usePriceCalculations = (values: FormValues) => {

  const hargaSapiCIF = parseFloat(values.hargaSapiCIF)
  const beratSapi = parseFloat(values.beratSapi)
  const nilaiTukarUSD = parseFloat(values.nilaiTukarUSD)
  const _beaMasuk = parseFloat(values.beaMasuk)
  const pph = parseFloat(values.pph)
  const biayaImport = parseFloat(values.biayaImport)
  const lamaPemeliharaan = parseFloat(values.lamaPemeliharaan)
  const biayaPemeliharaan = parseFloat(values.biayaPemeliharaan)
  const biayaOverHead = parseFloat(values.biayaOverHead)
  const biayaMarketing = parseFloat(values.biayaMarketing)
  const tingkatBungaBank = parseFloat(values.tingkatBungaBank)
  const pertambahanBerat = parseFloat(values.pertambahanBerat)
  const hargaJualSapi = parseFloat(values.hargaJualSapi)

  const nilaiBeliSapiCIF = (): number => {
    return hargaSapiCIF * beratSapi * nilaiTukarUSD;
  }

  const beaMasuk = (): number => {
    return nilaiBeliSapiCIF() * (_beaMasuk / 100);
  }

  const pphImpor = (): number => {
    return (nilaiBeliSapiCIF() + beaMasuk()) * (pph / 100);
  }

  const jumlah = (): number => {
    return nilaiBeliSapiCIF() + beaMasuk() + pphImpor() + biayaImport;
  }

  const hargaSapiDiKandang = (): number => {
    if (!beratSapi) { return 0; }
    return jumlah() / beratSapi;
  }

  const hargaPemeliharaan = (): number => {
    return lamaPemeliharaan * biayaPemeliharaan;
  }

  const biayaOverhead = (): number => {
    return lamaPemeliharaan * biayaOverHead;
  }

  const biayaBunga = (): number => {
    return (jumlah() + hargaSapiDiKandang() + hargaPemeliharaan() + biayaOverhead() + biayaMarketing) * ((lamaPemeliharaan / 365) * tingkatBungaBank / 100);
  }

  const totalBiaya = (): number => {
    return jumlah() + hargaSapiDiKandang() + hargaPemeliharaan() + biayaOverhead() + biayaBunga() + biayaMarketing;
  }

  const beratAkhirSapiPotong = (): number => {
    return beratSapi + (lamaPemeliharaan * pertambahanBerat)
  }

  const hpp = (): number => {
    if (!beratAkhirSapiPotong()) { return 0 }
    return totalBiaya() / beratAkhirSapiPotong()
  }

  const nilaiJualSapiPotong = (): number => {
    return beratAkhirSapiPotong() * hargaJualSapi
  }

  const nettProfitPerEkor = (): number => {
    return nilaiJualSapiPotong() - totalBiaya()
  }

  const presentaseNettProfit = (): number => {
    if (!nilaiJualSapiPotong()) { return 0 }
    return nettProfitPerEkor() / nilaiJualSapiPotong()
  }

  const nettProfitPerKilo = (): number => {
    if (!nilaiJualSapiPotong()) { return 0 }
    return nettProfitPerEkor() / beratAkhirSapiPotong()
  }

  return {
    nilaiBeliSapiCIF,
    beaMasuk,
    pphImpor,
    jumlah,
    hargaSapiDiKandang,
    hargaPemeliharaan,
    biayaOverhead,
    biayaBunga,
    totalBiaya,
    beratAkhirSapiPotong,
    hpp,
    nilaiJualSapiPotong,
    nettProfitPerEkor,
    presentaseNettProfit,
    nettProfitPerKilo
  };
}