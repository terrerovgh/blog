#!/usr/bin/env node
// Generador de posts para el blog
// Uso: node generate-post.js <topic> [--title "Title"] [--category "tech"]

const fs = require('fs');
const path = require('path');

const TOPICS = {
  'docker': {
    categories: ['DevOps', 'Containers', 'Linux'],
    tags: ['docker', 'containers', 'devops', 'virtualization'],
    prompt: 'Escribe un tutorial técnico sobre Docker, incluyendo comandos útiles, mejores prácticas y consejos para producción.'
  },
  'linux': {
    categories: ['System Administration', 'Linux'],
    tags: ['linux', 'sysadmin', 'cli', 'server'],
    prompt: 'Escribe una guía práctica sobre administración de sistemas Linux, incluyendo comandos, scripts útiles y configuraciones.'
  },
  'programming': {
    categories: ['Development', 'Software Engineering'],
    tags: ['programming', 'development', 'code', 'best-practices'],
    prompt: 'Escribe un artículo sobre desarrollo de software, patrones de diseño, arquitectura o mejores prácticas de programación.'
  },
  'ai': {
    categories: ['Artificial Intelligence', 'Technology'],
    tags: ['ai', 'machine-learning', 'llm', 'automation'],
    prompt: 'Escribe sobre inteligencia artificial, modelos de lenguaje, automatización o herramientas de IA.'
  },
  'openclaw': {
    categories: ['Automation', 'Open Source'],
    tags: ['openclaw', 'automation', 'ai-agents', 'self-hosting'],
    prompt: 'Escribe sobre OpenClaw, agentes de IA, automatización personal o self-hosting de herramientas.'
  },
  'music': {
    categories: ['Music', 'Culture'],
    tags: ['music', 'production', 'art', 'creativity'],
    prompt: 'Escribe sobre música, producción musical, descubrimientos o reflexiones sobre el arte sonoro.'
  },
  'hiking': {
    categories: ['Outdoors', 'Adventure'],
    tags: ['hiking', 'nature', 'exploration', 'health'],
    prompt: 'Escribe sobre senderismo, exploración al aire libre, rutas o la conexión con la naturaleza.'
  },
  'tech': {
    categories: ['Technology', 'Innovation'],
    tags: ['tech', 'gadgets', 'innovation', 'future'],
    prompt: 'Escribe sobre tecnología emergente, gadgets, tendencias o el futuro digital.'
  },
  'random': {
    categories: ['Thoughts', 'Miscellaneous'],
    tags: ['thoughts', 'observations', 'life'],
    prompt: 'Escribe una reflexión, observación o idea interesante del día.'
  }
};

const POSTS_DIR = path.join(__dirname, '..', 'src', 'content', 'posts');

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function generateFrontmatter(title, description, topic, date) {
  const topicConfig = TOPICS[topic] || TOPICS.random;
  const categories = topicConfig.categories.join(', ');
  const tags = topicConfig.tags.join(', ');
  
  return `---
title: '${title}'
description: '${description}'
pubDate: '${date}'
categories: [${categories}]
tags: [${tags}]
author: 'Sagwa'
draft: false
---
`;
}

function main() {
  const args = process.argv.slice(2);
  const topic = args[0] || 'random';
  
  if (!TOPICS[topic]) {
    console.error(`Topic '${topic}' not found. Available: ${Object.keys(TOPICS).join(', ')}`);
    process.exit(1);
  }

  console.log('Generated template for topic:', topic);
  console.log('Prompt:', TOPICS[topic].prompt);
  console.log('Categories:', TOPICS[topic].categories);
  console.log('Tags:', TOPICS[topic].tags);
}

if (require.main === module) {
  main();
}

module.exports = { TOPICS, generateFrontmatter, generateSlug };
