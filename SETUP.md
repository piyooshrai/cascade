# Cascade Setup Guide

## Prerequisites
1. **Supabase Account** - https://supabase.com
2. **Anthropic API Key** - https://console.anthropic.com

## Step 1: Set Up Supabase

1. Create a new project at https://supabase.com/dashboard
2. Once created, go to **Project Settings** → **API**
3. Copy these values:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - `anon` / `public` key

## Step 2: Run Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Open the file `supabase-schema.sql` from this repo
3. Copy the entire contents and paste into the SQL Editor
4. Click **Run** to create the tables and policies

## Step 3: Get Anthropic API Key

1. Go to https://console.anthropic.com
2. Create an API key
3. Copy the key (starts with `sk-ant-`)

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your real credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key
```

## Step 5: Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Step 6: Test It Out

1. Click **Create New**
2. Enter a URL (e.g., https://anthropic.com)
3. Select a theme
4. Click **Generate Presentation**

The app will:
- Scrape the URL content
- Send it to Claude AI
- Generate slides
- Store in Supabase
- Display the presentation

## Deployment (Vercel/Netlify)

Add the same environment variables in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ANTHROPIC_API_KEY`

## Troubleshooting

**Build errors about Supabase:**
- The app uses placeholder values during build if env vars aren't set
- This is intentional - just make sure `.env.local` exists for local dev

**API errors:**
- Check that your Anthropic API key is valid
- Check Supabase credentials are correct
- Check the browser console for specific error messages
