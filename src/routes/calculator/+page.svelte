<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { usePriceCalculations } from '$lib/hooks/usePriceCalulations';
	import type { FormValues } from '$lib/models/FormValues';

	// Initialize state variables
	let values = writable<FormValues>({
		nilaiTukarUSD: 0,
		hargaSapiCIF: 0,
		beratSapi: 0,
		beaMasuk: 0,
		pph: 0,
		biayaImport: 0,
		lamaPemeliharaan: 0,
		biayaPemeliharaan: 0,
		pertambahanBerat: 0,
		tingkatBungaBank: 0,
		biayaOverHead: 0,
		biayaMarketing: 0,
		hargaJualSapi: 0
	});

	let results = writable<{ [key: string]: string | number }>();
	let isSubmitted = writable(false);
	let isLoading = writable(false);

	// Subscribe to state variables
	$: calculations = usePriceCalculations($values);

	// Function to handle form input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		values.update((v) => ({ ...v, [name]: value }));
	};

	// Function to handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		isLoading.set(true);

		setTimeout(() => {
			const data = {
				'Nilai Tukar USD. Ke Rp': $values.nilaiTukarUSD,
				'Nilai Beli Sapi CIF': calculations.nilaiBeliSapiCIF(),
				'Bea Masuk': calculations.beaMasuk(),
				'PPH Impor': calculations.pphImpor(),
				'Biaya-Biaya Import': $values.biayaImport,
				Jumlah: calculations.jumlah(),
				'Harga Sapi Di Kandang (Rp./Kg)': calculations.hargaSapiDiKandang(),
				'Biaya Pemeliharaan (Rp/ekor)': calculations.hargaPemeliharaan(),
				'Biaya Over Head': calculations.biayaOverhead(),
				'Biaya Marketing': $values.biayaMarketing,
				'Biaya Bunga': calculations.biayaBunga(),
				'Total Biaya': calculations.totalBiaya(),
				'Berat Akhir Sapi Potong (Kg.)': calculations.beratAkhirSapiPotong(),
				'HPP (Rp/Kg)': calculations.hpp(),
				'Nilai Jual Sapi Potong': calculations.nilaiJualSapiPotong(),
				'Nett Profit Rp./Ekor': calculations.nettProfitPerEkor(),
				'Prosentase Nett Profit': calculations.presentaseNettProfit(),
				'Nett Profit Rp./Kg': calculations.nettProfitPerKilo()
			};
			results.set(data);
			isSubmitted.set(true);
			isLoading.set(false);
			console.log(data);
		}, 1000);
	};

	// Function to reset form and results
	const handleReset = () => {
		isLoading.set(false);
		isSubmitted.set(false);
		results.set({});
		values.set({
			nilaiTukarUSD: 0,
			hargaSapiCIF: 0,
			beratSapi: 0,
			beaMasuk: 0,
			pph: 0,
			biayaImport: 0,
			lamaPemeliharaan: 0,
			biayaPemeliharaan: 0,
			pertambahanBerat: 0,
			tingkatBungaBank: 0,
			biayaOverHead: 0,
			biayaMarketing: 0,
			hargaJualSapi: 0
		});
	};

	// Lifecycle hook to perform actions on component mount
	onMount(() => {
		// Perform any necessary actions on component mount
	});
</script>

