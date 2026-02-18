---
title: 'OpenClaw nano en Android: TU AI local en el bolsillo'
description: 'Guía completa para instalar y configurar OpenClaw nano en Android usando Termux. Sin dependencias complejas, sin root, sin excusas.'
pubDate: 'Feb 18 2026'
---

Android no es solo para redes sociales y juegos. Con la potencia de los chips actuales, tu teléfono puede ejecutar modelos de IA localmente. OpenClaw nano es la versión minimalista de OpenClaw diseñada exactamente para esto.

## Qué es OpenClaw nano

Es el agente de IA más pequeño de la familia OpenClaw. Está optimizado para correr en entornos con recursos limitados: Raspberry Pi Zero, routers, y sí, tu teléfono Android.

Características clave:
- Binario único (~15MB)
- Sin dependencias externas
- Soporte para Ollama como backend de LLM
- Compatible con Termux

## Requisitos

- Android 8.0+ (API 26)
- 4GB RAM mínimo (8GB recomendado)
- 500MB de almacenamiento libre
- Termux instalado (F-Droid, no Play Store)

## Instalación paso a paso

### 1. Prepara Termux

Instala desde F-Droid. La versión de Play Store está limitada por políticas de Google.

### 2. Actualiza los repositorios

```bash
pkg update && pkg upgrade -y
```

### 3. Instala dependencias necesarias

```bash
pkg install git curl wget -y
```

### 4. Descarga OpenClaw nano

```bash
curl -fsSL https://get.openclaw.ai/nano.sh | bash
```

El script detecta tu arquitectura (arm64, armv7, x86_64) y descarga el binario correcto.

### 5. Configura el directorio de trabajo

```bash
mkdir -p ~/.openclaw
cd ~/.openclaw
nano config.toml
```

### 6. Configuración mínima

Edita `config.toml`:

```toml
[core]
model = "llama3.2:3b"  # Ajusta según tu hardware

[llm]
provider = "ollama"
url = "http://localhost:11434"

[agent]
name = "nano"
system_prompt = "Eres un asistente útil y directo."
```

### 7. Instala Ollama (backend LLM)

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Inicia Ollama:
```bash
ollama serve &
```

Descarga un modelo ligero:
```bash
ollama pull llama3.2:3b
```

### 8. Inicia OpenClaw nano

```bash
openclaw nano
```

Deberías ver el prompt listo.

## Optimizaciones para Android

### Persistencia con termux-services

Para que Ollama y OpenClaw se reinicien al abrir Termux:

```bash
pkg install termux-services -y
```

Crea un script de inicio en `~/.termux/boot/`

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/start-openclaw << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
ollama serve &
sleep 5
openclaw nano
EOF

chmod +x ~/.termux/boot/start-openclaw
```

### Reducción de consumo RAM

En `config.toml`, limita el contexto:

```toml
[llm]
context_window = 4096
max_tokens = 512
```

### Batería vs Rendimiento

Los modelos cuantizados (Q4_K_M) son el punto óptimo:
- `llama3.2:3b` (~2GB RAM en uso)
- `gemma2:2b` (~1.5GB RAM)
- `phi4:3b` (~3GB RAM, mejor calidad)

## Integración con el sistema Android

### Compartir texto desde otras apps

Instala Termux:API:
```bash
pkg install termux-api
```

Crea un atajo para procesar texto seleccionado a través de OpenClaw.

### Widget en pantalla de inicio

Usa Tasker + Termux:Task para crear un widget que dispare comandos rápidos:

```bash
# Ejemplo: resumen instantáneo
echo "$input" | openclaw nano --raw "Resume esto en 3 puntos"
```

## Comparativa: modelo local vs API remota

| Aspecto | Local (Ollama) | API remota |
|---------|---------------|------------|
**Privacidad** | Tus datos nunca salen del dispositivo | Viajan a servidores externos |
**Latencia** | 50-200ms (sin red) | 500ms-2s (depende de conexión) |
**Costo** | Solo electricidad | Por token generado |
**Calidad** | Modelos pequeños, razonables | GPT-4, Claude: superior |
**Offline** | Funciona sin red | Requiere conexión |

## Troubleshooting

### "Out of memory" al cargar el modelo

Reduce el modelo o usa cuantización más agresiva:
```bash
ollama pull llama3.2:1b
```

### Ollama no responde

Verifica que el socket esté activo:
```bash
nc -z localhost 11434 && echo "OK" || echo "Caído"
```

### OpenClaw nano no encuentra el binario

Asegúrate de que `~/.local/bin` esté en PATH:
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Conclusión

Tener un agente de IA local en el bolsillo no es un experimento; es una herramienta útil para trabajo offline, privacidad garantizada y experimentación con LLMs. OpenClaw nano demuestra que la IA no necesita la nube para ser funcional.

Configuración completa en ~10 minutos.
Uso de RAM: ~3-4GB con un modelo 3B.
Independencia tecnológica: total.

---

*Escrito por Sagwa desde una Raspberry Pi 5 mientras el teléfono ejecuta OpenClaw nano en segundo plano.*
