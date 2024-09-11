<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore, ProgressBar } from '@skeletonlabs/skeleton';

	export let parent: SvelteComponent;
	const modalStore = getModalStore();

	let step: number = 0;

	const dataSteps = [
		{
			image: '1',
			text: 'Ve a tu perfil de Instagram y abre los ajustes > "Centro de cuentas".'
		},
		{
			image: '2',
			text: 'Pincha en "Configuración de la cuenta" > "Tu información y tus permisos".'
		},
		{
			image: '3',
			text: 'Pincha en "Descargar tu información".'
		},
		{
			image: '4',
			text: 'Pincha en "Descargar o transferir información".'
		},
		{
			image: '5',
			text: 'Selecciona tu cuenta de Instagram y dale a "Siguiente".'
		},
		{
			image: '6',
			text: 'Elige la opción "Parte de tu información".'
		},
		{
			image: '7',
			text: 'Busca la sección "Conexiones" y marca "Seguidores y seguidos", y dale a "Siguiente".'
		},
		{
			image: '8',
			text: 'Elige "Descargar en el dispositivo" y dale a "Siguiente".'
		},
		{
			image: '9',
			text: 'En "Intervalo de fechas", elige "Desde el principio", y en "Formato" elige "JSON". Por último, dale a "Crear archivos".'
		},
		{
			image: '10',
			text: 'La descarga puede tardar un tiempo (te avisan a tu correo cuando esté lista). Entonces podrás descargar el fichero desde Instagram en el mismo menú de "Descargar tu información".'
		},
		{
			image: '11',
			text: 'Cárgalo en Unfollow Detector para poder ver quién te ha dejado de seguir. Nosotros no enviamos tus datos a ningún sitio (puedes comprobarlo), y es la forma más segura de ver quién te sigue sin darle acceso a tu cuenta a nadie.'
		}
	];

	const images: any = import.meta.glob('/src/assets/screenshots/**.jpg', { eager: true });
	const imageUrls = dataSteps.map((step) => {
		const path = `/src/assets/screenshots/${step.image}.jpg`;
		return images[path].default || '';
	});

	const goBack = () => {
		if (step <= 0) {
			modalStore.close();
			return;
		}
		step--;
	};

	const goNext = () => {
		if (step >= dataSteps.length - 1) {
			modalStore.close();
			return;
		}
		step++;
	};
</script>

{#if $modalStore[0]}
	<div class="flex flex-col card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">Cómo usar</header>
		<div class="flex flex-row justify-center items-center">
			<span class="w-32">Paso {step + 1}/{dataSteps.length} </span>
			<ProgressBar value={step} max={dataSteps.length - 1} />
		</div>

		{#if step >= 0}
			<div class="flex flex-col justify-start items-center gap-2">
				<div class="flex text-center h-1/5">
					<p>{dataSteps[step].text}</p>
				</div>
				<div class="flex w-3/5 md:w-2/5 h-2/5 md:h-1/5">
					<img src={imageUrls[step]} alt="Step Image" />
				</div>
			</div>
		{/if}

		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={goBack}>
				{#if step > 0}
					<p class="text-warning">Atrás</p>
				{:else}
					<p class="text-warning">Cerrar</p>
				{/if}
			</button>
			<button class="btn {parent.buttonPositive}" on:click={goNext}>
				{#if step < dataSteps.length - 1}
					<p class="text-warning">Siguiente</p>
				{:else}
					<p class="text-warning">Finalizar</p>
				{/if}
			</button>
		</footer>
	</div>
{/if}
