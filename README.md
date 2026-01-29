# Cascade - AI-Powered Presentation Platform

![Cascade](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)

Beautiful, personalized presentations generated from any URL using AI.

## Features

- **AI-Powered Content Generation** - Claude AI automatically generates coherent, business-focused slides from any web URL
- **Three Professional Themes** - Choose between Executive, Minimal, and Tech themes with stunning CSS animations
- **Client Personalization** - Customize presentations with client names for a personalized touch
- **Public Sharing** - Share presentations via unique tokens without requiring authentication
- **AI Image Generation Ready** - Built-in support for AI-generated slide images (integration ready)
- **Full Keyboard Navigation** - Arrow keys, number keys, Home/End for seamless presentation control
- **Responsive Design** - Beautiful dark-mode UI optimized for all screen sizes

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (Sonnet 4)
- **Deployment**: Vercel-optimized
- **Fonts**: IBM Plex Mono, Crimson Pro, DM Sans

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cascade.git
cd cascade
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=sk-ant-your-api-key
```

4. Set up the database:

Run the complete schema from `supabase-schema.sql` in your Supabase SQL Editor.

**Quick version:**
- Go to your Supabase project → SQL Editor
- Copy contents of `supabase-schema.sql`
- Run it to create tables and RLS policies

See `SETUP.md` for detailed step-by-step instructions.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Presentation

1. Navigate to the Dashboard
2. Click "Create New"
3. Enter a source URL (any web page)
4. Provide a presentation title
5. Optionally add a client name for personalization
6. Select a theme (Executive, Minimal, or Tech)
7. Click "Generate Presentation"

The AI will:
- Scrape and analyze the URL content
- Generate 5 coherent slides (1 title, 3 content, 1 closing)
- Apply theme-specific styling and animations
- Create image prompts for each slide

### Viewing Presentations

- **Dashboard View**: Full controls with edit/delete options
- **Public Share**: Clean presentation mode via `/p/[share_token]`
- **Keyboard Navigation**:
  - Arrow keys: Previous/Next slide
  - Number keys (1-5): Jump to specific slide
  - Home: First slide
  - End: Last slide

### Themes

**Executive Theme**
- Dark sophisticated gradients (#1a1a1a to #2d2d2d)
- Crimson Pro serif font
- Purple-blue accent colors
- Floating gradient animations
- Staggered slide-in effects

**Minimal Theme**
- Pure white background
- IBM Plex Mono font
- Black accents with vertical bars
- Pulsing overlay animations
- Clean sequential reveals

**Tech Theme**
- Dark slate gradients (#0f172a to #1e293b)
- IBM Plex Mono font
- Electric blue accents (#3b82f6)
- Orbiting radial gradients (15s rotation)
- Animated scan line effects
- Glowing text shadows

## Project Structure

```
cascade/
├── app/
│   ├── api/
│   │   └── presentations/
│   │       ├── generate/route.ts      # POST: Generate new presentation
│   │       ├── [id]/route.ts          # GET/PUT/DELETE: Manage presentation
│   │       ├── share/[token]/route.ts # GET: Public access
│   │       └── route.ts               # GET: List presentations
│   ├── dashboard/
│   │   ├── page.tsx                   # Dashboard home
│   │   ├── new/page.tsx              # Create form
│   │   └── [id]/page.tsx             # View/edit presentation
│   ├── p/
│   │   └── [token]/page.tsx          # Public sharing
│   ├── layout.tsx
│   ├── page.tsx                       # Landing page
│   └── globals.css
├── components/
│   ├── PresentationViewer.tsx         # Main viewer with navigation
│   ├── SlideRenderer.tsx              # Renders individual slides
│   ├── ThemeSelector.tsx              # Theme selection cards
│   └── Dashboard/
│       ├── PresentationList.tsx       # Table view
│       └── CreateForm.tsx             # Creation form
├── lib/
│   ├── supabase.ts                    # Supabase client
│   ├── anthropic.ts                   # Claude AI integration
│   ├── scraper.ts                     # URL content extraction
│   ├── types.ts                       # TypeScript definitions
│   └── database.types.ts              # Database types
├── styles/
│   └── themes.css                     # Theme-specific CSS animations
└── public/
```

## API Routes

### `POST /api/presentations/generate`
Generate a new presentation from a URL.

**Request:**
```json
{
  "source_url": "https://example.com",
  "title": "My Presentation",
  "client_name": "Acme Corp",
  "theme": "executive"
}
```

**Response:**
```json
{
  "success": true,
  "presentation": { ... }
}
```

### `GET /api/presentations/:id`
Get presentation by ID.

### `PUT /api/presentations/:id`
Update presentation.

### `DELETE /api/presentations/:id`
Delete presentation.

### `GET /api/presentations`
List all presentations (paginated).

### `GET /api/presentations/share/:token`
Get presentation by share token (public).

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy

### Environment Variables in Vercel

Add all variables from `.env.example`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_APP_URL` (set to your Vercel domain)

### Database Setup

Run the SQL schema in your Supabase SQL editor.

## Development

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Roadmap

- [ ] User authentication with Supabase Auth
- [ ] Role-based access control (admin, editor, viewer)
- [ ] Actual AI image generation integration
- [ ] Slide editing interface
- [ ] Custom branding options
- [ ] Export to PDF/PowerPoint
- [ ] Analytics dashboard
- [ ] Presentation templates
- [ ] Collaborative editing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Powered by [Anthropic Claude](https://anthropic.com)
- Database by [Supabase](https://supabase.com)
- Deployed on [Vercel](https://vercel.com)

## Support

For issues and questions, please open a GitHub issue.

---

**Built by The Algorithm** | Cascade - AI-Powered Presentation Platform
