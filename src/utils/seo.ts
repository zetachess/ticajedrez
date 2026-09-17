import { useEffect } from "react";
type Language = "es" | "en" | "de";

interface SEOData {
	title: string;
	description: string;
	baseUrl?: string;
	ogImage?: string;
	canonical?: string;
	language?: Language;
}

// URL base por defecto
const DEFAULT_BASE_URL = "https://goblinajedrez.com";

export const updateSEOMetadata = (data: SEOData) => {
	const {
		title,
		description,
		baseUrl = DEFAULT_BASE_URL,
		ogImage,
		canonical,
		language = "es",
	} = data;

	// Actualizar título de la página
	document.title = title;

	// Actualizar atributo lang del HTML
	document.documentElement.setAttribute("lang", language);

	// Actualizar meta description
	const metaDescription = document.getElementById(
		"meta-description"
	) as HTMLMetaElement;
	if (metaDescription) {
		metaDescription.content = description;
	}

	// Actualizar application name
	const appName = document.getElementById("app-name") as HTMLMetaElement;
	if (appName) {
		appName.content = title;
	}

	// Actualizar canonical link
	const canonicalLink = document.getElementById(
		"canonical-link"
	) as HTMLLinkElement;
	if (canonicalLink) {
		canonicalLink.href = canonical || baseUrl;
	}

	// Actualizar locale de Open Graph según el idioma
	const ogLocaleMap: Record<Language, string> = {
		es: "es-ES",
		en: "en-US",
		de: "de-DE",
	};

	const ogLocale = document.querySelector(
		'meta[property="og:locale"]'
	) as HTMLMetaElement;
	if (ogLocale) {
		ogLocale.content = ogLocaleMap[language];
	}

	// Actualizar Open Graph
	const ogTitle = document.getElementById("og-title") as HTMLMetaElement;
	if (ogTitle) {
		ogTitle.content = title;
	}

	const ogDescription = document.getElementById(
		"og-description"
	) as HTMLMetaElement;
	if (ogDescription) {
		ogDescription.content = description;
	}

	const ogImageElement = document.getElementById("og-image") as HTMLMetaElement;
	if (ogImageElement) {
		ogImageElement.content = ogImage || `${baseUrl}/og-image.webp`;
	}

	const ogUrl = document.getElementById("og-url") as HTMLMetaElement;
	if (ogUrl) {
		ogUrl.content = canonical || baseUrl;
	}

	// Actualizar Twitter Card
	const twitterTitle = document.getElementById(
		"twitter-title"
	) as HTMLMetaElement;
	if (twitterTitle) {
		twitterTitle.content = title;
	}

	const twitterDescription = document.getElementById(
		"twitter-description"
	) as HTMLMetaElement;
	if (twitterDescription) {
		twitterDescription.content = description;
	}

	const twitterImage = document.getElementById(
		"twitter-image"
	) as HTMLMetaElement;
	if (twitterImage) {
		twitterImage.content = ogImage || `${baseUrl}/og-image.webp`;
	}
};

// Hook personalizado para usar en componentes React
export const useSEO = (data: SEOData) => {
	useEffect(() => {
		updateSEOMetadata(data);
	}, [
		data.title,
		data.description,
		data.baseUrl,
		data.ogImage,
		data.canonical,
		data.language,
	]);
};

// Configuraciones predefinidas para diferentes páginas - Ahora se generan dinámicamente según el idioma
// Usar las traducciones del sistema i18n en lugar de estas constantes estáticas
export const SEO_CONFIGS = {
	home: {
		title: "GoblinAjedrez - Aprende Ajedrez",
		description:
			"Plataforma de entrenamiento de ajedrez con puzzles, cursos y análisis. Mejora tu juego con ejercicios interactivos.",
	},
	training: {
		title: "Entrenamiento - GoblinAjedrez",
		description:
			"Entrena con puzzles de ajedrez organizados por temas y dificultad. Mejora tu táctica y estrategia.",
	},
	courses: {
		title: "Cursos de Ajedrez - GoblinAjedrez",
		description:
			"Aprende ajedrez desde cero o perfecciona tu juego con nuestros cursos estructurados.",
	},
	login: {
		title: "Iniciar Sesión - GoblinAjedrez",
		description:
			"Accede a tu cuenta de GoblinAjedrez para continuar tu entrenamiento.",
	},
	register: {
		title: "Registrarse - GoblinAjedrez",
		description:
			"Únete a GoblinAjedrez y comienza tu viaje en el mundo del ajedrez.",
	},
} as const;

// Helper para generar configuraciones SEO usando el sistema i18n
export const getSEOConfig = (
	page: keyof typeof SEO_CONFIGS,
	t: (namespace: string, key: string) => string,
	language: Language
) => {
	const configKey = `${page}Title`;
	const descKey = `${page}Description`;

	return {
		title: t("seo", configKey),
		description: t("seo", descKey),
		language,
	};
};

// Funciones auxiliares para generar SEO dinámico
export const generateThemeSEO = (theme: string): SEOData => {
	const themeNames: Record<string, string> = {
		mate: "Mate",
		mateIn1: "Mate en 1",
		mateIn2: "Mate en 2",
		mateIn3: "Mate en 3",
		tactics: "Táctica",
		pin: "Clavada",
		fork: "Horquilla",
		skewer: "Enfilada",
		discovery: "Descubierto",
		deflection: "Desviación",
		sacrifice: "Sacrificio",
		endgame: "Final",
		opening: "Apertura",
	};

	const themeName = themeNames[theme] || theme.replace(/_/g, " ");

	return {
		title: `${themeName} - Entrenamiento de Ajedrez | GoblinAjedrez`,
		description: `Practica puzzles de ajedrez del tema ${themeName}. Mejora tus habilidades tácticas con ejercicios específicos de ${themeName.toLowerCase()}.`,
	};
};

export const generateCourseSEO = (
	courseTitle: string,
	courseDescription?: string
): SEOData => {
	return {
		title: `${courseTitle} | GoblinAjedrez`,
		description:
			courseDescription ||
			`Aprende ajedrez con el curso ${courseTitle}. Contenido estructurado y ejercicios prácticos.`,
	};
};

export const generatePuzzleSEO = (
	puzzleId: string,
	theme?: string
): SEOData => {
	const themeText = theme ? ` de ${theme}` : "";
	return {
		title: `Puzzle ${puzzleId}${themeText} | GoblinAjedrez`,
		description: `Resuelve este puzzle de ajedrez${themeText}. Mejora tu nivel táctico con ejercicios interactivos.`,
	};
};