<main class="h-screen flex">
	<div class="my-auto mx-auto max-w-screen-xl px-8 py-4 flex flex-col">
		<div class="max-w-lg text-left sticky top-0 left-0 bg-white h-16">
			<h1 class="text-2xl font-bold sm:text-3xl py-4">Projection Calculator</h1>
		</div>
		{#if !$isSubmitted}
			<form on:submit={handleSubmit}>
				<div class="flex flex-wrap mb-4">
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="nilaiTukarUSD" class="block text-black text-sm">Nilai Tukar USD (Rp)</label>
						<input
							type="number"
							name="nilaiTukarUSD"
							id="nilaiTukarUSD"
							value={$values.nilaiTukarUSD}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="hargaSapiCIF" class="block text-black text-sm">Harga Sapi (CIF)</label>
						<input
							type="number"
							name="hargaSapiCIF"
							id="hargaSapiCIF"
							value={$values.hargaSapiCIF}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="beratSapi" class="block text-black text-sm">Berat Sapi (Kg.)</label>
						<input
							type="number"
							name="beratSapi"
							id="beratSapi"
							value={$values.beratSapi}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
				</div>
				<div class="flex flex-wrap mb-4">
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="beaMasuk" class="block text-black text-sm">Bea Masuk (%)</label>
						<input
							type="number"
							name="beaMasuk"
							id="beaMasuk"
							value={$values.beaMasuk}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="pph" class="block text-black text-sm">PPH (%)</label>
						<input
							type="number"
							name="pph"
							id="pph"
							value={$values.pph}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
				</div>
				<div class="flex flex-wrap mb-4">
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="biayaImport" class="block text-black text-sm">Biaya Import (Rp./Ekor)</label
						>
						<input
							type="number"
							name="biayaImport"
							id="biayaImport"
							value={$values.biayaImport}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="lamaPemeliharaan" class="block text-black text-sm"
							>Lama Pemeliharaan (hari)</label
						>
						<input
							type="number"
							name="lamaPemeliharaan"
							id="lamaPemeliharaan"
							value={$values.lamaPemeliharaan}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
				</div>
				<div class="flex flex-wrap mb-4">
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="biayaPemeliharaan" class="block text-black text-sm"
							>Biaya Pemeliharaan (Rp/ekor/hari)</label
						>
						<input
							type="number"
							name="biayaPemeliharaan"
							id="biayaPemeliharaan"
							value={$values.biayaPemeliharaan}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="pertambahanBerat" class="block text-black text-sm"
							>Pertambahan Berat Badan</label
						>
						<input
							type="number"
							name="pertambahanBerat"
							id="pertambahanBerat"
							value={$values.pertambahanBerat}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
				</div>
				<div class="flex flex-wrap mb-4">
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="tingkatBungaBank" class="block text-black text-sm"
							>Tingkat Bunga Bank (% /Tahun)</label
						>
						<input
							type="number"
							name="tingkatBungaBank"
							id="tingkatBungaBank"
							value={$values.tingkatBungaBank}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
				</div>
				<div class="flex flex-wrap mb-4">
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="biayaOverHead" class="block text-black text-sm"
							>Biaya Over Head (Rp./Ekor)</label
						>
						<input
							type="number"
							name="biayaOverHead"
							id="biayaOverHead"
							value={$values.biayaOverHead}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="biayaMarketing" class="block text-black text-sm"
							>Biaya Marketing (Rp./Ekor)</label
						>
						<input
							type="number"
							name="biayaMarketing"
							id="biayaMarketing"
							value={$values.biayaMarketing}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
				</div>
				<div class="flex flex-wrap mb-4">
					<div class="w-full px-2 mb-4 md:mb-0 my-4">
						<label for="hargaJualSapi" class="block text-black text-sm"
							>Harga Jual Sapi (Rp./Kg)</label
						>
						<input
							type="number"
							name="hargaJualSapi"
							id="hargaJualSapi"
							value={$values.hargaJualSapi}
							on:input={handleChange}
							class="block w-full border rounded-md px-4 py-2 border-slate-200 mt-4"
							placeholder="0"
							pattern="\d*"
						/>
					</div>
				</div>
				<button
					on:click={() => {}}
					class="bg-green-500 text-white py-4 px-4 rounded focus:outline-none focus:bg-green-600 w-full mt-8 text-center items-center"
				>
					{#if isLoading}
						<svg
							class="animate-spin h-5 w-5 mx-auto"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							stroke="currentColor"
						>
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V2.5A1.5 1.5 0 0113.5 1h-1A1.5 1.5 0 0011 2.5V4a8 8 0 01-4 6.928"
							></path>
						</svg>
					{:else}
						Kalkulasi
					{/if}
				</button>
			</form>
		{:else}{/if}
	</div>
</main>
