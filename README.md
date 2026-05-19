 # Furniture AI Agent

An AI-powered furniture sales assistant that automates customer inquiries by providing product recommendations, pricing, and images in Arabic instantly.

## Problem & Solution

Furniture companies spend significant resources answering repetitive inquiries regarding product availability, pricing, and visuals. This agent automates the entire discovery process through a conversational Arabic chat interface. Customers describe their needs, and the system instantly returns matching product names, descriptions, pricing, and inline images.

## Core Features

* **Native Arabic Support:** Optimized for natural conversations in local Arabic dialects.
* **Dynamic Catalog:** Powered by Google Sheets (via CSV), allowing real-time inventory updates without code changes.
* **Low-Latency Responses:** Utilizes Groq's LPU inference engine for near-instant replies.
* **Inline Product Media:** Renders product images directly inside the chat interface.
* **Premium Responsive UI:** Mobile-first design tailored to high-end brand aesthetics.

## Tech Stack

* **Frontend:** React 18, Vite, TailwindCSS
* **LLM Engine:** Groq API (`llama-3.3-70b-versatile`)
* **Data Storage:** Google Sheets (CSV Export)
* **Media CDN:** ImageKit
* **Hosting:** Vercel

## Architecture Flow

```
User Message ➔ React Chat UI ➔ Groq API (System Prompt + Sheet Catalog) ➔ AI Response with Images

```

## Getting Started

### Prerequisites

* Node.js 18+
* Groq API Key


## Author
**Hussein Ibrahim** — AI Engineer
