import {
	BookOpenCheck,
	BrainCircuit,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Database,
	ExternalLink,
	FileCode2,
	Film,
	FolderKanban,
	GraduationCap,
	Gamepad2,
	Link2,
	Maximize2,
	MonitorPlay,
	Network,
	NotebookPen,
	RadioTower,
	Swords,
	SendHorizontal,
	Smartphone,
	ThumbsUp,
	TriangleAlert,
	Trophy,
	X,
	Youtube,
	type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import fenRowByRow from "@/assets/fen-row-by-row.png";
import ticChessMap from "@/assets/tic-ajedrez-mapa.png";
import resourcesMap from "@/assets/recursos-ajedrez-mapa.png";
import ticGallery01 from "@/assets/tic-gallery/01.avif";
import ticGallery02 from "@/assets/tic-gallery/02.jpg";
import ticGallery03 from "@/assets/tic-gallery/03.jpg";
import ticGallery04 from "@/assets/tic-gallery/04.jpg";
import ticGallery05 from "@/assets/tic-gallery/05.jpg";
import ticGallery06 from "@/assets/tic-gallery/06.jpg";
import ticGallery07 from "@/assets/tic-gallery/07.jpg";
import aiGalleryCopilot from "@/assets/ai-gallery/copilot.webp";
import aiGalleryGemini from "@/assets/ai-gallery/gemini.png";
import aiGalleryClaude from "@/assets/ai-gallery/claude.webp";
import aiGalleryChatgpt from "@/assets/ai-gallery/chatgpt.jpg";
import aiGalleryDeepseek from "@/assets/ai-gallery/deepseek.jpg";
import aiGalleryGrok from "@/assets/ai-gallery/grok.jpg";
import materialGallerySudoku from "@/assets/material-gallery/sudoku-ajedrez.png";
import materialGalleryExercise from "@/assets/material-gallery/ejercicio-visual.png";
import materialGalleryMates from "@/assets/material-gallery/mates-basicos.png";
import materialGalleryMissingKing from "@/assets/material-gallery/rey-desaparecido.png";
import materialGalleryAvoidMate from "@/assets/material-gallery/evitar-jaque-mate.png";
import materialGalleryPieceValue from "@/assets/material-gallery/valor-piezas.png";
import { updateSEOMetadata } from "@/utils/seo";
import "./chess-classes.css";

type Topic = {
	number: string;
	kicker: string;
	title: string;
	intro: string;
	icon: LucideIcon;
	points: string[];
	resources: { label: string; href: string }[];
};

const topics: Topic[] = [
	{
		number: "01", kicker: "EL PUNTO DE PARTIDA", title: "TIC y ajedrez", icon: Network,
		intro: "Las TIC son herramientas y recursos tecnológicos que permiten crear, almacenar, compartir y acceder a información, facilitar la comunicación entre personas, automatizar tareas e interactuar digitalmente. Evolucionan constantemente y se utilizan en numerosos ámbitos.",
		points: ["Crear y compartir información", "Acceder a contenidos y comunicarse a distancia", "Preparar clases y seguir el trabajo del alumno"], resources: [],
	},
	{
		number: "01.5", kicker: "ESCUCHAR · VER · JUGAR", title: "Recursos de ajedrez", icon: RadioTower,
		intro: "Recursos culturales y plataformas online para seguir, descubrir y practicar ajedrez.",
		points: [], resources: [],
	},
	{
		number: "02", kicker: "EL LENGUAJE DEL TABLERO", title: "PGN, FEN y SAN", icon: FileCode2,
		intro: "Los formatos son el lenguaje común que permite intercambiar información ajedrecística entre programas.",
		points: ["PGN · partidas completas con comentarios y variantes", "FEN · una posición concreta lista para compartir", "SAN · e4, Cf3, Dxh7+… la notación de las jugadas"],
		resources: [{ label: "Ejemplo de partida anotada", href: "https://lichess.org/study/beM3pwZa" }, { label: "Dataset de puzzles de Lichess", href: "https://huggingface.co/datasets/Lichess/chess-puzzles/viewer/default/train?row=0" }, { label: "Chessgames", href: "https://www.chessgames.com/" }],
	},
	{
		number: "03", kicker: "INVESTIGAR Y PREPARAR", title: "Bases de datos", icon: Database,
		intro: "Una base de datos ajedrecística es un sistema organizado de partidas que permite buscar, filtrar, clasificar y comparar información.",
		points: ["Preparar aperturas y estudiar rivales", "Encontrar partidas modelo y tendencias", "Guardar el archivo personal de entrenamiento"],
		resources: [{ label: "Explorador de Lichess", href: "https://lichess.org/analysis/pgn/e4" }, { label: "Partidas de Judit Polgár", href: "https://www.chess.com/es/games/judit-polgar" }, { label: "OpeningTree", href: "https://www.openingtree.com/" }, { label: "Magnus Carlsen · ChessMonitor", href: "https://www.chessmonitor.com/u/magnus-carlsen" }, { label: "Base de datos · ChessTempo", href: "https://chesstempo.com/game-database/?utm_source=chatgpt.com" }],
	},
	{
		number: "04", kicker: "TU CUADERNO DIGITAL", title: "Estudios propios", icon: FolderKanban,
		intro: "Los estudios de Lichess son una de las herramientas más útiles para organizar el aprendizaje. Permiten reunir partidas, posiciones y ejercicios en un mismo espacio, dividir el contenido en capítulos y añadir comentarios, variantes y anotaciones sobre el tablero.",
		points: ["Importar PGN o FEN", "Añadir variantes, flechas y comentarios", "Separar repertorio, finales, táctica y partidas propias"],
		resources: [],
	},
	{
		number: "09", kicker: "PREPARAR PARA ENSEÑAR", title: "Material digital", icon: BookOpenCheck,
		intro: "Podemos crear fichas con teoría, ejercicios, preguntas y soluciones utilizando herramientas sencillas como Google Docs o Microsoft Word.",
		points: ["Fichas con teoría, preguntas y soluciones", "Posiciones guardadas mediante FEN", "Presentaciones y ejercicios creados para la clase"],
		resources: [{ label: "Editor de posiciones", href: "https://lichess.org/editor" }, { label: "Google Slides", href: "https://slides.google.com/" }, { label: "Canva", href: "https://www.canva.com/" }],
	},
	{
		number: "09.5", kicker: "IA Y APRENDIZAJE", title: "La nueva era: ChatGPT y LLM", icon: BrainCircuit,
		intro: "ChatGPT y los modelos de lenguaje (LLM) pueden ayudar a preparar materiales, generar ideas y adaptar explicaciones de ajedrez a cada grupo.",
		points: ["Proponer ejercicios y preguntas", "Adaptar una explicación al nivel del grupo", "Crear borradores de fichas y actividades"],
		resources: [],
	},
	{
		number: "05", kicker: "ENTENDER, NO SOLO MIRAR", title: "Análisis de partidas", icon: BrainCircuit,
		intro: "Para aprender a analizar partidas o posiciones podemos usar la herramienta gratuita de análisis de GoblinAjedrez.",
		points: ["Evaluación: igualdad, ventaja o mate", "Mejor jugada y variantes", "Detectar amenazas, clavadas y piezas indefensas"],
		resources: [{ label: "Analizar una posición", href: "https://goblinajedrez.com/analysis" }],
	},
	{
		number: "06", kicker: "AJEDREZ EN DIRECTO", title: "Torneos y retransmisiones", icon: RadioTower,
		intro: "En muchos torneos presenciales se utilizan tableros electrónicos, como los sistemas DGT, que registran automáticamente los movimientos realizados sobre el tablero.",
		points: ["DGT y transmisión de movimientos", "Retransmisiones, comentarios y partidas destacadas", "Seguir torneos mientras ocurren"],
		resources: [{ label: "Lichess Broadcast", href: "https://lichess.org/broadcast" }, { label: "Olimpiada de Ajedrez 2026 · En vivo", href: "https://lichess.org/broadcast/46th-fide-chess-olympiad-samarkand-2026-open-i/round-2/HnCuRMmB#overview" }, { label: "Chesscam · Retransmisión", href: "https://www.youtube.com/watch?v=rnmIfr03utw" }, { label: "ID Chess · Vídeos", href: "https://media.idchess.com/en/videos/47debea7-2842-4476-8fc3-4bc05dc7ff0f?with_global_top=true&sort_by=random" }, { label: "Chessnut · Tablero electrónico", href: "https://www.youtube.com/shorts/-bqTRTPyjgY" }],
	},
	{
		number: "07", kicker: "ENTRENAR CON OBJETIVO", title: "Táctica progresiva", icon: Swords,
		intro: "Las plataformas digitales permiten trabajar miles de posiciones, adaptar la dificultad al nivel del jugador y registrar el progreso.",
		points: ["Clavadas, ataques dobles y eliminación del defensor", "Rating táctico distinto del Elo de juego", "Actividades visuales para empezar desde cero"],
		resources: [{ label: "Temas de entrenamiento", href: "https://goblinajedrez.com/training/overview" }, { label: "Táctica en Lichess", href: "https://lichess.org/training/themes" }, { label: "Táctica en ChessTempo", href: "https://es.chesstempo.com/chess-tactics/" }, { label: "Método Pájaro Carpintero", href: "https://www.tacticspecker.com/puzzle-set" }],
	},
	{
		number: "08", kicker: "ENSEÑAR A DISTANCIA", title: "Clases online", icon: MonitorPlay,
		intro: "Podemos utilizar diferentes herramientas según las necesidades de la clase.",
		points: ["Videollamada y pantalla compartida", "Tablero digital para variantes y posiciones", "Participación activa del alumno"],
		resources: [{ label: "Jitsi Meet", href: "https://meet.jit.si/" }, { label: "Análisis de Lichess", href: "https://lichess.org/analysis" }],
	},
	{
		number: "10", kicker: "COMPETICIÓN ORGANIZADA", title: "Torneos digitales", icon: Trophy,
		intro: "En los torneos presenciales podemos utilizar programas informáticos para gestionar la organización.",
		points: ["Jugadores, resultados y desempates", "Emparejamientos y clasificaciones", "Torneos jugados directamente en una plataforma"],
		resources: [{ label: "Vega Chess", href: "https://www.vegachess.com/v/download/index.html" }, { label: "Torneos de Lichess", href: "https://lichess.org/tournament" }],
	},
	{
		number: "11", kicker: "DÓNDE JUGAR", title: "Plataformas online", icon: GraduationCap,
		intro: "Plataforma comercial de juego y aprendizaje de ajedrez online: partidas, torneos, puzzles, lecciones y análisis.",
		points: ["Jugar partidas y torneos", "Resolver puzzles y analizar", "Crear comunidad y compartir estudios"],
		resources: [{ label: "Chess.com", href: "https://www.chess.com/" }, { label: "Lichess", href: "https://lichess.org/" }, { label: "World Chess", href: "https://worldchess.com/" }, { label: "Endgame AI", href: "https://endgame.ai/" }, { label: "PyChess", href: "https://www.pychess.org/" }],
	},
];

// Guion completo organizado a partir del documento: se muestra al abrir cada tema.
const fullGuide: Record<string, string[]> = {
	"01": [
		"Las TIC son herramientas y recursos tecnológicos que permiten crear, almacenar, compartir y acceder a información, facilitar la comunicación entre personas, automatizar tareas e interactuar digitalmente. Evolucionan constantemente y se utilizan en numerosos ámbitos.",
		"En educación sirven para enseñar, aprender, compartir contenidos y comunicarse con los alumnos. Su valor no está solo en usar tecnología, sino en aprovecharla para mejorar el aprendizaje y facilitar el trabajo del profesor.",
		"En ajedrez el ecosistema digital incluye motores, bases de datos, juego online, plataformas educativas, retransmisiones, emparejamientos, tableros electrónicos, formatos digitales e inteligencia artificial. Permite preparar clases, impartirlas y seguir el trabajo fuera de ellas.",
		"¿Qué cosas buenas tiene la tecnología en el ajedrez?",
	],
	"01.5": [
		"Radio: El abrazo del oso, c2 Square (Caruana–Chirilla) y El rincón del ajedrez de Manuel Azuaga.",
		"Películas y series: En busca de Bobby Fischer, El duelo del siglo (Karpov–Korchnoi), El caso Fischer, La tabla de Flandes, Menudas piezas, Gambito de dama y El juego más frío.",
		"Plataformas de juego: Chess.com, Lichess, Sichess y FIDE Arena.",
		"Apps móviles: Lichess, Chess.com, ChessKid y Chessable para jugar, resolver ejercicios y estudiar desde el móvil.",
		"YouTubers: Rey Enigma.",
	],
	"02": [
		"PGN (Portable Game Notation) es el formato estándar para almacenar partidas. Guarda cabeceras —jugadores, evento, fecha y resultado— y la secuencia de jugadas; también puede incluir comentarios, variantes y símbolos de valoración.",
		"Una cabecera conceptual puede ser: [White “Jugador A”], [Black “Jugador B”] y [Result “1-0”]. En el mate del pastor: 1. e4 e5 2. Ac4 Cc6 3. Dh5 Cf6?? 4. Dxf7# 1-0.",
		"FEN (Forsyth-Edwards Notation) describe una posición concreta sin conocer las jugadas anteriores. Cada número representa casillas vacías; letras mayúsculas son piezas blancas y minúsculas, negras. Es esencial para ejercicios, finales y posiciones críticas.",
		"SAN es la notación legible de jugadas: e4, Cf3, Axc6, O-O o Dxh7+.",
		"UCI aparece entre motores e interfaces y usa coordenadas, por ejemplo e2e4.",
	],
	"03": [
		"Una base de datos ajedrecística organiza partidas para buscar, filtrar, clasificar y comparar información. Se usa para preparación de aperturas, investigación de jugadores y tendencias, estudio de partidas modelo, repertorios, estadísticas y archivo personal.",
		"Una buena consulta no consiste solo en buscar qué jugada gana más: hay que valorar número de partidas, nivel de jugadores, fecha, ritmo y contexto de la posición.",
		"ChessBase es una referencia profesional. En Lichess se pueden consultar estadísticas de la base completa o filtrar a un jugador: por ejemplo, DrNykterstein para estudiar las aperturas y preferencias de Magnus Carlsen. Chess.com también permite consultar partidas oficiales de profesionales como Judit Polgár.",
		"¿Qué bases de datos de ajedrez utilizáis?",
	],
	"04": [
		"Los estudios de Lichess organizan aprendizaje en un espacio con partidas, posiciones y ejercicios. Se dividen en capítulos y admiten comentarios, variantes y anotaciones sobre el tablero.",
		"Para crear uno: entra en Lichess Study, selecciona Nuevo estudio, pon un nombre claro, configura visibilidad y participantes, crea el primer capítulo e introduce posición o partida. Cada capítulo puede ser una partida, apertura, posición o ejercicio.",
	],
	"05": [
		"El análisis digital permite insertar una posición y pedir al motor las mejores jugadas. La evaluación 0.00 indica igualdad; +1.00, ventaja de blancas; -1.00, ventaja de negras. #1, #2 y #3 indican mate en una, dos o tres jugadas.",
		"El módulo ayuda a detectar piezas sin defender, clavadas, amenazas al rey y anotaciones relevantes. Por ejemplo puede señalar un rey negro en peligro, un alfil atacado o un caballo clavado.",
		"El objetivo no es saber qué jugada era la mejor, sino comprender por qué: gana material, evita un mate, crea una amenaza, mejora una pieza o encuentra una combinación.",
	],
	"06": [
		"En torneos presenciales se usan tableros electrónicos como DGT, que registran automáticamente los movimientos y los envían a internet. Así miles de personas pueden seguir una partida casi en tiempo real.",
		"Lichess Broadcast permite consultar retransmisiones. YouTube reúne canales que retransmiten, comentan y recopilan partidas de los mejores jugadores: grandes torneos, entrevistas, momentos destacados y partidas completas.",
	],
	"07": [
		"Las plataformas digitales permiten trabajar miles de posiciones, adaptar dificultad al nivel del jugador y registrar el progreso. Se entrenan motivos como ataque doble, clavada, desviación, atracción, eliminación del defensor y ataque descubierto.",
		"El rating de ejercicios adapta la dificultad y corresponde al rendimiento en táctica; no debe confundirse con el Elo general de juego.",
		"Para quien empieza, las actividades visuales pueden enseñar a mover una pieza, capturar objetivos, resolver tácticas sencillas o comer estrellas mientras aprende.",
		"¿Qué páginas para entrenar táctica conocéis o utilizáis?",
	],
	"08": [
		"Para videollamadas se pueden usar Jitsi Meet —gratuito, sin instalación ni cuenta—, Google Meet, Microsoft Teams o Zoom, que tienen versiones gratuitas con distintas limitaciones.",
		"Durante la clase conviene compartir un tablero digital. Lichess y Chess.com permiten analizar posiciones, mover piezas, introducir variantes y estudiar partidas mientras transcurre la videollamada. También se puede compartir pantalla para una base de datos, vídeo, presentación o cualquier otro recurso.",
		"Una clase online no debe consistir solo en observar al profesor: el alumno puede mover, calcular variantes, responder preguntas, resolver posiciones y explicar sus decisiones usando el tablero digital.",
	],
	"09": [
		"Google Docs o Word permiten preparar fichas con teoría, ejercicios, preguntas y soluciones; también se pueden añadir tableros, ejemplos y pequeñas actividades para clase o después de ella.",
		"Lichess Editor permite colocar piezas en una posición, explicarla, preparar un ejercicio o analizar una situación. La posición se guarda mediante FEN. Una partida PGN se puede comentar, ampliar con variantes y señalar momentos importantes.",
		"Google Slides, PowerPoint o Canva sirven para presentaciones visuales con posiciones, preguntas, ejemplos y soluciones. Las actividades pueden pedir encontrar la mejor jugada, un mate, capturar o defender una pieza y responder preguntas sobre la posición.",
	],
	"09.5": [
		"La inteligencia artificial generativa permite pedir propuestas de actividades, explicaciones más sencillas, preguntas para clase y variantes de un mismo ejercicio.",
		"Siempre conviene revisar el resultado antes de usarlo con el alumnado.",
		"¿Habéis usado IA? ¿En qué contexto?",
		"__AI_GALLERY__",
		"Si usamos la IA en ajedrez, ¿cómo la usamos?",
	],
	"10": [
		"En torneos presenciales se usan programas para registrar jugadores, realizar emparejamientos, introducir resultados, calcular desempates y generar clasificaciones. Vega ofrece esas funciones.",
		"Vega puede utilizarse gratis hasta 20 jugadores en Windows y macOS; en Linux es gratuito sin límite de jugadores ni rondas, aunque algunos servicios online están desactivados. Para torneos mayores en Windows o macOS hace falta licencia.",
		"También se pueden organizar torneos totalmente online, jugados directamente en plataformas como Lichess o Chess.com.",
	],
	"11": [
		"Chess.com es una plataforma comercial con partidas, torneos, puzzles, lecciones y análisis. Lichess es gratuita, sin publicidad y de código abierto para jugar, entrenar, analizar y organizar torneos.",
		"World Chess es la plataforma oficial de juego online de la FIDE: permite jugar con Elo Online reconocido por la FIDE y optar a títulos Arena. Endgame AI reúne partidas, torneos, puzzles y análisis mediante inteligencia artificial.",
	],
};

const topicLeads: Partial<Record<string, string>> = {
	"01": "TIC y ajedrez se refiere al uso de las Tecnologías de la Información y la Comunicación (TIC) aplicadas al aprendizaje, entrenamiento, enseñanza y práctica del ajedrez.",
	"02": "Son sistemas estandarizados que permiten guardar, representar, interpretar y compartir información de ajedrez de forma precisa entre jugadores, plataformas, bases de datos y programas informáticos. Gracias a ellos es posible registrar partidas completas, describir una posición exacta del tablero o expresar cada jugada de una manera reconocible y compatible entre distintas herramientas digitales.",
};

const technologyDiscussion = {
	good: [
		{ label: "Faustino Oro · aprendizaje y juego online", href: "https://www.chess.com/es/news/view/confirmado-faustino-oro-gran-maestro-mas-joven-mundo" },
		{ label: "Neuralink · jugar al ajedrez con el cerebro", href: "https://www.reuters.com/business/healthcare-pharmaceuticals/neuralink-shows-first-brain-chip-patient-playing-online-chess-2024-03-21/" },
		{ label: "Blind Mode · ajedrez online accesible", href: "https://www.fide.com/blind-mode-debuts-at-4th-fide-world-championship-for-people-with-disabilities/" },
		{ label: "Anish Sarkar · aprendizaje digital temprano", href: "https://www.chess.com/news/view/anish-sarkar-age-3-earns-fide-rating" },
		{ label: "AlphaZero · IA que aprende jugando", href: "https://deepmind.google/blog/alphazero-shedding-new-light-on-chess-shogi-and-go/" },
	],
	bad: [
		{ title: "🤖 Dependencia excesiva de la tecnología", description: "El jugador puede acostumbrarse a consultar Stockfish en vez de confiar primero en su propio análisis. Esta posición sirve para demostrarlo directamente.", href: "https://lichess.org/analysis/pgn/1.+e4+e5+2.+f4+exf4+3.+Nf3+g5+4.+Bc4+g4+5.+O-O+gxf3+6.+Qxf3" },
		{ title: "📱 La tecnología facilita las trampas", description: "Kirill Shevchenko fue expulsado durante el Campeonato de España por Equipos después del caso de los teléfonos escondidos en el baño.", href: "https://damasyreyes.es/kirill-shevchenko-trampas-campeonato-espana-kramnik/" },
		{ title: "🔍 La tecnología puede revelar la preparación de los jugadores", description: "Las huellas digitales, los análisis y la información publicada pueden exponer ideas o secretos de preparación antes de una partida importante.", href: "https://as.com/masdeporte/los-secretos-de-ding-liren-al-descubierto-n/" },
	],
};

const resourceCategories = ["Radio", "Películas y series", "Plataformas de juego", "Apps móviles", "YouTubers"];
const audienceGroups = ["Clase de 4.º de Primaria", "Grupo de ESO", "Grupo de Alzheimer", "Jugadores avanzados", "Tema libre"];
const ticGallery = [
	{ src: ticGallery01, alt: "Ajedrez histórico" },
	{ src: ticGallery02, alt: "Jugadores de ajedrez de época" },
	{ src: ticGallery03, alt: "Ilustración histórica de una partida de ajedrez" },
	{ src: ticGallery04, alt: "Libro clásico de estudios de ajedrez" },
	{ src: ticGallery05, alt: "Planilla histórica de una partida de Capablanca y Alekhine" },
	{ src: ticGallery06, alt: "Partida de ajedrez histórica" },
	{ src: ticGallery07, alt: "Grupo de jugadores alrededor de un tablero" },
];
const aiGallery = [
	{ src: aiGalleryCopilot, alt: "Microsoft Copilot" },
	{ src: aiGalleryGemini, alt: "Google Gemini" },
	{ src: aiGalleryClaude, alt: "Claude" },
	{ src: aiGalleryChatgpt, alt: "ChatGPT" },
	{ src: aiGalleryDeepseek, alt: "DeepSeek" },
	{ src: aiGalleryGrok, alt: "Grok" },
];
const materialGallery = [
	{ src: materialGallerySudoku, alt: "Ficha de Sudoku Ajedrez" },
	{ src: materialGalleryExercise, alt: "Ejercicio visual de ajedrez" },
	{ src: materialGalleryMates, alt: "Posiciones de mate básicas" },
	{ src: materialGalleryMissingKing, alt: "Ficha El rey desaparecido" },
	{ src: materialGalleryAvoidMate, alt: "Ejercicio para evitar el jaque mate" },
	{ src: materialGalleryPieceValue, alt: "Ficha sobre el valor de las piezas de ajedrez" },
];
const lichessTeachingTools = [
	{ title: "♟️ Simultáneas", description: "Crear una simultánea profesor vs alumnos.", links: [{ label: "Abrir simultáneas", href: "https://lichess.org/simul" }] },
	{ title: "🌪️ Puzzle Storm", description: "3 minutos resolviendo problemas lo más rápido posible.", links: [{ label: "Abrir Puzzle Storm", href: "https://lichess.org/storm" }] },
	{ title: "Puzzle Streak", description: "Conseguir la mayor racha de problemas correctos posible.", links: [{ label: "Abrir Puzzle Streak", href: "https://lichess.org/streak" }] },
	{ title: "🎓 Fundamentos del ajedrez", description: "Para enseñar desde cero movimiento de piezas, jaque, mate y más.", links: [{ label: "Abrir herramienta de colegios", href: "https://goblinajedrez.com/learn/laberintos-piezas/1" }] },
	{ title: "🧠 Practice", description: "Ejercicios guiados de táctica, mates, finales y conceptos fundamentales.", links: [{ label: "Abrir Practice", href: "https://lichess.org/practice" }] },
	{ title: "🏆 Torneos", description: "Crear un pequeño torneo para los alumnos.", links: [{ label: "Arena", href: "https://lichess.org/tournament" }, { label: "Suizo", href: "https://lichess.org/swiss" }] },
];
const studyTools = [
	{ title: "Crear ejercicios de mates", description: "", links: [{ label: "Abrir Lichess Study", href: "https://lichess.org/study" }] },
	{ title: "Crear ejercicios de temas tácticos", description: "", links: [{ label: "Abrir Lichess Study", href: "https://lichess.org/study" }] },
	{ title: "Clonar estudios/capítulos · Stafford Gambit traps", description: "", links: [{ label: "Abrir Stafford Gambit traps", href: "https://lichess.org/study/whCVdUeM/Ue5KaLXB" }] },
	{ title: "Lichess Classes", description: "Crear una clase, añadir alumnos y organizar el trabajo del grupo. Muy útil para profesores.", links: [{ label: "Abrir Lichess Classes", href: "https://lichess.org/class/utSSjM8W" }] },
	...lichessTeachingTools,
	{ title: "Foro de Lichess", description: "Espacio para dudas, consultas y conversaciones sobre ajedrez.", links: [{ label: "Abrir foro de Lichess", href: "https://lichess.org/forum" }] },
	{ title: "Puzzle Racer", description: "Carrera de puzzles para que juegue y participe el grupo en directo.", links: [{ label: "Abrir Puzzle Racer", href: "https://lichess.org/racer/XWgvv" }] },
];
const studyToolIcons: LucideIcon[] = [Swords, BrainCircuit, FolderKanban, GraduationCap, RadioTower, Trophy, MonitorPlay, BookOpenCheck, Database, Network];
const resourceCategoryIcons: Record<string, LucideIcon> = { Radio: RadioTower, "Películas y series": Film, "Plataformas de juego": Gamepad2, "Apps móviles": Smartphone, YouTubers: Youtube };
const resourceQuestions: Record<string, string> = {
	Radio: "¿Qué recursos de radio sobre ajedrez conoces o utilizas?",
	"Películas y series": "¿Qué películas o series de ajedrez conoces o has visto?",
	"Plataformas de juego": "¿Qué plataformas de juego de ajedrez conoces o utilizas?",
	"Apps móviles": "¿Qué apps móviles de ajedrez conoces o utilizas?",
	YouTubers: "¿Qué YouTubers de ajedrez conoces o sigues?",
};

const chessAnnotationSymbols = [
	["!", "Buena jugada"], ["?", "Error"], ["!!", "Jugada brillante"], ["??", "Error grave"], ["!?", "Jugada interesante"], ["?!", "Jugada dudosa"], ["□", "Única jugada"], ["⊙", "Zugzwang"], ["N", "Novedad"], ["↑↑", "Desarrollo"], ["↑", "Iniciativa"], ["→", "Ataque"], ["⇆", "Contraataque"], ["⊕", "Problema de tiempo"], ["=∞", "Con compensación"], ["Δ", "Con la idea"], ["=", "Posición igualada"], ["∞", "Posición poco clara"], ["±", "Las blancas están ligeramente mejor"], ["∓", "Las negras están ligeramente mejor"], ["+−", "Las blancas están mejor"], ["−+", "Las negras están mejor"], ["+−", "Las blancas están ganando"], ["−+", "Las negras están ganando"],
];

export function ChessClasses() {
	const [openActivity, setOpenActivity] = useState<string | null>(null);
	const [openDiscussion, setOpenDiscussion] = useState<"good" | "bad" | null>(null);
	const [studentIdea, setStudentIdea] = useState("");
	const [studentIdeas, setStudentIdeas] = useState<string[]>([]);
	const [badIdea, setBadIdea] = useState("");
	const [badIdeas, setBadIdeas] = useState<string[]>([]);
	const [openBadQuestion, setOpenBadQuestion] = useState(false);
	const [resourceDrafts, setResourceDrafts] = useState<Record<string, string>>({});
	const [resourceIdeas, setResourceIdeas] = useState<Record<string, string[]>>({});
	const [groupDrafts, setGroupDrafts] = useState<Record<string, string>>({});
	const [groupIdeas, setGroupIdeas] = useState<Record<string, string[]>>({});
	const [analysisIdea, setAnalysisIdea] = useState("");
	const [analysisIdeas, setAnalysisIdeas] = useState<string[]>([]);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const [galleryOpen, setGalleryOpen] = useState(false);
	const [aiGalleryIndex, setAiGalleryIndex] = useState(0);
	const [aiGalleryOpen, setAiGalleryOpen] = useState(false);
	const [materialGalleryIndex, setMaterialGalleryIndex] = useState(0);
	const [materialGalleryOpen, setMaterialGalleryOpen] = useState(false);
	const [openStudyTool, setOpenStudyTool] = useState<number | null>(null);
	useEffect(() => {
		updateSEOMetadata({ title: "TIC aplicadas al ajedrez", description: "Una guía visual sobre las herramientas digitales aplicadas al ajedrez.", canonical: "https://goblinajedrez.com/clases-ajedrez", language: "es" });
	}, []);
	useEffect(() => {
		const activity = document.querySelector(".tic-topic__bad-activity");
		const badExamples = document.querySelector(".tic-topic__discussion-trigger--bad");
		if (activity && badExamples) badExamples.before(activity);
	}, [openBadQuestion, openDiscussion]);
	useEffect(() => {
		const answer = document.querySelector(".tic-topic__fen-answer");
		const example = document.querySelector(".tic-topic__fen-example");
		if (answer && example) answer.insertAdjacentElement("afterend", example);
	}, [openActivity]);
	const addStudentIdea = () => {
		const idea = studentIdea.trim();
		if (!idea || studentIdeas.includes(idea)) return;
		setStudentIdeas((ideas) => [...ideas, idea]);
		setStudentIdea("");
	};
	const addBadIdea = () => {
		const idea = badIdea.trim();
		if (!idea || badIdeas.includes(idea)) return;
		setBadIdeas((ideas) => [...ideas, idea]);
		setBadIdea("");
	};
	const addResourceIdea = (category: string) => {
		const idea = resourceDrafts[category]?.trim();
		if (!idea || resourceIdeas[category]?.includes(idea)) return;
		setResourceIdeas((ideas) => ({ ...ideas, [category]: [...(ideas[category] ?? []), idea] }));
		setResourceDrafts((drafts) => ({ ...drafts, [category]: "" }));
	};
	const addGroupIdea = (group: string) => {
		const idea = groupDrafts[group]?.trim();
		if (!idea || groupIdeas[group]?.includes(idea)) return;
		setGroupIdeas((ideas) => ({ ...ideas, [group]: [...(ideas[group] ?? []), idea] }));
		setGroupDrafts((drafts) => ({ ...drafts, [group]: "" }));
	};
	const addAnalysisIdea = () => {
		const idea = analysisIdea.trim();
		if (!idea || analysisIdeas.includes(idea)) return;
		setAnalysisIdeas((ideas) => [...ideas, idea]);
		setAnalysisIdea("");
	};
	const renderGallery = (gallery: { src: string; alt: string }[], index: number, setIndex: React.Dispatch<React.SetStateAction<number>>, isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => <section className="tic-topic__gallery" aria-label="Galería de imágenes"><div className="tic-topic__gallery-image"><img src={gallery[index].src} alt={gallery[index].alt} /><button type="button" onClick={() => setIndex((value) => (value - 1 + gallery.length) % gallery.length)} aria-label="Imagen anterior"><ChevronLeft size={22} aria-hidden="true" /></button><button type="button" onClick={() => setIndex((value) => (value + 1) % gallery.length)} aria-label="Imagen siguiente"><ChevronRight size={22} aria-hidden="true" /></button><button className="tic-topic__gallery-expand" type="button" onClick={() => setOpen(true)} aria-label="Ampliar imagen"><Maximize2 size={19} aria-hidden="true" /></button><span>{index + 1} / {gallery.length}</span></div><div className="tic-topic__gallery-thumbnails">{gallery.map((image, imageIndex) => <button className={imageIndex === index ? "is-active" : undefined} type="button" key={image.src} onClick={() => setIndex(imageIndex)} aria-label={`Ver imagen ${imageIndex + 1}`}><img src={image.src} alt="" /></button>)}</div>{isOpen && <div className="tic-topic__lightbox" role="dialog" aria-modal="true" aria-label="Imagen ampliada" onClick={() => setOpen(false)}><button className="tic-topic__lightbox-close" type="button" aria-label="Cerrar imagen ampliada" onClick={() => setOpen(false)}><X size={24} aria-hidden="true" /></button><button className="tic-topic__lightbox-prev" type="button" aria-label="Imagen anterior" onClick={(event) => { event.stopPropagation(); setIndex((value) => (value - 1 + gallery.length) % gallery.length); }}><ChevronLeft size={29} aria-hidden="true" /></button><img src={gallery[index].src} alt={gallery[index].alt} onClick={(event) => event.stopPropagation()} /><button className="tic-topic__lightbox-next" type="button" aria-label="Imagen siguiente" onClick={(event) => { event.stopPropagation(); setIndex((value) => (value + 1) % gallery.length); }}><ChevronRight size={29} aria-hidden="true" /></button><span>{index + 1} / {gallery.length}</span></div>}</section>;

	return <div className="tic-presentation">
		<header className="tic-presentation__nav">
			<a href="#inicio" className="tic-presentation__brand">TIC · AJEDREZ</a>
			<nav aria-label="Navegación de la presentación"><a href="#formatos">Formatos</a><a href="#analisis">Análisis</a><a href="#clases">Clases</a><a href="#plataformas">Plataformas</a></nav>
		</header>
		<main>
			<section id="inicio" className="tic-presentation__hero">
				<div className="tic-presentation__hero-copy">
					<p className="tic-presentation__eyebrow">GUÍA VISUAL · 2026</p>
					<h1>TIC aplicadas<br />al <span>ajedrez.</span></h1>
					<p>Herramientas, formatos y recursos digitales para enseñar, entrenar, analizar, jugar y organizar ajedrez.</p>
					<a href="#formatos" className="tic-presentation__button">Empezar guía <ExternalLink size={17} aria-hidden="true" /></a>
				</div>
				<aside className="tic-presentation__map" aria-label="Mapa de la guía">
					<p>MAPA DE LA GUÍA</p>
					<div className="tic-presentation__map-path" aria-hidden="true" />
					<div className="tic-presentation__map-node tic-presentation__map-node--formats"><FileCode2 size={24} /><span>01</span><strong>Formatos</strong><small>PGN · FEN · SAN</small></div>
					<div className="tic-presentation__map-node tic-presentation__map-node--data"><Database size={24} /><span>02</span><strong>Datos</strong><small>Partidas y estudios</small></div>
					<div className="tic-presentation__map-node tic-presentation__map-node--analysis"><BrainCircuit size={24} /><span>03</span><strong>Análisis</strong><small>Motor y táctica</small></div>
					<div className="tic-presentation__map-node tic-presentation__map-node--classes"><MonitorPlay size={24} /><span>04</span><strong>Clases</strong><small>Recursos online</small></div>
				</aside>
			</section>
			<div className="tic-presentation__overview" aria-label="Resumen de la guía"><span><b>12</b> BLOQUES <small>Una guía paso a paso</small></span><span><b>PGN · FEN · SAN</b> FORMATOS <small>El idioma del tablero</small></span><span><b>ONLINE</b> RECURSOS <small>Enlaces y herramientas</small></span></div>
			{topics.map((topic) => {
				const Icon = topic.icon;
				const id = topic.number === "02" ? "formatos" : topic.number === "05" ? "analisis" : topic.number === "08" ? "clases" : topic.number === "11" ? "plataformas" : undefined;
				return <section className="tic-topic" id={id} key={topic.number}>
					<div className="tic-topic__heading"><span>{topic.number}</span><p>{topic.kicker}</p><Icon aria-hidden="true" size={31} /></div>
					<div className="tic-topic__content"><h2>{topic.title}</h2>{topic.number === "01.5" && <img className="tic-topic__resources-map" src={resourcesMap} alt="Recursos de ajedrez: radio, películas, plataformas, aplicaciones y vídeos" />}<div className="tic-topic__body">{topicLeads[topic.number] && <p className="tic-topic__lead"><strong>{topic.number === "01" ? <>TIC y ajedrez se refiere al uso de las <span className="tic-topic__lead-highlight">Tecnologías de la Información y la Comunicación (TIC)</span> aplicadas al aprendizaje, entrenamiento, enseñanza y práctica del ajedrez.</> : topicLeads[topic.number]}</strong></p>}{topic.number === "01" && <img className="tic-topic__tic-map-image" src={ticChessMap} alt="Historia del ajedrez: del tablero clásico a la inteligencia artificial" />}{(topic.number === "01.5" ? [] : fullGuide[topic.number]).map((paragraph) => {
						const isQuestion = paragraph.endsWith("?");
						const isTicDefinition = topic.number === "01" && paragraph.startsWith("Las TIC son herramientas");
						const isStudyCreation = paragraph.startsWith("Para crear uno: entra en Lichess Study");
						const isAiWarning = paragraph === "Siempre conviene revisar el resultado antes de usarlo con el alumnado.";
						const isAiGallery = paragraph === "__AI_GALLERY__";
						const isCodeExample = paragraph.startsWith("Una cabecera conceptual");
						const isPgnExplanation = paragraph.startsWith("PGN (Portable Game Notation)");
						const isFenExplanation = paragraph.startsWith("FEN (Forsyth-Edwards Notation)");
						const isSanExplanation = paragraph.startsWith("SAN es la notación");
						const isUciExplanation = paragraph.startsWith("UCI aparece");
						const notationName = isPgnExplanation ? "PGN" : isFenExplanation ? "FEN" : isSanExplanation ? "SAN" : isUciExplanation ? "UCI" : null;
						const isOpen = openActivity === paragraph;
						if (isTicDefinition) return <div key={paragraph}><p>{paragraph}</p>{renderGallery(ticGallery, galleryIndex, setGalleryIndex, galleryOpen, setGalleryOpen)}<a className="tic-topic__gallery-link" href="https://lichess.org/" target="_blank" rel="noreferrer"><Link2 size={16} aria-hidden="true" />Abrir Lichess<ExternalLink size={14} aria-hidden="true" /></a></div>;
						if (isAiGallery) return <div key={paragraph}>{renderGallery(aiGallery, aiGalleryIndex, setAiGalleryIndex, aiGalleryOpen, setAiGalleryOpen)}</div>;
						if (isStudyCreation) return <div key={paragraph}><p>{paragraph}</p><div className="tic-topic__study-tools">{studyTools.map((tool, index) => { const isToolOpen = openStudyTool === index; const ToolIcon = studyToolIcons[index] ?? FolderKanban; return <section key={tool.title}><button className={`tic-topic__activity tic-topic__study-tool tic-topic__study-tool--${index % 5}`} type="button" aria-expanded={isToolOpen} onClick={() => setOpenStudyTool(isToolOpen ? null : index)}><ToolIcon aria-hidden="true" size={24} /><span>HERRAMIENTA {String(index + 1).padStart(2, "0")}</span><small>{isToolOpen ? "Pulsa para cerrar" : "Pulsa para abrir"}</small><ChevronDown className={isToolOpen ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{isToolOpen && <div className="tic-topic__study-tool-content"><h3>{tool.title}</h3>{tool.description && <p><strong>{tool.description}</strong></p>}{tool.links.map((link) => <a className="tic-topic__study-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}><Link2 size={16} aria-hidden="true" />{link.label}<ExternalLink size={14} aria-hidden="true" /></a>)}</div>}</section>; })}</div></div>;
						if (isAiWarning) return <p className="tic-topic__ai-warning" key={paragraph}><strong>{paragraph}</strong></p>;
						if (isUciExplanation) return <div key={paragraph} className="tic-topic__uci-block"><button className="tic-topic__activity tic-topic__activity--fen" type="button" aria-expanded={isOpen} onClick={() => setOpenActivity(isOpen ? null : paragraph)}><FileCode2 aria-hidden="true" size={24} /><span>ACTIVIDAD · CLASE</span><strong>¿Qué es UCI?</strong><ChevronDown className={isOpen ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{isOpen && <div className="tic-topic__fen-answer"><p>{paragraph}</p><ul className="tic-topic__san-examples"><li><code>e2e4</code><span>una pieza va de e2 a e4</span></li><li><code>g1f3</code><span>una pieza va de g1 a f3</span></li><li><code>f1b5</code><span>una pieza va de f1 a b5</span></li><li><code>e5d4</code><span>una pieza va de e5 a d4</span></li></ul></div>}<details className="tic-topic__symbols tic-topic__symbols--after-uci"><summary><FileCode2 size={19} aria-hidden="true" /><span>Símbolos de anotación ajedrecística</span><ChevronDown size={18} aria-hidden="true" /></summary><div>{chessAnnotationSymbols.map(([symbol, meaning]) => <p key={`${symbol}-${meaning}`}><code>{symbol}</code><strong>{meaning}</strong></p>)}</div></details></div>;
						if (isUciExplanation) return <div key={paragraph}><button className="tic-topic__activity tic-topic__activity--fen" type="button" aria-expanded={isOpen} onClick={() => setOpenActivity(isOpen ? null : paragraph)}><FileCode2 aria-hidden="true" size={24} /><span>ACTIVIDAD · CLASE</span>{isOpen ? <strong>¿Qué es UCI?</strong> : <small>Pulsa para mostrar la pregunta</small>}<ChevronDown className={isOpen ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{isOpen && <div className="tic-topic__fen-answer"><strong>¿Qué es UCI?</strong><p>{paragraph}</p><ul className="tic-topic__san-examples"><li><code>e2e4</code><span>una pieza va de e2 a e4</span></li><li><code>g1f3</code><span>una pieza va de g1 a f3</span></li><li><code>f1b5</code><span>una pieza va de f1 a b5</span></li><li><code>e5d4</code><span>una pieza va de e5 a d4</span></li></ul></div>}<details className="tic-topic__symbols tic-topic__symbols--after-uci"><summary><FileCode2 size={19} aria-hidden="true" /><span>Símbolos de anotación ajedrecística</span><ChevronDown size={18} aria-hidden="true" /></summary><div>{chessAnnotationSymbols.map(([symbol, meaning]) => <p key={`${symbol}-${meaning}`}><code>{symbol}</code><strong>{meaning}</strong></p>)}</div></details></div>;
						if (notationName && !isOpen) return <button className="tic-topic__activity tic-topic__activity--fen" type="button" aria-expanded="false" onClick={() => setOpenActivity(paragraph)} key={paragraph}><FileCode2 aria-hidden="true" size={24} /><span>ACTIVIDAD · CLASE</span><strong>{`¿Qué es ${notationName}?`}</strong><ChevronDown className="tic-topic__activity-chevron" aria-hidden="true" size={19} /></button>;
						return isCodeExample ? <details className="tic-topic__code-example" key={paragraph}><summary><FileCode2 size={20} aria-hidden="true" /><span>Ejemplo · cabecera PGN y mate del pastor</span><ChevronDown size={18} aria-hidden="true" /></summary><div><p>Ejemplo completo en formato PGN:</p><code className="tic-code__moves tic-code__pgn-full"><span>[Event </span><span className="tic-code__string">“Mate del pastor”</span><span>]</span>{"\n"}<span>[White </span><span className="tic-code__string">“Jugador A”</span><span>]</span>{"\n"}<span>[Black </span><span className="tic-code__string">“Jugador B”</span><span>]</span>{"\n"}<span>[Result </span><span className="tic-code__result">“1-0”</span><span>]</span>{"\n\n"}<span>1. e4 e5 2. Ac4 Cc6 3. Dh5 </span><span className="tic-code__mistake">Cf6??</span><span> 4. </span><span className="tic-code__mate">Dxf7#</span><span> 1-0</span></code></div></details> : notationName ? <div key={paragraph}><button className="tic-topic__activity tic-topic__activity--fen" type="button" aria-expanded={isOpen} onClick={() => setOpenActivity(isOpen ? null : paragraph)}><FileCode2 aria-hidden="true" size={24} /><span>ACTIVIDAD · CLASE</span>{isOpen ? <strong>{`¿Qué es ${notationName}?`}</strong> : <small>Pulsa para mostrar la pregunta</small>}<ChevronDown className={isOpen ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{isOpen && <div className="tic-topic__fen-answer"><strong>{`¿Qué es ${notationName}?`}</strong><p>{paragraph}</p>{isSanExplanation && <ul className="tic-topic__san-examples"><li><code>e4</code><span>peón mueve a e4</span></li><li><code>Cf3</code><span>caballo mueve a f3</span></li><li><code>Ab5</code><span>alfil mueve a b5</span></li><li><code>Txe5</code><span>torre captura en e5</span></li><li><code>Axc6</code><span>alfil captura en c6</span></li></ul>}{isUciExplanation && <ul className="tic-topic__san-examples"><li><code>e2e4</code><span>una pieza va de e2 a e4</span></li><li><code>g1f3</code><span>una pieza va de g1 a f3</span></li><li><code>f1b5</code><span>una pieza va de f1 a b5</span></li><li><code>e5d4</code><span>una pieza va de e5 a d4</span></li></ul>}</div>}</div> : isQuestion ? <div key={paragraph}><button className="tic-topic__activity" type="button" aria-expanded={isOpen} onClick={() => setOpenActivity(isOpen ? null : paragraph)}><BrainCircuit aria-hidden="true" size={24} /><span>ACTIVIDAD · CLASE</span>{isOpen ? <strong>{paragraph}</strong> : <small>Pulsa para mostrar la pregunta</small>}<ChevronDown className={isOpen ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{isOpen && <section className="tic-topic__whiteboard" aria-label="Respuestas del grupo"><div className="tic-topic__whiteboard-title"><NotebookPen size={18} aria-hidden="true" /><strong>Respuestas del grupo</strong></div><form onSubmit={(event) => { event.preventDefault(); addStudentIdea(); }}><label className="sr-only" htmlFor="student-idea">Nueva respuesta</label><input id="student-idea" value={studentIdea} onChange={(event) => setStudentIdea(event.target.value)} placeholder="Escribe una respuesta" /><button type="submit" disabled={!studentIdea.trim()} aria-label="Añadir respuesta"><SendHorizontal size={17} aria-hidden="true" /></button></form>{studentIdeas.length > 0 && <ul>{studentIdeas.map((idea) => <li key={idea}><span>{idea}</span><button type="button" onClick={() => setStudentIdeas((ideas) => ideas.filter((item) => item !== idea))} aria-label={`Eliminar ${idea}`}><X size={15} aria-hidden="true" /></button></li>)}</ul>}</section>}</div> : <p key={paragraph}>{paragraph}</p>;
					})}{topic.number === "09.5" && <><div className="tic-topic__discussion tic-topic__ai-uses"><button type="button" className="tic-topic__discussion-trigger tic-topic__discussion-trigger--good" aria-expanded={openActivity === "ai-uses"} onClick={() => setOpenActivity(openActivity === "ai-uses" ? null : "ai-uses")}><ThumbsUp size={20} aria-hidden="true" /><span>Usos de la IA</span><ChevronDown className={openActivity === "ai-uses" ? "tic-topic__activity-chevron--open" : undefined} size={19} aria-hidden="true" /></button>{openActivity === "ai-uses" && <div className="tic-topic__discussion-content"><p>Preparar actividades, adaptar explicaciones al nivel del grupo, generar preguntas y crear borradores de fichas.</p></div>}</div><section className="tic-topic__ai-tool"><button className="tic-topic__activity" type="button" aria-expanded={openActivity === "ai-tool-vibechess"} onClick={() => setOpenActivity(openActivity === "ai-tool-vibechess" ? null : "ai-tool-vibechess")}><BrainCircuit aria-hidden="true" size={24} /><span>HERRAMIENTA 01</span><small>{openActivity === "ai-tool-vibechess" ? "Pulsa para cerrar" : "Pulsa para abrir"}</small><ChevronDown className={openActivity === "ai-tool-vibechess" ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{openActivity === "ai-tool-vibechess" && <div className="tic-topic__study-tool-content"><h3>VibeChess</h3><p><strong>Herramienta de IA para ajedrez.</strong></p><a className="tic-topic__study-link" href="https://app.vibechess.me/" target="_blank" rel="noreferrer"><Link2 size={16} aria-hidden="true" />Abrir VibeChess<ExternalLink size={14} aria-hidden="true" /></a></div>}</section></>}{topic.number === "01" && <div className="tic-topic__discussion"><button type="button" className="tic-topic__discussion-trigger tic-topic__discussion-trigger--good" aria-expanded={openDiscussion === "good"} onClick={() => setOpenDiscussion(openDiscussion === "good" ? null : "good")}><ThumbsUp size={20} aria-hidden="true" /><span>Cosas buenas</span><ChevronDown className={openDiscussion === "good" ? "tic-topic__activity-chevron--open" : undefined} size={19} aria-hidden="true" /></button>{openDiscussion === "good" && <div className="tic-topic__discussion-content">{technologyDiscussion.good.map((resource) => <a href={resource.href} target="_blank" rel="noreferrer" key={resource.href}><Link2 size={16} aria-hidden="true" /><span>{resource.label}</span><ExternalLink size={14} aria-hidden="true" /></a>)}</div>}<button type="button" className="tic-topic__discussion-trigger tic-topic__discussion-trigger--bad" aria-expanded={openDiscussion === "bad"} onClick={() => setOpenDiscussion(openDiscussion === "bad" ? null : "bad")}><TriangleAlert size={20} aria-hidden="true" /><span>Cosas malas</span><ChevronDown className={openDiscussion === "bad" ? "tic-topic__activity-chevron--open" : undefined} size={19} aria-hidden="true" /></button>{openDiscussion === "bad" && <div className="tic-topic__discussion-content tic-topic__discussion-cases">{technologyDiscussion.bad.map((item) => <a href={item.href} target="_blank" rel="noreferrer" key={item.href}><Link2 size={16} aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.description}</small></span><ExternalLink size={14} aria-hidden="true" /></a>)}</div>}</div>}{topic.number === "01.5" && <div className="tic-topic__resource-boards">{resourceCategories.map((category) => { const ResourceIcon = resourceCategoryIcons[category]; const question = resourceQuestions[category]; const isOpen = openActivity === category; return <section key={category}><button className="tic-topic__activity" type="button" aria-expanded={isOpen} onClick={() => setOpenActivity(isOpen ? null : category)}><ResourceIcon aria-hidden="true" size={24} /><span>ACTIVIDAD · CLASE</span>{isOpen ? <strong>{question}</strong> : <small>Pulsa para mostrar la pregunta</small>}<ChevronDown className={isOpen ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{isOpen && <div className="tic-topic__whiteboard"><div className="tic-topic__whiteboard-title"><ResourceIcon size={18} aria-hidden="true" /><strong>{category} · Respuestas del grupo</strong></div><form onSubmit={(event) => { event.preventDefault(); addResourceIdea(category); }}><label className="sr-only" htmlFor={`resource-${category}`}>Añadir recurso de {category}</label><input id={`resource-${category}`} value={resourceDrafts[category] ?? ""} onChange={(event) => setResourceDrafts((drafts) => ({ ...drafts, [category]: event.target.value }))} placeholder="Escribe una respuesta" /><button type="submit" disabled={!resourceDrafts[category]?.trim()} aria-label={`Añadir recurso de ${category}`}><SendHorizontal size={17} aria-hidden="true" /></button></form>{(resourceIdeas[category]?.length ?? 0) > 0 && <ul>{resourceIdeas[category].map((idea) => <li key={idea}><span>{idea}</span><button type="button" onClick={() => setResourceIdeas((ideas) => ({ ...ideas, [category]: ideas[category].filter((item) => item !== idea) }))} aria-label={`Eliminar ${idea}`}><X size={15} aria-hidden="true" /></button></li>)}</ul>}</div>}</section>; })}</div>}</div>{topic.resources.length > 0 && <div className="tic-topic__links">{topic.resources.map((resource) => <a href={resource.href} target="_blank" rel="noreferrer" key={resource.href}><Link2 className="tic-topic__link-icon" size={16} aria-hidden="true" /><span>{resource.label}</span><ExternalLink size={14} aria-hidden="true" /></a>)}</div>}</div>
					{topic.number === "09.5" && <section className="tic-topic__ai-tool"><button className="tic-topic__activity" type="button" aria-expanded={openActivity === "ai-tool-puzzles"} onClick={() => setOpenActivity(openActivity === "ai-tool-puzzles" ? null : "ai-tool-puzzles")}><BrainCircuit aria-hidden="true" size={24} /><span>HERRAMIENTA 02</span><small>{openActivity === "ai-tool-puzzles" ? "Pulsa para cerrar" : "Pulsa para abrir"}</small><ChevronDown className={openActivity === "ai-tool-puzzles" ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{openActivity === "ai-tool-puzzles" && <div className="tic-topic__study-tool-content"><h3>Generador de puzzles ChatGPT</h3><p><strong>Crea ejercicios de ajedrez a partir de la base de puzzles de Lichess.</strong></p><a className="tic-topic__study-link" href="https://chatgpt.com/g/g-6a0d8e58749c8191813ae4b330fdfbde-generador-de-puzzles-con-base-lichess-ejercicios" target="_blank" rel="noreferrer"><Link2 size={16} aria-hidden="true" />Abrir generador de puzzles<ExternalLink size={14} aria-hidden="true" /></a></div>}</section>}
					{topic.number === "05" && <section className="tic-topic__analysis-question"><button className="tic-topic__activity" type="button" aria-expanded={openActivity === "analysis-question"} onClick={() => setOpenActivity(openActivity === "analysis-question" ? null : "analysis-question")}><BrainCircuit aria-hidden="true" size={24} /><span>ACTIVIDAD · CLASE</span>{openActivity === "analysis-question" ? <strong>¿Funciona siempre el módulo?</strong> : <small>Pulsa para mostrar la pregunta</small>}<ChevronDown className={openActivity === "analysis-question" ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{openActivity === "analysis-question" && <section className="tic-topic__whiteboard" aria-label="Respuestas del grupo: módulo de análisis"><div className="tic-topic__whiteboard-title"><NotebookPen size={18} aria-hidden="true" /><strong>Respuestas del grupo</strong></div><form onSubmit={(event) => { event.preventDefault(); addAnalysisIdea(); }}><label className="sr-only" htmlFor="analysis-idea">Nueva respuesta</label><input id="analysis-idea" value={analysisIdea} onChange={(event) => setAnalysisIdea(event.target.value)} placeholder="Escribe una respuesta" /><button type="submit" disabled={!analysisIdea.trim()} aria-label="Añadir respuesta"><SendHorizontal size={17} aria-hidden="true" /></button></form>{analysisIdeas.length > 0 && <ul>{analysisIdeas.map((idea) => <li key={idea}><span>{idea}</span><button type="button" onClick={() => setAnalysisIdeas((ideas) => ideas.filter((item) => item !== idea))} aria-label={`Eliminar ${idea}`}><X size={15} aria-hidden="true" /></button></li>)}</ul>}</section>}</section>}
					{topic.number === "05" && <section className="tic-topic__analysis-study"><button className="tic-topic__activity" type="button" aria-expanded={openActivity === "analysis-study"} onClick={() => setOpenActivity(openActivity === "analysis-study" ? null : "analysis-study")}><BrainCircuit aria-hidden="true" size={24} /><span>ESTUDIO · ANÁLISIS</span><small>{openActivity === "analysis-study" ? "Pulsa para cerrar" : "Pulsa para abrir"}</small><ChevronDown className={openActivity === "analysis-study" ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{openActivity === "analysis-study" && <div className="tic-topic__study-tool-content"><h3>Estudio de análisis de partidas</h3><a className="tic-topic__study-link" href="https://lichess.org/study/zrAMCnJN/SAGotO9t" target="_blank" rel="noreferrer"><Link2 size={16} aria-hidden="true" />Abrir estudio en Lichess<ExternalLink size={14} aria-hidden="true" /></a></div>}</section>}
					{topic.number === "01" && <div className="tic-topic__bad-activity"><button className="tic-topic__activity" type="button" aria-expanded={openBadQuestion} onClick={() => setOpenBadQuestion((open) => !open)}><TriangleAlert aria-hidden="true" size={24} /><span>ACTIVIDAD · CLASE</span>{openBadQuestion ? <strong>¿Qué cosas malas tiene la tecnología en el ajedrez?</strong> : <small>Pulsa para mostrar la pregunta</small>}<ChevronDown className={openBadQuestion ? "tic-topic__activity-chevron tic-topic__activity-chevron--open" : "tic-topic__activity-chevron"} aria-hidden="true" size={19} /></button>{openBadQuestion && <section className="tic-topic__whiteboard" aria-label="Respuestas del grupo: cosas malas"><div className="tic-topic__whiteboard-title"><NotebookPen size={18} aria-hidden="true" /><strong>Respuestas del grupo</strong></div><form onSubmit={(event) => { event.preventDefault(); addBadIdea(); }}><label className="sr-only" htmlFor="bad-idea">Nueva respuesta</label><input id="bad-idea" value={badIdea} onChange={(event) => setBadIdea(event.target.value)} placeholder="Escribe una respuesta" /><button type="submit" disabled={!badIdea.trim()} aria-label="Añadir respuesta"><SendHorizontal size={17} aria-hidden="true" /></button></form>{badIdeas.length > 0 && <ul>{badIdeas.map((idea) => <li key={idea}><span>{idea}</span><button type="button" onClick={() => setBadIdeas((ideas) => ideas.filter((item) => item !== idea))} aria-label={`Eliminar ${idea}`}><X size={15} aria-hidden="true" /></button></li>)}</ul>}</section>}</div>}
					{topic.number === "02" && openActivity?.startsWith("FEN ") && <details className="tic-topic__fen-example" open><summary><FileCode2 size={19} aria-hidden="true" /><span>Ejemplo · cómo leer un FEN</span><ChevronDown size={18} aria-hidden="true" /></summary><div><code>rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1</code><p><b>Las barras</b> separan las ocho filas, empezando por la fila 8 y terminando en la 1.</p><p><b>Las letras minúsculas</b> son piezas negras; <b>las mayúsculas</b>, piezas blancas.</p><p><b>El número 8</b> significa “ocho casillas vacías”. En la posición inicial hay dos filas de piezas, cuatro filas vacías y otras dos filas de piezas.</p><p><b>La w</b> significa que mueven blancas. Si apareciera <b>b</b>, moverían negras.</p><img className="tic-topic__fen-image" src={fenRowByRow} alt="Ejemplo visual de cómo el FEN describe cada fila del tablero" /><p className="tic-topic__fen-row"><b>Ejemplo: r1bk3r</b> es la fila 8. <b>r</b>: torre negra en a8; <b>1</b>: una casilla vacía en b8; <b>b</b>: alfil negro en c8; <b>k</b>: rey negro en d8; <b>3</b>: tres vacías (e8, f8 y g8); y <b>r</b>: torre negra en h8.</p></div></details>}
					{topic.number === "09" && <div className="tic-topic__material-gallery">{renderGallery(materialGallery, materialGalleryIndex, setMaterialGalleryIndex, materialGalleryOpen, setMaterialGalleryOpen)}</div>}
					{topic.number === "09" && <section className="tic-topic__audience-workshop"><div className="tic-topic__audience-heading"><Network size={21} aria-hidden="true" /><div><span>ACTIVIDAD · CLASE</span><strong>Diseñamos para cada grupo</strong></div></div><p>¿Qué recurso, presentación o actividad de ajedrez prepararíamos para cada uno?</p><div className="tic-topic__audiences">{audienceGroups.map((group) => <section key={group}><strong>{group}</strong><div className="tic-topic__whiteboard" aria-label={`Ideas para ${group}`}><div className="tic-topic__whiteboard-title"><NotebookPen size={18} aria-hidden="true" /><strong>Ideas</strong></div><form onSubmit={(event) => { event.preventDefault(); addGroupIdea(group); }}><label className="sr-only" htmlFor={`group-${group}`}>Nueva idea para {group}</label><input id={`group-${group}`} value={groupDrafts[group] ?? ""} onChange={(event) => setGroupDrafts((drafts) => ({ ...drafts, [group]: event.target.value }))} placeholder="Escribe una idea" /><button type="submit" disabled={!groupDrafts[group]?.trim()} aria-label={`Añadir idea para ${group}`}><SendHorizontal size={17} aria-hidden="true" /></button></form>{(groupIdeas[group]?.length ?? 0) > 0 && <ul>{groupIdeas[group].map((idea) => <li key={idea}><span>{idea}</span><button type="button" onClick={() => setGroupIdeas((ideas) => ({ ...ideas, [group]: ideas[group].filter((item) => item !== idea) }))} aria-label={`Eliminar ${idea}`}><X size={15} aria-hidden="true" /></button></li>)}</ul>}</div></section>)}</div></section>}
					{topic.number === "04" && <section className="tic-topic__lichess-tools"><p className="tic-presentation__eyebrow">MÁS HERRAMIENTAS DE LICHESS</p>{lichessTeachingTools.map((tool) => <article key={tool.title}><h3>{tool.title}</h3><p>{tool.description}</p><div>{tool.links.map((link) => <a className="tic-topic__study-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}><Link2 size={16} aria-hidden="true" />{link.label}<ExternalLink size={14} aria-hidden="true" /></a>)}</div></article>)}</section>}
				</section>;
			})}
		</main>
		<footer className="tic-presentation__footer"><b>TIC · AJEDREZ</b><span>Guía de recursos para aprender y enseñar.</span></footer>
	</div>;
}
